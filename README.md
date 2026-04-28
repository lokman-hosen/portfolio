# Portfolio Monorepo

Senior fullstack software engineer portfolio platform built with NestJS,
Next.js, PostgreSQL, and Prisma.

## Structure

```text
apps/
  api/      NestJS backend
  web/      Next.js frontend
packages/
  database/ Prisma schema and client generation
  shared/   Shared TypeScript types and constants
```

## Setup

```bash
cd api then run: npm install
cp .env.example .env
```

Update `DATABASE_URL` in `.env` before running Prisma migrations.

## Common Commands

```bash
npm run api:dev
npm run web:dev
npm run db:migrate
npm run db:generate
npm run lint
npm run test
npm run build
```

The repo uses npm workspaces so dependencies and scripts are managed from the
root while each app keeps its own framework-specific configuration.
