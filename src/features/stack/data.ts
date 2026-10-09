import {
  SiApachemaven,
  SiApachemavenHex,
  SiAstral,
  SiAstro,
  SiAstroHex,
  SiBaseui,
  SiBetterauth,
  SiCloudflarepages,
  SiCloudflarepagesHex,
  SiConvex,
  SiConvexHex,
  SiDocker,
  SiDockerHex,
  SiDrizzle,
  SiDrizzleHex,
  SiEslint,
  SiEslintHex,
  SiFastapi,
  SiFastapiHex,
  SiFlask,
  SiFlutter,
  SiFlutterHex,
  SiFramer,
  SiFramerHex,
  SiGin,
  SiGinHex,
  SiGit,
  SiGitHex,
  SiGithub,
  SiGithubactions,
  SiGithubactionsHex,
  SiGo,
  SiGoHex,
  SiGsap,
  SiGsapHex,
  SiHetzner,
  SiHetznerHex,
  SiJinja,
  SiJinjaHex,
  SiNextdotjs,
  SiOpenjdk,
  SiOxc,
  SiOxcHex,
  SiPnpm,
  SiPnpmHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiPrettier,
  SiPrettierHex,
  SiPydantic,
  SiPydanticHex,
  SiPytest,
  SiPytestHex,
  SiPython,
  SiPythonHex,
  SiRadixui,
  SiRailway,
  SiReact,
  SiReactHex,
  SiReacthookform,
  SiReacthookformHex,
  SiReactquery,
  SiReactqueryHex,
  SiRuff,
  SiRuffHex,
  SiShadcnui,
  SiSpringboot,
  SiSpringbootHex,
  SiSqlalchemy,
  SiSqlalchemyHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTanstack,
  SiTanstackHex,
  SiTurborepo,
  SiTurborepoHex,
  SiTypescript,
  SiTypescriptHex,
  SiUv,
  SiUvHex,
  SiVaadin,
  SiVaadinHex,
  SiVercel,
  SiVite,
  SiViteHex,
  SiVitest,
  SiVitestHex,
  SiZedindustries,
  SiZedindustriesHex,
  SiZod,
  SiZodHex,
  SiZsh,
  SiZshHex,
} from "@icons-pack/react-simple-icons";

import type { Tech, TechCategory } from "./types";

// Fallback accent for monochrome / black-brand icons so hover borders stay visible on dark backgrounds.
const ACCENT_MUTED = "var(--foreground)";

// ─── TypeScript ──────────────────────────────────────────────────────────────

const TYPESCRIPT: Tech = {
  id: "typescript",
  name: "TypeScript",
  marks: [{ Component: SiTypescript, brand: SiTypescriptHex, label: "TypeScript" }],
  description: "My main language, used across the whole stack.",
  tagline: "Main language, fullstack by default",
  href: "https://www.typescriptlang.org",
};

const REACT: Tech = {
  id: "react",
  name: "React",
  marks: [{ Component: SiReact, brand: SiReactHex, label: "React" }],
  description: "UI layer for most of my projects.",
  tagline: "UI layer for most projects",
  href: "https://react.dev",
};

const NEXTJS: Tech = {
  id: "nextjs",
  name: "Next.js",
  marks: [{ Component: SiNextdotjs, brand: ACCENT_MUTED, label: "Next.js" }],
  description: "Fullstack React apps with the App Router.",
  tagline: "Fullstack React apps",
  href: "https://nextjs.org",
};

const ASTRO: Tech = {
  id: "astro",
  name: "Astro",
  marks: [{ Component: SiAstro, brand: SiAstroHex, label: "Astro" }],
  description: "Content-driven and static sites.",
  tagline: "Content-driven and static sites",
  href: "https://astro.build",
};

const TAILWIND: Tech = {
  id: "tailwind",
  name: "Tailwind CSS",
  marks: [{ Component: SiTailwindcss, brand: SiTailwindcssHex, label: "Tailwind CSS" }],
  description: "Utility-first styling, paired with shadcn/ui.",
  tagline: "Styling, paired with shadcn/ui",
  href: "https://tailwindcss.com",
};

const SHADCN: Tech = {
  id: "shadcn",
  name: "shadcn/ui",
  marks: [{ Component: SiShadcnui, brand: ACCENT_MUTED, label: "shadcn/ui" }],
  description: "Component primitives I own in my codebase.",
  href: "https://ui.shadcn.com",
};

const DRIZZLE: Tech = {
  id: "drizzle",
  name: "Drizzle ORM",
  marks: [{ Component: SiDrizzle, brand: SiDrizzleHex, label: "Drizzle ORM" }],
  description: "Type-safe, SQL-first ORM for TypeScript.",
  href: "https://orm.drizzle.team",
};

const BETTER_AUTH: Tech = {
  id: "better-auth",
  name: "better-auth",
  marks: [{ Component: SiBetterauth, brand: ACCENT_MUTED, label: "better-auth" }],
  description: "Sessions, OAuth, JWT, 2FA and passkeys.",
  href: "https://www.better-auth.com",
};

const LUMOS: Tech = {
  id: "lumos",
  name: "Lumos Framework",
  initials: "Lu",
  description: "shadcn-style component collection for Astro.",
};

const BASE_UI: Tech = {
  id: "base-ui",
  name: "Base UI",
  marks: [{ Component: SiBaseui, brand: ACCENT_MUTED, label: "Base UI" }],
  description: "Unstyled, accessible React components.",
  href: "https://base-ui.com",
};

const RADIX_UI: Tech = {
  id: "radix-ui",
  name: "Radix UI",
  marks: [{ Component: SiRadixui, brand: ACCENT_MUTED, label: "Radix UI" }],
  description: "Unstyled, accessible React primitives.",
  href: "https://www.radix-ui.com",
};

const MOTION: Tech = {
  id: "motion",
  name: "Motion",
  marks: [{ Component: SiFramer, brand: SiFramerHex, label: "Motion" }],
  description: "Declarative animations for React.",
  href: "https://motion.dev",
};

const TANSTACK_QUERY: Tech = {
  id: "tanstack-query",
  name: "TanStack Query",
  marks: [{ Component: SiReactquery, brand: SiReactqueryHex, label: "TanStack Query" }],
  description: "Async server state with caching and invalidation.",
  href: "https://tanstack.com/query",
};

const ZUSTAND: Tech = {
  id: "zustand",
  name: "Zustand",
  initials: "Zu",
  description: "Small client state store with a minimal API.",
  href: "https://zustand.docs.pmnd.rs",
};

const REACT_HOOK_FORM: Tech = {
  id: "react-hook-form",
  name: "React Hook Form",
  marks: [{ Component: SiReacthookform, brand: SiReacthookformHex, label: "React Hook Form" }],
  description: "Form state with minimal re-renders.",
  href: "https://react-hook-form.com",
};

const ZOD: Tech = {
  id: "zod",
  name: "Zod",
  marks: [{ Component: SiZod, brand: SiZodHex, label: "Zod" }],
  description: "Schema validation that infers back into TypeScript.",
  href: "https://zod.dev",
};

const VITEST: Tech = {
  id: "vitest",
  name: "Vitest",
  marks: [{ Component: SiVitest, brand: SiVitestHex, label: "Vitest" }],
  description: "Unit and integration tests.",
  href: "https://vitest.dev",
};

const PLAYWRIGHT: Tech = {
  id: "playwright",
  name: "Playwright",
  initials: "Pw",
  description: "End-to-end browser tests.",
  href: "https://playwright.dev",
};

// ─── JS Tooling ──────────────────────────────────────────────────────────────

const PNPM: Tech = {
  id: "pnpm",
  name: "pnpm",
  marks: [{ Component: SiPnpm, brand: SiPnpmHex, label: "pnpm" }],
  description: "Default package manager.",
  href: "https://pnpm.io",
};

const NUB: Tech = {
  id: "nub",
  name: "Nub",
  initials: "Nu",
  description: "TypeScript-first toolchain for Node.js.",
  href: "https://nubjs.com",
};

const TURBOREPO: Tech = {
  id: "turborepo",
  name: "Turborepo",
  marks: [{ Component: SiTurborepo, brand: SiTurborepoHex, label: "Turborepo" }],
  description: "Monorepo task running and caching.",
  href: "https://turborepo.com",
};

const VITE: Tech = {
  id: "vite",
  name: "Vite",
  marks: [{ Component: SiVite, brand: SiViteHex, label: "Vite" }],
  description: "Dev server and bundler outside of Next.js.",
  href: "https://vite.dev",
};

const ESLINT: Tech = {
  id: "eslint",
  name: "ESLint",
  marks: [{ Component: SiEslint, brand: SiEslintHex, label: "ESLint" }],
  description: "Linting, enforced in CI.",
  href: "https://eslint.org",
};

const PRETTIER: Tech = {
  id: "prettier",
  name: "Prettier",
  marks: [{ Component: SiPrettier, brand: SiPrettierHex, label: "Prettier" }],
  description: "Consistent code formatting.",
  href: "https://prettier.io",
};

const OXLINT: Tech = {
  id: "oxlint",
  name: "Oxlint",
  marks: [{ Component: SiOxc, brand: SiOxcHex, label: "Oxc" }],
  description: "Rust-based linter for JavaScript and TypeScript.",
  href: "https://oxc.rs",
};

const OXFMT: Tech = {
  id: "oxfmt",
  name: "Oxfmt",
  marks: [{ Component: SiOxc, brand: SiOxcHex, label: "Oxc" }],
  description: "Rust-based formatter for JavaScript and TypeScript.",
  href: "https://oxc.rs",
};

// ─── Go ──────────────────────────────────────────────────────────────────────

const GO: Tech = {
  id: "go",
  name: "Go",
  marks: [{ Component: SiGo, brand: SiGoHex, label: "Go" }],
  description: "Backend language when performance matters.",
  tagline: "Backends where performance matters",
  href: "https://go.dev",
};

const GIN: Tech = {
  id: "gin",
  name: "Gin",
  marks: [{ Component: SiGin, brand: SiGinHex, label: "Gin" }],
  description: "HTTP framework for Go APIs.",
  href: "https://gin-gonic.com",
};

const NET_HTTP: Tech = {
  id: "net-http",
  name: "net/http",
  marks: [{ Component: SiGo, brand: SiGoHex, label: "Go standard library" }],
  description: "HTTP server and client from the Go standard library.",
  href: "https://pkg.go.dev/net/http",
};

const GORM: Tech = {
  id: "gorm",
  name: "GORM",
  marks: [{ Component: SiGo, brand: SiGoHex, label: "GORM (Go ORM)" }],
  description: "ORM for Go with migrations and relations.",
  href: "https://gorm.io",
};

// ─── Python ──────────────────────────────────────────────────────────────────

const PYTHON: Tech = {
  id: "python",
  name: "Python",
  marks: [{ Component: SiPython, brand: SiPythonHex, label: "Python" }],
  description: "For when I need its ecosystem.",
  tagline: "AI features and scripting",
  href: "https://www.python.org",
};

const FASTAPI: Tech = {
  id: "fastapi",
  name: "FastAPI",
  marks: [{ Component: SiFastapi, brand: SiFastapiHex, label: "FastAPI" }],
  description: "Typed Python APIs.",
  tagline: "Python APIs",
  href: "https://fastapi.tiangolo.com",
};

const PYDANTIC: Tech = {
  id: "pydantic",
  name: "Pydantic",
  marks: [{ Component: SiPydantic, brand: SiPydanticHex, label: "Pydantic" }],
  description: "Data validation and settings from type hints.",
  href: "https://docs.pydantic.dev",
};

const UV: Tech = {
  id: "uv",
  name: "uv",
  marks: [{ Component: SiUv, brand: SiUvHex, label: "uv" }],
  description: "Package and project manager for Python.",
  href: "https://docs.astral.sh/uv",
};

const FLASK: Tech = {
  id: "flask",
  name: "Flask",
  marks: [{ Component: SiFlask, brand: ACCENT_MUTED, label: "Flask" }],
  description: "Lightweight web framework.",
  href: "https://flask.palletsprojects.com",
};

const SQLALCHEMY: Tech = {
  id: "sqlalchemy",
  name: "SQLAlchemy",
  marks: [{ Component: SiSqlalchemy, brand: SiSqlalchemyHex, label: "SQLAlchemy" }],
  description: "SQL toolkit and ORM.",
  href: "https://www.sqlalchemy.org",
};

const ALEMBIC: Tech = {
  id: "alembic",
  name: "Alembic",
  initials: "Al",
  description: "Database migrations for SQLAlchemy.",
  href: "https://alembic.sqlalchemy.org",
};

const JINJA: Tech = {
  id: "jinja",
  name: "Jinja2",
  marks: [{ Component: SiJinja, brand: SiJinjaHex, label: "Jinja2" }],
  description: "Server-rendered HTML templates.",
  href: "https://jinja.palletsprojects.com",
};

const HTTPX: Tech = {
  id: "httpx",
  name: "httpx",
  initials: "hx",
  description: "Sync and async HTTP client.",
  href: "https://www.python-httpx.org",
};

const RUFF: Tech = {
  id: "ruff",
  name: "ruff",
  marks: [{ Component: SiRuff, brand: SiRuffHex, label: "ruff" }],
  description: "Linter and formatter.",
  href: "https://docs.astral.sh/ruff",
};

const PYTEST: Tech = {
  id: "pytest",
  name: "pytest",
  marks: [{ Component: SiPytest, brand: SiPytestHex, label: "pytest" }],
  description: "Test framework.",
  href: "https://docs.pytest.org",
};

const TY: Tech = {
  id: "ty",
  name: "ty",
  marks: [{ Component: SiAstral, brand: ACCENT_MUTED, label: "Astral" }],
  description: "Type checker from Astral.",
  badge: "waiting for stable",
  href: "https://docs.astral.sh/ty",
};

// ─── AI ──────────────────────────────────────────────────────────────────────

const VERCEL_AI_SDK: Tech = {
  id: "vercel-ai-sdk",
  name: "Vercel AI SDK",
  marks: [{ Component: SiVercel, brand: ACCENT_MUTED, label: "Vercel" }],
  description: "AI features in TypeScript apps.",
  href: "https://ai-sdk.dev",
};

const PYDANTIC_AI: Tech = {
  id: "pydantic-ai",
  name: "Pydantic AI",
  marks: [{ Component: SiPydantic, brand: SiPydanticHex, label: "Pydantic" }],
  description: "Typed agents and LLM workflows in Python.",
  href: "https://ai.pydantic.dev",
};

const LLMAAS: Tech = {
  id: "llmaas",
  name: "LLMaaS",
  initials: "AI",
  description: "LLM as a Service: hosted model providers.",
};

// ─── Databases ───────────────────────────────────────────────────────────────

const POSTGRESQL: Tech = {
  id: "postgresql",
  name: "PostgreSQL",
  marks: [{ Component: SiPostgresql, brand: SiPostgresqlHex, label: "PostgreSQL" }],
  description: "My default database.",
  tagline: "Default database",
  href: "https://www.postgresql.org",
};

const SQL: Tech = {
  id: "sql",
  name: "SQL",
  initials: "SQL",
  description: "Queries, schema design and migrations.",
};

// ─── DevOps & Hosting ────────────────────────────────────────────────────────

const DOCKER: Tech = {
  id: "docker",
  name: "Docker",
  marks: [{ Component: SiDocker, brand: SiDockerHex, label: "Docker" }],
  description: "Local dev and self-hosted deployments.",
  tagline: "Local dev and self-hosted deployments",
  href: "https://www.docker.com",
};

const DOCKER_COMPOSE: Tech = {
  ...DOCKER,
  id: "docker-compose",
  name: "Docker + Docker Compose",
};

const GITHUB_ACTIONS: Tech = {
  id: "github-actions",
  name: "GitHub Actions",
  marks: [{ Component: SiGithubactions, brand: SiGithubactionsHex, label: "GitHub Actions" }],
  description: "CI for linting, type checks and tests.",
  href: "https://github.com/features/actions",
};

const VERCEL: Tech = {
  id: "vercel",
  name: "Vercel",
  marks: [{ Component: SiVercel, brand: ACCENT_MUTED, label: "Vercel" }],
  description: "Primary hosting for web apps.",
  tagline: "Primary hosting for web apps",
  href: "https://vercel.com",
};

const HETZNER: Tech = {
  id: "hetzner",
  name: "Hetzner",
  marks: [{ Component: SiHetzner, brand: SiHetznerHex, label: "Hetzner" }],
  description: "Self-hosted services via Docker.",
  href: "https://www.hetzner.com",
};

const CLOUDFLARE_PAGES: Tech = {
  id: "cloudflare-pages",
  name: "Cloudflare Pages",
  marks: [{ Component: SiCloudflarepages, brand: SiCloudflarepagesHex, label: "Cloudflare Pages" }],
  description: "Static and edge hosting.",
  href: "https://pages.cloudflare.com",
};

const RAILWAY: Tech = {
  id: "railway",
  name: "Railway",
  marks: [{ Component: SiRailway, brand: ACCENT_MUTED, label: "Railway" }],
  description: "Managed app and database hosting.",
  href: "https://railway.com",
};

// ─── Environment ─────────────────────────────────────────────────────────────

const GITHUB: Tech = {
  id: "github",
  name: "GitHub",
  marks: [{ Component: SiGithub, brand: ACCENT_MUTED, label: "GitHub" }],
  description: "Version control and CI.",
  tagline: "Version control and CI",
  href: "https://github.com/nilsbtr",
};

const GIT: Tech = {
  id: "git",
  name: "Git",
  marks: [{ Component: SiGit, brand: SiGitHex, label: "Git" }],
  description: "Version control.",
  href: "https://git-scm.com",
};

const VSCODE: Tech = {
  id: "vscode",
  name: "VS Code",
  initials: "VS",
  description: "Code editor.",
  href: "https://code.visualstudio.com",
};

const ZED: Tech = {
  id: "zed",
  name: "Zed",
  marks: [{ Component: SiZedindustries, brand: SiZedindustriesHex, label: "Zed" }],
  description: "Code editor.",
  href: "https://zed.dev",
};

const ZSH: Tech = {
  id: "zsh",
  name: "zsh",
  marks: [{ Component: SiZsh, brand: SiZshHex, label: "zsh" }],
  description: "Shell, plus bash basics.",
  href: "https://www.zsh.org",
};

const SSH: Tech = {
  id: "ssh",
  name: "SSH",
  initials: "SSH",
  description: "Remote access to servers.",
};

// ─── Java ────────────────────────────────────────────────────────────────────

const JAVA: Tech = {
  id: "java",
  name: "Java",
  marks: [{ Component: SiOpenjdk, brand: ACCENT_MUTED, label: "Java" }],
  description: "General-purpose, object-oriented language.",
  href: "https://dev.java",
};

const SPRING_BOOT: Tech = {
  id: "spring-boot",
  name: "Spring Boot",
  marks: [{ Component: SiSpringboot, brand: SiSpringbootHex, label: "Spring Boot" }],
  description: "Java web apps and APIs.",
  href: "https://spring.io/projects/spring-boot",
};

const MAVEN: Tech = {
  id: "maven",
  name: "Maven",
  marks: [{ Component: SiApachemaven, brand: SiApachemavenHex, label: "Maven" }],
  description: "Build and dependency management.",
  href: "https://maven.apache.org",
};

const VAADIN: Tech = {
  id: "vaadin",
  name: "Vaadin",
  marks: [{ Component: SiVaadin, brand: SiVaadinHex, label: "Vaadin" }],
  description: "Web UIs written in Java.",
  href: "https://vaadin.com",
};

const CHECKSTYLE: Tech = {
  id: "checkstyle",
  name: "Checkstyle",
  initials: "Cs",
  description: "Code style checks.",
  href: "https://checkstyle.org",
};

// ─── Currently Learning ──────────────────────────────────────────────────────

const TANSTACK_START: Tech = {
  id: "tanstack-start",
  name: "TanStack Start",
  marks: [{ Component: SiTanstack, brand: SiTanstackHex, label: "TanStack Start" }],
  description: "Fullstack React framework.",
  href: "https://tanstack.com/start",
};

const CONVEX: Tech = {
  id: "convex",
  name: "Convex",
  marks: [{ Component: SiConvex, brand: SiConvexHex, label: "Convex" }],
  description: "Reactive backend and database.",
  href: "https://convex.dev",
};

const GSAP: Tech = {
  id: "gsap",
  name: "GSAP",
  marks: [{ Component: SiGsap, brand: SiGsapHex, label: "GSAP" }],
  description: "Advanced web animation.",
  href: "https://gsap.com",
};

const FLUTTER: Tech = {
  id: "flutter",
  name: "Flutter",
  marks: [{ Component: SiFlutter, brand: SiFlutterHex, label: "Flutter" }],
  description: "Cross-platform mobile apps.",
  href: "https://flutter.dev",
};

// ─── Exports ─────────────────────────────────────────────────────────────────

/** Headline icons for the stack page banner and the home page. */
export const FEATURED: readonly Tech[] = [
  TYPESCRIPT,
  REACT,
  NEXTJS,
  ASTRO,
  TAILWIND,
  GO,
  PYTHON,
  FASTAPI,
  POSTGRESQL,
  DOCKER,
  GITHUB,
  VERCEL,
] as const;

export const TECH_STACK: readonly TechCategory[] = [
  {
    id: "typescript",
    label: "TypeScript",
    core: [TYPESCRIPT, REACT, NEXTJS, ASTRO, TAILWIND, SHADCN, DRIZZLE, BETTER_AUTH],
    more: [
      { label: "Frameworks", items: [LUMOS] },
      { label: "UI & Animation", items: [BASE_UI, RADIX_UI, MOTION] },
      { label: "State, Data & Forms", items: [TANSTACK_QUERY, ZUSTAND, REACT_HOOK_FORM, ZOD] },
      { label: "Testing", items: [VITEST, PLAYWRIGHT] },
    ],
  },
  {
    id: "js-tooling",
    label: "JS Tooling",
    core: [PNPM, NUB, TURBOREPO, VITE],
    more: [{ label: "Linting & Formatting", items: [ESLINT, PRETTIER, OXLINT, OXFMT] }],
  },
  {
    id: "go",
    label: "Go",
    caption: "Backends where performance matters.",
    core: [GO, GIN, NET_HTTP],
    more: [{ items: [GORM] }],
  },
  {
    id: "python",
    label: "Python",
    caption: "AI features, data work and small scripts.",
    core: [PYTHON, FASTAPI, PYDANTIC, UV],
    more: [
      { label: "Web & Data", items: [FLASK, SQLALCHEMY, ALEMBIC, JINJA, HTTPX] },
      { label: "Tooling & Testing", items: [RUFF, PYTEST, TY] },
    ],
  },
  {
    id: "ai",
    label: "AI",
    core: [VERCEL_AI_SDK, PYDANTIC_AI, LLMAAS],
  },
  {
    id: "databases",
    label: "Databases",
    core: [POSTGRESQL, SQL],
  },
  {
    id: "devops",
    label: "DevOps & Hosting",
    core: [DOCKER_COMPOSE, GITHUB_ACTIONS, VERCEL, HETZNER],
    more: [{ items: [CLOUDFLARE_PAGES, RAILWAY] }],
  },
  {
    id: "environment",
    label: "Environment",
    core: [GIT, VSCODE, ZED, ZSH],
    more: [{ items: [SSH] }],
  },
  {
    id: "java",
    label: "Java",
    caption: "Learned in depth at school and university.",
    core: [JAVA, SPRING_BOOT],
    more: [{ items: [MAVEN, VAADIN, CHECKSTYLE] }],
    collapsed: true,
  },
] as const;

export const LEARNING: readonly Tech[] = [TANSTACK_START, CONVEX, GSAP, FLUTTER] as const;
