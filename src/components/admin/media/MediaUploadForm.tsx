"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/types";

interface MediaUploadFormProps {
  uploadMediaAction: (formData: FormData) => Promise<ActionResult<{ id: string; url: string }>>;
  onUploaded: () => void;
}

export function MediaUploadForm({ uploadMediaAction, onUploaded }: MediaUploadFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [altText, setAltText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await uploadMediaAction(formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Media uploaded");
      setAltText("");
      formRef.current?.reset();
      onUploaded();
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="rounded-lg border border-border bg-white p-5">
      <h2 className="text-base font-semibold text-foreground">Upload Image</h2>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="media-file">File</Label>
        <Input id="media-file" name="file" type="file" accept="image/*" required disabled={isPending} />
      </div>

      <div className="mt-3 space-y-1.5">
        <Label htmlFor="media-alt">Alt Text</Label>
        <Input
          id="media-alt"
          name="alt_text"
          value={altText}
          onChange={(event) => setAltText(event.target.value)}
          placeholder="Describe this image"
          disabled={isPending}
        />
      </div>

      <Button type="submit" className="mt-5 w-full" disabled={isPending}>
        {isPending ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
