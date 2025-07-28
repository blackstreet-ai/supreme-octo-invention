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

    const url = (image as any).url;

    if (!url) {
      return NextResponse.json({ error: "No image URL returned" }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
