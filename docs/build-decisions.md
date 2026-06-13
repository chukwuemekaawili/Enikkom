# Build Decisions & Setup Findings

## Important Setup Findings
- The project is an active, live application for Enikkom Construction Limited.
- Technology stack relies heavily on Vite, React, TypeScript, and Tailwind CSS.
- CMS features are custom-built using Supabase as the backend.
- UI components are built using shadcn/ui and Radix UI primitives.
- Bun is the underlying package manager (`bun.lockb` exists), but standard `npm` commands work via `package.json` scripts.

## Assumptions
- The live environment mirrors the local environment's structure and utilizes Supabase in a similar fashion.
- `enikkom-main` is the primary branch or source of truth, while the `old website` folder contains legacy assets.
- We have local access to Supabase or are working with a shared development database instance.
- No heavy redesign of the underlying UI framework is planned right now; we only adapt using what is there.

## Risks
- Modifying UI components might accidentally detach them from React Hook Form or global Contexts, breaking CMS functionality.
- Since there are no formal design briefs or PRDs, visual redesigns carry the risk of deviating from stakeholder expectations or the existing brand.
- Tailwind class changes might cause unexpected layout shifts on mobile devices if not thoroughly tested on different viewports.

## What is Still Unknown
- The complete set of environment variables needed for local deployment.
- Strict CI/CD pipeline steps (if any) currently configured for GitHub.
- Final approval workflows for the redesign.
