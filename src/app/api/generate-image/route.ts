import { NextRequest, NextResponse } from "next/server";
import { fal } from "@/lib/fal";
import { experimental_generateImage as generateImage } from "ai";

export const runtime = "nodejs"; // Use full Node runtime for fetch

/**
 * POST /api/generate-image
 *
 * Expected JSON body:
 * {
 *   prompt: string,
 *   width?: number,
 *   height?: number,
 *   params?: Record<string, unknown>
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const { prompt, width, height, params } = (await req.json()) as {
      prompt: string;
      width?: number;
      height?: number;
      params?: Record<string, unknown>;
    };

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Build generation options
    const options: Record<string, unknown> = {
      prompt,
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
      ...(params ?? {}),
    };

    // Call Fal image model using AI SDK helper
    const { image } = await generateImage({
      model: fal.image("fal-ai/fast-sdxl"),
      prompt,
      providerOptions: { fal: options as any },
    });

    // AI SDK returns a Uint8Array; convert to base64 data URI
    const uint8 = (image as any).uint8Array as Uint8Array | undefined;
    if (!uint8) {
      return NextResponse.json({ error: "Fal did not return image bytes" }, { status: 500 });
    }
    const base64 = Buffer.from(uint8).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
    return NextResponse.json({ url: dataUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
