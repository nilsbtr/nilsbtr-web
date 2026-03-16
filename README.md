# nilsbtr-web

Personal site built with Next.js, Better Auth, Drizzle, Neon, and Vercel.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Pull the Vercel development environment into `.env.local`:

```bash
pnpm env:pull
```

Or create `.env.local` manually from `.env.example`.

Start the app:

```bash
pnpm dev
```

## Environment Strategy

This project is set up to use one `DATABASE_URL` per environment:

| Environment       | App host                | Database target         |
| ----------------- | ----------------------- | ----------------------- |
| Local development | `http://localhost:3000` | Neon development branch |
| Vercel Preview    | Preview deployment URL  | Neon preview branch     |
| Vercel Production | Production domain       | Neon production branch  |
| GitHub CI         | `http://localhost:3000` | Dummy CI value only     |

The important rule is:

- Local development should never use the production database by default.

## Recommended Neon Setup

Create or use these branches in Neon:

- `production`: real production data
- `development`: your persistent local development branch
- preview branches: created automatically by the Neon + Vercel integration, one branch per preview deployment

If you use the Neon/Vercel integration, Vercel preview deployments can receive isolated preview database branches automatically.

## Recommended Vercel Setup

Set environment variables per Vercel environment:

### Development

- `DATABASE_URL`: Neon `development` branch URL
- `BETTER_AUTH_URL`: `http://localhost:3000`
- `NEXT_PUBLIC_SITE_URL`: `http://localhost:3000`

### Preview

- `DATABASE_URL`: Neon preview branch URL, or let the Neon integration inject it automatically
- `BETTER_AUTH_URL`: optional, can be omitted so auth falls back to Vercel's preview deployment URL
- `NEXT_PUBLIC_SITE_URL`: optional, set it only if you want an explicit preview URL

### Production

- `DATABASE_URL`: Neon `production` branch URL
- `BETTER_AUTH_URL`: your production domain, for example `https://nilsbtr.de`
- `NEXT_PUBLIC_SITE_URL`: your production domain, for example `https://nilsbtr.de`

## Database Workflow

Generate migrations after schema changes:

```bash
pnpm db:generate
```

Apply migrations to your current `DATABASE_URL`:

```bash
pnpm db:migrate
```

Recommended flow:

1. Point local `.env.local` at the Neon `development` branch.
2. Run and verify migrations locally.
3. Let preview deployments validate the same code against preview branches.
4. Apply the reviewed migration to the production branch intentionally, not by accident from normal local development.

## CI

GitHub Actions should use dummy values for auth and database env vars unless you add real integration tests that actually need a database or OAuth providers.
