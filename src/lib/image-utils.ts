/**
 * Client-side utility for converting image files (PNG, JPG, JPEG) to WebP format.
 * This runs entirely in the browser using the HTML5 Canvas API.
 */
export function convertImageToWebP(file: File, quality = 0.85): Promise<File> {
  return new Promise((resolve) => {
    // If the file is not an image, or is already a webp/gif/svg, resolve as-is
    const skipConversion =
      !file.type.startsWith("image/") ||
      file.type === "image/webp" ||
      file.type === "image/gif" ||
      file.type === "image/svg+xml";

    if (skipConversion) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Fallback to original file if canvas context is unavailable
          return resolve(file);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file); // Fallback to original if blob creation fails
            }
            
            const newFileName = file.name.replace(/\.[^.]+$/, "") + ".webp";
            const webpFile = new File([blob], newFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(webpFile);
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => {
        resolve(file); // Fallback to original on error
      };
    };
    reader.onerror = () => {
      resolve(file); // Fallback to original on error
    };
  });
}
