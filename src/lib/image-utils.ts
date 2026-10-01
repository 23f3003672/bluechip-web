/**
 * Client-side utility for converting image files (PNG, JPG, JPEG, WEBP) to optimized WebP format
 * and automatically downscaling oversized camera/phone photos to max 1920px.
 * This runs entirely in the browser using the HTML5 Canvas API before upload.
 */
export function convertImageToWebP(
  file: File,
  quality = 0.82,
  maxDimension = 1920
): Promise<File> {
  return new Promise((resolve) => {
    // If the file is not an image, or is an animated gif or vector svg, resolve as-is
    const isImage = file.type.startsWith("image/");
    const skipConversion =
      !isImage ||
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
        let { width, height } = img;

        // Proportionally scale down if wider or taller than maxDimension
        if (width > maxDimension || height > maxDimension) {
          const scale = Math.min(maxDimension / width, maxDimension / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file); // Fallback to original file if canvas context unavailable
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file); // Fallback to original if blob creation fails
            }

            const newFileName =
              file.name.replace(/\.[^.]+$/, "") + ".webp";
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
