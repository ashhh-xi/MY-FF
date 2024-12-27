"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (files: FileList) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onChange(files);
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 border">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 z-10 p-1 bg-background/80 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
        ))}
        <label className="border-2 border-dashed border-muted-foreground/25 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
          <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Add Images</span>
          <Input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}