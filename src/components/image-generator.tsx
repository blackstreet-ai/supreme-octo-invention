"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface GeneratedImage {
  url: string;
}

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState(768);
  const [height, setHeight] = useState(768);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, width, height }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
      setImages([{ url: json.url }, ...images]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Input
            id="prompt"
            placeholder="A futuristic cityscape at dusk"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              className="w-24"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              className="w-24"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
            />
          </div>
        </div>
        <Button onClick={handleGenerate} disabled={loading || !prompt}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Separator />

      {images.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt="generated"
              className="rounded-md object-cover w-full h-auto"
            />
          ))}
        </div>
      )}
    </div>
  );
}
