import { createFal, type ImageModel } from "@ai-sdk/fal";

/**
 * Shared Fal provider instance.
 *
 * Reads API key from `process.env.FAL_API_KEY` or `FAL_KEY` by default.
 * You can override by passing a custom key when calling `createFal`.
 */
export const fal = createFal({
  // apiKey can be undefined – provider will fall back to env vars.
});

// Example model – replace with the model you intend to use.
export const defaultImageModel: ImageModel = fal.image("stabilityai/stable-diffusion-xl");
