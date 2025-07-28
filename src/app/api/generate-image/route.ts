import { NextRequest, NextResponse } from "next/server";
import { defaultImageModel } from "@/lib/fal";

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

    // Call Fal image model
    const result = await defaultImageModel.generate(options);

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: result.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
