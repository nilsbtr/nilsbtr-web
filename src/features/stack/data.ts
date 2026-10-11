import {
  AiCloud01Icon,
  CheckListIcon,
  Chemistry02Icon,
  ComputerTerminal01Icon,
  FeatherIcon,
  FramerIcon,
  GithubIcon,
  Globe02Icon,
  JavaIcon,
  MagicWand01Icon,
  MaskTheater02Icon,
  PotionIcon,
  PythonIcon,
  ReactIcon,
  ShadcnIcon,
  SqlIcon,
  TailwindcssIcon,
  Typescript01Icon,
  VisualStudioCodeIcon,
  Wrench01Icon,
  ZshIcon,
} from "@hugeicons/core-free-icons";

import {
  AstralIcon,
  AstroIcon,
  BaseUiIcon,
  BetterAuthIcon,
  CloudflarePagesIcon,
  ConvexIcon,
  DockerIcon,
  DrizzleIcon,
  EslintIcon,
  FastapiIcon,
  FlaskIcon,
  FlutterIcon,
  GinIcon,
  GitIcon,
  GithubActionsIcon,
  GoIcon,
  GsapIcon,
  HetznerIcon,
  JinjaIcon,
  NextjsIcon,
  OxcIcon,
  PnpmIcon,
  PostgresqlIcon,
  PrettierIcon,
  PydanticIcon,
  PytestIcon,
  RadixUiIcon,
  RailwayIcon,
  ReactHookFormIcon,
  RuffIcon,
  SpringBootIcon,
  TanstackIcon,
  TanstackQueryIcon,
  TurborepoIcon,
  UvIcon,
  VaadinIcon,
  VercelIcon,
  ViteIcon,
  VitestIcon,
  ZedIcon,
  ZodIcon,
  ZustandIcon,
} from "./icons";
import type { Tech, TechCategory } from "./types";

// Fallback accent for monochrome / black-brand icons so hover borders stay visible on dark backgrounds.
const ACCENT_MUTED = "var(--foreground)";

// ─── TypeScript ──────────────────────────────────────────────────────────────

const TYPESCRIPT: Tech = {
  id: "typescript",
  name: "TypeScript",
  marks: [{ icon: Typescript01Icon, brand: "#3178C6", label: "TypeScript" }],
  description: "My main language, used across the whole stack.",
  tagline: "Main language, fullstack by default",
  href: "https://www.typescriptlang.org",
};

const REACT: Tech = {
  id: "react",
  name: "React",
  marks: [{ icon: ReactIcon, brand: "#61DAFB", label: "React" }],
  description: "UI layer for most of my projects.",
  tagline: "UI layer for most projects",
  href: "https://react.dev",
};

const NEXTJS: Tech = {
  id: "nextjs",
  name: "Next.js",
  marks: [{ icon: NextjsIcon, brand: ACCENT_MUTED, label: "Next.js" }],
  description: "Fullstack React apps with the App Router.",
  tagline: "Fullstack React apps",
  href: "https://nextjs.org",
};

const ASTRO: Tech = {
  id: "astro",
  name: "Astro",
  marks: [{ icon: AstroIcon, brand: "#BC52EE", label: "Astro" }],
  description: "Content-driven and static sites.",
  tagline: "Content-driven and static sites",
  href: "https://astro.build",
};

const TAILWIND: Tech = {
  id: "tailwind",
  name: "Tailwind CSS",
  marks: [{ icon: TailwindcssIcon, brand: "#06B6D4", label: "Tailwind CSS" }],
  description: "Utility-first styling, paired with shadcn/ui.",
  tagline: "Styling, paired with shadcn/ui",
  href: "https://tailwindcss.com",
};

const SHADCN: Tech = {
  id: "shadcn",
  name: "shadcn/ui",
  marks: [{ icon: ShadcnIcon, brand: ACCENT_MUTED, label: "shadcn/ui" }],
  description: "Component primitives I own in my codebase.",
  href: "https://ui.shadcn.com",
};

const DRIZZLE: Tech = {
  id: "drizzle",
  name: "Drizzle ORM",
  marks: [{ icon: DrizzleIcon, brand: "#C5F74F", label: "Drizzle ORM" }],
  description: "Type-safe, SQL-first ORM for TypeScript.",
  href: "https://orm.drizzle.team",
};

const BETTER_AUTH: Tech = {
  id: "better-auth",
  name: "better-auth",
  marks: [{ icon: BetterAuthIcon, brand: ACCENT_MUTED, label: "better-auth" }],
  description: "Sessions, OAuth, JWT, 2FA and passkeys.",
  href: "https://www.better-auth.com",
};

const LUMOS: Tech = {
  id: "lumos",
  name: "Lumos Framework",
  marks: [{ icon: MagicWand01Icon, label: "Lumos Framework" }],
  description: "shadcn-style component collection for Astro.",
};

const BASE_UI: Tech = {
  id: "base-ui",
  name: "Base UI",
  marks: [{ icon: BaseUiIcon, brand: ACCENT_MUTED, label: "Base UI" }],
  description: "Unstyled, accessible React components.",
  href: "https://base-ui.com",
};

const RADIX_UI: Tech = {
  id: "radix-ui",
  name: "Radix UI",
  marks: [{ icon: RadixUiIcon, brand: ACCENT_MUTED, label: "Radix UI" }],
  description: "Unstyled, accessible React primitives.",
  href: "https://www.radix-ui.com",
};

const MOTION: Tech = {
  id: "motion",
  name: "Motion",
  marks: [{ icon: FramerIcon, brand: "#0055FF", label: "Motion" }],
  description: "Declarative animations for React.",
  href: "https://motion.dev",
};

const TANSTACK_QUERY: Tech = {
  id: "tanstack-query",
  name: "TanStack Query",
  marks: [{ icon: TanstackQueryIcon, brand: "#FF4154", label: "TanStack Query" }],
  description: "Async server state with caching and invalidation.",
  href: "https://tanstack.com/query",
};

const ZUSTAND: Tech = {
  id: "zustand",
  name: "Zustand",
  marks: [{ icon: ZustandIcon, label: "Zustand" }],
  description: "Small client state store with a minimal API.",
  href: "https://zustand.docs.pmnd.rs",
};

const REACT_HOOK_FORM: Tech = {
  id: "react-hook-form",
  name: "React Hook Form",
  marks: [{ icon: ReactHookFormIcon, brand: "#EC5990", label: "React Hook Form" }],
  description: "Form state with minimal re-renders.",
  href: "https://react-hook-form.com",
};

const ZOD: Tech = {
  id: "zod",
  name: "Zod",
  marks: [{ icon: ZodIcon, brand: "#408AFF", label: "Zod" }],
  description: "Schema validation that infers back into TypeScript.",
  href: "https://zod.dev",
};

const VITEST: Tech = {
  id: "vitest",
  name: "Vitest",
  marks: [{ icon: VitestIcon, brand: "#00FF74", label: "Vitest" }],
  description: "Unit and integration tests.",
  href: "https://vitest.dev",
};

const PLAYWRIGHT: Tech = {
  id: "playwright",
  name: "Playwright",
  marks: [{ icon: MaskTheater02Icon, label: "Playwright" }],
  description: "End-to-end browser tests.",
  href: "https://playwright.dev",
};

// ─── JS Tooling ──────────────────────────────────────────────────────────────

const PNPM: Tech = {
  id: "pnpm",
  name: "pnpm",
  marks: [{ icon: PnpmIcon, brand: "#F69220", label: "pnpm" }],
  description: "Default package manager.",
  href: "https://pnpm.io",
};

const NUB: Tech = {
  id: "nub",
  name: "Nub",
  marks: [{ icon: Wrench01Icon, label: "Nub" }],
  description: "TypeScript-first toolchain for Node.js.",
  href: "https://nubjs.com",
};

const TURBOREPO: Tech = {
  id: "turborepo",
  name: "Turborepo",
  marks: [{ icon: TurborepoIcon, brand: "#FF1E56", label: "Turborepo" }],
  description: "Monorepo task running and caching.",
  href: "https://turborepo.com",
};

const VITE: Tech = {
  id: "vite",
  name: "Vite",
  marks: [{ icon: ViteIcon, brand: "#9135FF", label: "Vite" }],
  description: "Dev server and bundler outside of Next.js.",
  href: "https://vite.dev",
};

const ESLINT: Tech = {
  id: "eslint",
  name: "ESLint",
  marks: [{ icon: EslintIcon, brand: "#4B32C3", label: "ESLint" }],
  description: "Linting, enforced in CI.",
  href: "https://eslint.org",
};

const PRETTIER: Tech = {
  id: "prettier",
  name: "Prettier",
  marks: [{ icon: PrettierIcon, brand: "#F7B93E", label: "Prettier" }],
  description: "Consistent code formatting.",
  href: "https://prettier.io",
};

const OXLINT: Tech = {
  id: "oxlint",
  name: "Oxlint",
  marks: [{ icon: OxcIcon, brand: "#00F7F1", label: "Oxc" }],
  description: "Rust-based linter for JavaScript and TypeScript.",
  href: "https://oxc.rs",
};

const OXFMT: Tech = {
  id: "oxfmt",
  name: "Oxfmt",
  marks: [{ icon: OxcIcon, brand: "#00F7F1", label: "Oxc" }],
  description: "Rust-based formatter for JavaScript and TypeScript.",
  href: "https://oxc.rs",
};

// ─── Go ──────────────────────────────────────────────────────────────────────

const GO: Tech = {
  id: "go",
  name: "Go",
  marks: [{ icon: GoIcon, brand: "#00ADD8", label: "Go" }],
  description: "Backend language when performance matters.",
  tagline: "Backends where performance matters",
  href: "https://go.dev",
};

const GIN: Tech = {
  id: "gin",
  name: "Gin",
  marks: [{ icon: GinIcon, brand: "#008ECF", label: "Gin" }],
  description: "HTTP framework for Go APIs.",
  href: "https://gin-gonic.com",
};

const NET_HTTP: Tech = {
  id: "net-http",
  name: "net/http",
  marks: [{ icon: GoIcon, brand: "#00ADD8", label: "Go standard library" }],
  description: "HTTP server and client from the Go standard library.",
  href: "https://pkg.go.dev/net/http",
};

const GORM: Tech = {
  id: "gorm",
  name: "GORM",
  marks: [{ icon: GoIcon, brand: "#00ADD8", label: "GORM (Go ORM)" }],
  description: "ORM for Go with migrations and relations.",
  href: "https://gorm.io",
};

// ─── Python ──────────────────────────────────────────────────────────────────

const PYTHON: Tech = {
  id: "python",
  name: "Python",
  marks: [{ icon: PythonIcon, brand: "#3776AB", label: "Python" }],
  description: "For when I need its ecosystem.",
  tagline: "AI features and scripting",
  href: "https://www.python.org",
};

const FASTAPI: Tech = {
  id: "fastapi",
  name: "FastAPI",
  marks: [{ icon: FastapiIcon, brand: "#009688", label: "FastAPI" }],
  description: "Typed Python APIs.",
  tagline: "Python APIs",
  href: "https://fastapi.tiangolo.com",
};

const PYDANTIC: Tech = {
  id: "pydantic",
  name: "Pydantic",
  marks: [{ icon: PydanticIcon, brand: "#E92063", label: "Pydantic" }],
  description: "Data validation and settings from type hints.",
  href: "https://docs.pydantic.dev",
};

const UV: Tech = {
  id: "uv",
  name: "uv",
  marks: [{ icon: UvIcon, brand: "#DE5FE9", label: "uv" }],
  description: "Package and project manager for Python.",
  href: "https://docs.astral.sh/uv",
};

const FLASK: Tech = {
  id: "flask",
  name: "Flask",
  marks: [{ icon: FlaskIcon, brand: ACCENT_MUTED, label: "Flask" }],
  description: "Lightweight web framework.",
  href: "https://flask.palletsprojects.com",
};

const SQLALCHEMY: Tech = {
  id: "sqlalchemy",
  name: "SQLAlchemy",
  marks: [{ icon: PotionIcon, brand: "#D71F00", label: "SQLAlchemy" }],
  description: "SQL toolkit and ORM.",
  href: "https://www.sqlalchemy.org",
};

const ALEMBIC: Tech = {
  id: "alembic",
  name: "Alembic",
  marks: [{ icon: Chemistry02Icon, label: "Alembic" }],
  description: "Database migrations for SQLAlchemy.",
  href: "https://alembic.sqlalchemy.org",
};

const JINJA: Tech = {
  id: "jinja",
  name: "Jinja2",
  marks: [{ icon: JinjaIcon, brand: "#7E0C1B", label: "Jinja2" }],
  description: "Server-rendered HTML templates.",
  href: "https://jinja.palletsprojects.com",
};

const HTTPX: Tech = {
  id: "httpx",
  name: "httpx",
  marks: [{ icon: Globe02Icon, label: "httpx" }],
  description: "Sync and async HTTP client.",
  href: "https://www.python-httpx.org",
};

const RUFF: Tech = {
  id: "ruff",
  name: "ruff",
  marks: [{ icon: RuffIcon, brand: "#D7FF64", label: "ruff" }],
  description: "Linter and formatter.",
  href: "https://docs.astral.sh/ruff",
};

const PYTEST: Tech = {
  id: "pytest",
  name: "pytest",
  marks: [{ icon: PytestIcon, brand: "#0A9EDC", label: "pytest" }],
  description: "Test framework.",
  href: "https://docs.pytest.org",
};

const TY: Tech = {
  id: "ty",
  name: "ty",
  marks: [{ icon: AstralIcon, brand: ACCENT_MUTED, label: "Astral" }],
  description: "Type checker from Astral.",
  badge: "waiting for stable",
  href: "https://docs.astral.sh/ty",
};

// ─── AI ──────────────────────────────────────────────────────────────────────

const VERCEL_AI_SDK: Tech = {
  id: "vercel-ai-sdk",
  name: "Vercel AI SDK",
  marks: [{ icon: VercelIcon, brand: ACCENT_MUTED, label: "Vercel" }],
  description: "AI features in TypeScript apps.",
  href: "https://ai-sdk.dev",
};

const PYDANTIC_AI: Tech = {
  id: "pydantic-ai",
  name: "Pydantic AI",
  marks: [{ icon: PydanticIcon, brand: "#E92063", label: "Pydantic" }],
  description: "Typed agents and LLM workflows in Python.",
  href: "https://ai.pydantic.dev",
};

const LLMAAS: Tech = {
  id: "llmaas",
  name: "LLMaaS",
  marks: [{ icon: AiCloud01Icon, label: "LLMaaS" }],
  description: "LLM as a Service: hosted model providers.",
};

// ─── Databases ───────────────────────────────────────────────────────────────

const POSTGRESQL: Tech = {
  id: "postgresql",
  name: "PostgreSQL",
  marks: [{ icon: PostgresqlIcon, brand: "#4169E1", label: "PostgreSQL" }],
  description: "My default database.",
  tagline: "Default database",
  href: "https://www.postgresql.org",
};

const SQL: Tech = {
  id: "sql",
  name: "SQL",
  marks: [{ icon: SqlIcon, label: "SQL" }],
  description: "Queries, schema design and migrations.",
};

// ─── DevOps & Hosting ────────────────────────────────────────────────────────

const DOCKER: Tech = {
  id: "docker",
  name: "Docker",
  marks: [{ icon: DockerIcon, brand: "#2496ED", label: "Docker" }],
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
  marks: [{ icon: GithubActionsIcon, brand: "#2088FF", label: "GitHub Actions" }],
  description: "CI for linting, type checks and tests.",
  href: "https://github.com/features/actions",
};

const VERCEL: Tech = {
  id: "vercel",
  name: "Vercel",
  marks: [{ icon: VercelIcon, brand: ACCENT_MUTED, label: "Vercel" }],
  description: "Primary hosting for web apps.",
  tagline: "Primary hosting for web apps",
  href: "https://vercel.com",
};

const HETZNER: Tech = {
  id: "hetzner",
  name: "Hetzner",
  marks: [{ icon: HetznerIcon, brand: "#D50C2D", label: "Hetzner" }],
  description: "Self-hosted services via Docker.",
  href: "https://www.hetzner.com",
};

const CLOUDFLARE_PAGES: Tech = {
  id: "cloudflare-pages",
  name: "Cloudflare Pages",
  marks: [{ icon: CloudflarePagesIcon, brand: "#F38020", label: "Cloudflare Pages" }],
  description: "Static and edge hosting.",
  href: "https://pages.cloudflare.com",
};

const RAILWAY: Tech = {
  id: "railway",
  name: "Railway",
  marks: [{ icon: RailwayIcon, brand: ACCENT_MUTED, label: "Railway" }],
  description: "Managed app and database hosting.",
  href: "https://railway.com",
};

// ─── Environment ─────────────────────────────────────────────────────────────

const GITHUB: Tech = {
  id: "github",
  name: "GitHub",
  marks: [{ icon: GithubIcon, brand: ACCENT_MUTED, label: "GitHub" }],
  description: "Version control and CI.",
  tagline: "Version control and CI",
  href: "https://github.com/nilsbtr",
};

const GIT: Tech = {
  id: "git",
  name: "Git",
  marks: [{ icon: GitIcon, brand: "#F05032", label: "Git" }],
  description: "Version control.",
  href: "https://git-scm.com",
};

const VSCODE: Tech = {
  id: "vscode",
  name: "VS Code",
  marks: [{ icon: VisualStudioCodeIcon, label: "VS Code" }],
  description: "Code editor.",
  href: "https://code.visualstudio.com",
};

const ZED: Tech = {
  id: "zed",
  name: "Zed",
  marks: [{ icon: ZedIcon, brand: "#084CCF", label: "Zed" }],
  description: "Code editor.",
  href: "https://zed.dev",
};

const ZSH: Tech = {
  id: "zsh",
  name: "zsh",
  marks: [{ icon: ZshIcon, brand: "#F15A24", label: "zsh" }],
  description: "Shell, plus bash basics.",
  href: "https://www.zsh.org",
};

const SSH: Tech = {
  id: "ssh",
  name: "SSH",
  marks: [{ icon: ComputerTerminal01Icon, label: "SSH" }],
  description: "Remote access to servers.",
};

// ─── Java ────────────────────────────────────────────────────────────────────

const JAVA: Tech = {
  id: "java",
  name: "Java",
  marks: [{ icon: JavaIcon, brand: ACCENT_MUTED, label: "Java" }],
  description: "General-purpose, object-oriented language.",
  href: "https://dev.java",
};

const SPRING_BOOT: Tech = {
  id: "spring-boot",
  name: "Spring Boot",
  marks: [{ icon: SpringBootIcon, brand: "#6DB33F", label: "Spring Boot" }],
  description: "Java web apps and APIs.",
  href: "https://spring.io/projects/spring-boot",
};

const MAVEN: Tech = {
  id: "maven",
  name: "Maven",
  marks: [{ icon: FeatherIcon, brand: "#C71A36", label: "Maven" }],
  description: "Build and dependency management.",
  href: "https://maven.apache.org",
};

const VAADIN: Tech = {
  id: "vaadin",
  name: "Vaadin",
  marks: [{ icon: VaadinIcon, brand: "#00B4F0", label: "Vaadin" }],
  description: "Web UIs written in Java.",
  href: "https://vaadin.com",
};

const CHECKSTYLE: Tech = {
  id: "checkstyle",
  name: "Checkstyle",
  marks: [{ icon: CheckListIcon, label: "Checkstyle" }],
  description: "Code style checks.",
  href: "https://checkstyle.org",
};

// ─── Currently Learning ──────────────────────────────────────────────────────

const TANSTACK_START: Tech = {
  id: "tanstack-start",
  name: "TanStack Start",
  marks: [{ icon: TanstackIcon, brand: ACCENT_MUTED, label: "TanStack Start" }],
  description: "Fullstack React framework.",
  href: "https://tanstack.com/start",
};

const CONVEX: Tech = {
  id: "convex",
  name: "Convex",
  marks: [{ icon: ConvexIcon, brand: "#EE342F", label: "Convex" }],
  description: "Reactive backend and database.",
  href: "https://convex.dev",
};

const GSAP: Tech = {
  id: "gsap",
  name: "GSAP",
  marks: [{ icon: GsapIcon, brand: "#0AE448", label: "GSAP" }],
  description: "Advanced web animation.",
  href: "https://gsap.com",
};

const FLUTTER: Tech = {
  id: "flutter",
  name: "Flutter",
  marks: [{ icon: FlutterIcon, brand: "#02569B", label: "Flutter" }],
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
