import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./auth-schema";

declare global {
  // Reuse the pool during hot reloads in development.
  var __nilsbtrPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL.");
}

const globalForDb = globalThis as typeof globalThis & {
  __nilsbtrPool?: Pool;
};

export const pool = globalForDb.__nilsbtrPool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__nilsbtrPool = pool;
}

export const db = drizzle(pool, { schema });
