import {
  SiBetterauth,
  SiConvex,
  SiConvexHex,
  SiDocker,
  SiDockerHex,
  SiDrizzle,
  SiDrizzleHex,
  SiEslint,
  SiEslintHex,
  SiFlask,
  SiFramer,
  SiFramerHex,
  SiGin,
  SiGinHex,
  SiGithub,
  SiGo,
  SiGoHex,
  SiJinja,
  SiJinjaHex,
  SiNextdotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostgresqlHex,
  SiPrettier,
  SiPrettierHex,
  SiPython,
  SiPythonHex,
  SiReact,
  SiReactHex,
  SiReacthookform,
  SiReacthookformHex,
  SiReactquery,
  SiReactqueryHex,
  SiShadcnui,
  SiSpringboot,
  SiSpringbootHex,
  SiSqlalchemy,
  SiSqlalchemyHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTanstack,
  SiTanstackHex,
  SiTypescript,
  SiTypescriptHex,
  SiVaadin,
  SiVaadinHex,
  SiVercel,
  SiVite,
  SiViteHex,
  SiZod,
  SiZodHex,
} from "@icons-pack/react-simple-icons";

import type { Tech, TechCategory } from "@/types/tech";

// Fallback accent for monochrome / black-brand icons so hover borders stay visible on dark backgrounds.
const ACCENT_MUTED = "var(--foreground)";

// ─── Core ────────────────────────────────────────────────────────────────────

const TYPESCRIPT: Tech = {
  id: "typescript",
  name: "TypeScript",
  marks: [{ Component: SiTypescript, brand: SiTypescriptHex, label: "TypeScript" }],
  description: "Primary language. Strict mode, typed end-to-end.",
  href: "https://www.typescriptlang.org",
};

const REACT: Tech = {
  id: "react",
  name: "React",
  marks: [{ Component: SiReact, brand: SiReactHex, label: "React" }],
  description: "UI library I reach for first — components, hooks, Server Components.",
  href: "https://react.dev",
};

const NEXTJS: Tech = {
  id: "nextjs",
  name: "Next.js",
  marks: [{ Component: SiNextdotjs, brand: ACCENT_MUTED, label: "Next.js" }],
  description: "App Router, Server Actions, streaming — the framework I default to.",
  href: "https://nextjs.org",
};

const GO: Tech = {
  id: "go",
  name: "Go",
  marks: [{ Component: SiGo, brand: SiGoHex, label: "Go" }],
  description: "Concurrent services and HTTP APIs — fast and predictable.",
  href: "https://go.dev",
};

const GIN: Tech = {
  id: "gin",
  name: "Gin",
  marks: [{ Component: SiGin, brand: SiGinHex, label: "Gin" }],
  description: "Lightweight HTTP router for Go — my default web framework.",
  href: "https://gin-gonic.com",
};

const POSTGRESQL: Tech = {
  id: "postgresql",
  name: "PostgreSQL",
  marks: [{ Component: SiPostgresql, brand: SiPostgresqlHex, label: "PostgreSQL" }],
  description: "Relational database of choice — reliable, rich, extensible.",
  href: "https://www.postgresql.org",
};

const DRIZZLE: Tech = {
  id: "drizzle",
  name: "Drizzle ORM",
  marks: [{ Component: SiDrizzle, brand: SiDrizzleHex, label: "Drizzle ORM" }],
  description: "Type-safe SQL-first ORM for TypeScript — fast and ergonomic.",
  href: "https://orm.drizzle.team",
};

const DOCKER: Tech = {
  id: "docker",
  name: "Docker",
  marks: [{ Component: SiDocker, brand: SiDockerHex, label: "Docker" }],
  description: "Reproducible dev and production environments.",
  href: "https://www.docker.com",
};

const VERCEL: Tech = {
  id: "vercel",
  name: "Vercel",
  marks: [{ Component: SiVercel, brand: ACCENT_MUTED, label: "Vercel" }],
  description: "Hosting, preview deploys, and edge — ship on push.",
  href: "https://vercel.com",
};

// ─── Toolkit ─────────────────────────────────────────────────────────────────

const TAILWIND: Tech = {
  id: "tailwind",
  name: "Tailwind CSS",
  marks: [{ Component: SiTailwindcss, brand: SiTailwindcssHex, label: "Tailwind CSS" }],
  description: "Utility-first styling — design in the markup, no CSS context-switch.",
  href: "https://tailwindcss.com",
};

const SHADCN: Tech = {
  id: "shadcn",
  name: "shadcn/ui",
  marks: [{ Component: SiShadcnui, brand: ACCENT_MUTED, label: "shadcn/ui" }],
  description: "Composable primitives I own in my codebase — styled with Tailwind.",
  href: "https://ui.shadcn.com",
};

const REACT_QUERY: Tech = {
  id: "react-query",
  name: "React Query",
  marks: [{ Component: SiReactquery, brand: SiReactqueryHex, label: "React Query" }],
  description: "Async server state: caching, retries, invalidation out of the box.",
  href: "https://tanstack.com/query",
};

const ZUSTAND: Tech = {
  id: "zustand",
  name: "Zustand",
  initials: "Zu",
  description: "Tiny, unopinionated client state — minimal API, no boilerplate.",
  href: "https://zustand.docs.pmnd.rs",
};

const REACT_HOOK_FORM: Tech = {
  id: "react-hook-form",
  name: "React Hook Form",
  marks: [{ Component: SiReacthookform, brand: SiReacthookformHex, label: "React Hook Form" }],
  description: "Performant form state with minimal re-renders.",
  href: "https://react-hook-form.com",
};

const ZOD: Tech = {
  id: "zod",
  name: "Zod",
  marks: [{ Component: SiZod, brand: SiZodHex, label: "Zod" }],
  description: "Schema validation — runtime safety that infers back into TypeScript.",
  href: "https://zod.dev",
};

const VITE: Tech = {
  id: "vite",
  name: "Vite",
  marks: [{ Component: SiVite, brand: SiViteHex, label: "Vite" }],
  description: "Fast dev server and bundler when I'm outside Next.",
  href: "https://vitejs.dev",
};

const ESLINT: Tech = {
  id: "eslint",
  name: "ESLint",
  marks: [{ Component: SiEslint, brand: SiEslintHex, label: "ESLint" }],
  description: "Static analysis — opinionated rules, enforced in CI.",
  href: "https://eslint.org",
};

const PRETTIER: Tech = {
  id: "prettier",
  name: "Prettier",
  marks: [{ Component: SiPrettier, brand: SiPrettierHex, label: "Prettier" }],
  description: "Consistent formatting with zero debate.",
  href: "https://prettier.io",
};

const BETTER_AUTH: Tech = {
  id: "better-auth",
  name: "better-auth",
  marks: [{ Component: SiBetterauth, brand: ACCENT_MUTED, label: "better-auth" }],
  description: "Modern authentication — sessions, roles, invites.",
  href: "https://www.better-auth.com",
};

const GIT_GITHUB: Tech = {
  id: "git-github",
  name: "Git + GitHub",
  marks: [{ Component: SiGithub, brand: ACCENT_MUTED, label: "GitHub" }],
  description: "Version control and GitHub Actions — branch, review, ship.",
  href: "https://github.com/nilsbtr",
};

const PYTHON_FLASK_SQLA: Tech = {
  id: "python-flask-sqla",
  name: "Python · Flask · SQLAlchemy",
  marks: [
    { Component: SiPython, brand: SiPythonHex, label: "Python" },
    { Component: SiFlask, brand: ACCENT_MUTED, label: "Flask" },
    { Component: SiSqlalchemy, brand: SiSqlalchemyHex, label: "SQLAlchemy" },
  ],
  description: "Python web stack — lean APIs with relational data and migrations.",
  href: "https://flask.palletsprojects.com",
};

const JINJA: Tech = {
  id: "jinja",
  name: "Jinja2",
  marks: [{ Component: SiJinja, brand: SiJinjaHex, label: "Jinja2" }],
  description: "Server-rendered HTML templates alongside Flask.",
  href: "https://jinja.palletsprojects.com",
};

const JAVA_SPRING_VAADIN: Tech = {
  id: "java-spring-vaadin",
  name: "Java · Spring Boot · Vaadin",
  marks: [
    { Component: SiOpenjdk, brand: ACCENT_MUTED, label: "Java" },
    { Component: SiSpringboot, brand: SiSpringbootHex, label: "Spring Boot" },
    { Component: SiVaadin, brand: SiVaadinHex, label: "Vaadin" },
  ],
  description: "JVM stack — enterprise web apps with a Java-only UI layer.",
  href: "https://spring.io/projects/spring-boot",
};

const GORM: Tech = {
  id: "gorm",
  name: "GORM",
  marks: [{ Component: SiGo, brand: SiGoHex, label: "GORM (Go ORM)" }],
  description: "Ergonomic ORM for Go — migrations, relations, hooks.",
  href: "https://gorm.io",
};

// ─── Currently Exploring ─────────────────────────────────────────────────────

const TANSTACK_START: Tech = {
  id: "tanstack-start",
  name: "TanStack Start",
  marks: [{ Component: SiTanstack, brand: SiTanstackHex, label: "TanStack Start" }],
  description: "Full-stack React framework — trying it as a Next.js alternative.",
  href: "https://tanstack.com/start",
};

const CONVEX: Tech = {
  id: "convex",
  name: "Convex",
  marks: [{ Component: SiConvex, brand: SiConvexHex, label: "Convex" }],
  description: "Reactive backend with realtime queries — interesting DX bet.",
  href: "https://convex.dev",
};

const MOTION: Tech = {
  id: "motion",
  name: "Motion",
  marks: [{ Component: SiFramer, brand: SiFramerHex, label: "Motion" }],
  description: "Declarative animations for React — spring physics and gestures.",
  href: "https://motion.dev",
};

const OXLINT_OXFMT: Tech = {
  id: "oxlint-oxfmt",
  name: "Oxlint + Oxfmt",
  initials: "Ox",
  description: "Rust-based JS lint and format — orders of magnitude faster than ESLint.",
  href: "https://oxc.rs",
};

// ─── Exports ─────────────────────────────────────────────────────────────────

export const TECH_STACK: readonly TechCategory[] = [
  {
    id: "core",
    label: "Core",
    caption: "My primary stack — what I build production apps with day to day.",
    items: [TYPESCRIPT, REACT, NEXTJS, GO, GIN, POSTGRESQL, DRIZZLE, DOCKER, VERCEL],
  },
  {
    id: "toolkit",
    label: "Toolkit",
    caption: "Tools and libraries I know well — pulled in when the job calls for them.",
    items: [
      TAILWIND,
      SHADCN,
      REACT_QUERY,
      ZUSTAND,
      REACT_HOOK_FORM,
      ZOD,
      VITE,
      ESLINT,
      PRETTIER,
      BETTER_AUTH,
      GIT_GITHUB,
      PYTHON_FLASK_SQLA,
      JINJA,
      JAVA_SPRING_VAADIN,
      GORM,
    ],
  },
  {
    id: "exploring",
    label: "Currently Exploring",
    caption: "What I'm sharpening next — exciting but not production-ready yet.",
    items: [TANSTACK_START, CONVEX, MOTION, OXLINT_OXFMT],
  },
] as const;

/**
 * Headline chips for the home page — the 10 technologies that tell the
 * full-stack story a recruiter scans for: language → UI → framework → styling
 * → backend language → backend framework → DB → ORM → containers → cloud.
 */
export const HOME_HIGHLIGHTS: readonly Tech[] = [
  TYPESCRIPT,
  REACT,
  NEXTJS,
  TAILWIND,
  GO,
  GIN,
  POSTGRESQL,
  DRIZZLE,
  DOCKER,
  VERCEL,
] as const;
