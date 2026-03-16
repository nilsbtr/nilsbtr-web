#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" != "--yes" ]]; then
  echo "This will run Drizzle migrations against the Vercel Production DATABASE_URL."
  echo "Make sure this project is linked with Vercel and your production env vars are set."
  read -r -p "Continue? [y/N] " response

  case "$response" in
    [yY] | [yY][eE][sS]) ;;
    *)
      echo "Aborted."
      exit 1
      ;;
  esac
fi

pnpm dlx vercel@latest env run -e production -- pnpm exec drizzle-kit migrate
