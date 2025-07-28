# AI-Gen Dashboard

A web application for generating images (and soon videos) using Fal AI models.

## Tech Stack

- **Next.js 15** with the App Router
- **TypeScript** + **ESLint**
- **Tailwind CSS** for styling
- **Shadcn UI** components (`sidebar-07` dashboard layout)
- **AI SDK** with **@ai-sdk/fal** provider

## Current Features

| Status | Feature |
| ------ | -------- |
| ✅ | Collapsible sidebar dashboard UI |
| ✅ | Image generation API route (`/api/generate-image`) |
| ✅ | Image generator UI with prompt + width/height |
| ✅ | Environment-based Fal API key (`.env.local`) |
| 🔜 | Video generation (duration, FPS, style) |
| 🔜 | Batch processing & history |
| 🔜 | Editing & export tools |

## Getting Started

1. **Clone & install**

   ```bash
   git clone https://github.com/blackstreet-ai/supreme-octo-invention.git
   cd ai-gen-dashboard
   npm install
   ```

2. **Set your Fal API key**

   Create `.env.local` at the project root:

   ```bash
   FAL_API_KEY=your_fal_key_here
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit <http://localhost:3000/dashboard> to try it.

## Image Generation API

`POST /api/generate-image`

```jsonc
{
  "prompt": "A futuristic cityscape at dusk",
  "width": 768,
  "height": 768
}
```

Response:

```jsonc
{
  "url": "data:image/png;base64,…" // base-64 data URI
}
```

## Roadmap

- [ ] Video generation endpoint & UI
- [ ] Batch processing & history view
- [ ] Editing tools (in-painting, upscaling)
- [ ] Export / download manager
- [ ] Automated tests (Playwright + jest)

---

MIT © 2025 Blackstreet-AI

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
