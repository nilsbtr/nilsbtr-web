# nilsbtr-web

Personal portfolio site at [nilsbtr.de](https://nilsbtr.de).

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router)
- **Language** — TypeScript
- **Styling** — [Tailwind CSS 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), [Base UI](https://base-ui.com)
- **Auth** — [Better Auth](https://www.better-auth.com)
- **Database** — [Neon](https://neon.tech) (Postgres) + [Drizzle ORM](https://orm.drizzle.team)
- **Hosting** — [Vercel](https://vercel.com)

## Project Structure

```
src/
├── app/             Routes only. Pages compose features and stay thin.
│   ├── (site)/      Public pages
│   ├── (auth)/      Login, sign-up and invite flows
│   ├── dashboard/   Admin area
│   └── api/
├── features/        One folder per domain: its components, data, schemas, hooks and types
├── components/
│   ├── ui/          shadcn/ui primitives
│   ├── layout/      Site header and page scaffolding
│   ├── motion/      Animation primitives and motion tokens
│   ├── providers/   App-wide context providers
│   └── shared/      Small building blocks used by several features
├── config/          Static site config (metadata, navigation)
├── lib/             Helpers that are safe on both client and server
└── server/          Server-only code: auth instance, database client and schema
```

Dependencies point one way, `app → features → components / config / lib / server`, and features never import from each other. Both rules are enforced by ESLint.

## License

[MIT](LICENSE)
