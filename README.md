# nilsbtr-links-next

Production-grade Next.js App Router project for the `nilsbtr` social links page, ported from a drafted design with a Tailwind CSS v4 token system and SEO-focused metadata.

## Requirements

- Node.js 20+
- npm 10+

## Local Development

1. Copy the environment template:

```bash
cp .env.example .env.local
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`: public canonical base URL used by metadata, robots, sitemap, and schema (example: `https://nilsbtr.com`).

## Available Scripts

- `npm run dev`: run local development server
- `npm run build`: create production build
- `npm run start`: run production server
- `npm run typecheck`: run TypeScript checks
- `npm run lint`: run ESLint with zero-warning policy
- `npm run lint:fix`: auto-fix lint issues where possible
- `npm run format`: format all files with Prettier
- `npm run format:check`: validate formatting

## Project Structure

- `app/`: App Router routes, metadata routes, global styles
- `components/social/`: social page UI components
- `content/`: typed content/data models
- `lib/`: shared helpers and site configuration

## SEO and Metadata

Configured via:

- `app/layout.tsx`: global metadata, Open Graph, Twitter, robots directives
- `app/robots.ts`: robots.txt
- `app/sitemap.ts`: sitemap.xml
- `app/opengraph-image.tsx`: dynamic OG image
- `app/page.tsx`: JSON-LD Person schema

## Deployment Notes

- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly in the deployment environment.
- Run this quality gate before shipping:

```bash
npm run format:check && npm run typecheck && npm run lint && npm run build
```
