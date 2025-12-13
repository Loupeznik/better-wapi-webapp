# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React frontend web application for [Better WAPI](https://github.com/Loupeznik/better-wapi), a DNS record management system. The application allows users to create, read, update, and delete DNS records through a web interface.

## Development Commands

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run preview
```

The dev server runs on port 8033 by default.

## OpenAPI Client Generation

The API client is auto-generated from the Better WAPI OpenAPI specification:

```bash
pnpm run types:openapi
```

This requires the Better WAPI backend running at `http://localhost:8000` with OpenAPI docs available at `/docs/doc.json`. The generated client is placed in `src/api/` and is intentionally excluded from biome linting.

## Code Quality

Use biome for formatting and linting:

```bash
pnpm exec biome check
pnpm exec biome check --write
```

TypeScript type checking:

```bash
pnpm exec tsc --noEmit
```

Note: The `src/api` directory is ignored by biome as it contains auto-generated code.

## Architecture

### State Management

Redux Toolkit is used for global state management with three main slices:

- **domainSlice** (`src/redux/slices/domainSlice.ts`): Manages current domain, DNS records (subdomains), loading states, and uncommitted changes tracking
- **userSlice** (`src/redux/slices/userSlice.ts`): Handles authentication state and user session
- **appSlice** (`src/redux/slices/appSlice.ts`): Stores application configuration loaded from config files

The store is configured in `src/app/store.ts`.

### Async Operations

Redux thunks are organized in `src/redux/thunks/` by domain:

- `records/`: DNS record CRUD operations (addRecord, updateRecord, deleteRecord, fetchRecords, commit)
- `users/`: Authentication operations (loginUser)

### Authentication

The application supports three authentication modes configured via runtime config:

1. **basic**: HTTP Basic authentication
2. **internal-jwt**: JWT-based authentication with login form
3. **oauth2**: OAuth2/OIDC authentication using `oidc-react`

Authentication mode is determined by the `AUTH_MODE` field in the config file.

### Runtime Configuration

Configuration is loaded dynamically at startup from `/public/config.json` (production) or `/public/config.development.json` (development). The config file must be edited after build to set:

- `API_BASE_URL`: Backend API endpoint
- `AUTH_MODE`: Authentication method (basic, internal-jwt, oauth2)
- OAuth2 settings (if using oauth2 mode)

This is handled by `src/helpers/ConfigHelpers.ts`.

### Routing and Pages

Main pages are in `src/pages/`:

- **Home**: Landing page
- **Records**: View and manage DNS records for a domain
- **Create**: Create new DNS records

### Components

UI components in `src/components/`:

- **MainLayout**: Root layout wrapper with routing
- **OAuthWrapper**: Wraps MainLayout for OAuth2 authentication flow
- **Navbar**: Top navigation bar
- **DomainList**: Domain selection interface
- **Login**: Login form for internal-jwt auth mode
- **UpdateForm**: Form for editing existing DNS records
- **UncommitedChangesAlert**: Warning banner when uncommitted changes exist

### UI Library

Uses HeroUI (Hero UI) components with TailwindCSS v4 for styling. HeroUI components have custom configuration with `borderWidth: 0px` to remove default borders.

### API Client

The `src/api/` directory contains auto-generated TypeScript client code from the Better WAPI OpenAPI specification. Do not manually edit these files - regenerate using `pnpm run types:openapi`.

## Build and Deployment

The project uses a multi-stage Dockerfile:

1. Build stage: Uses node:24-alpine to build the application
2. Final stage: Serves static files using nginx:alpine

The CI/CD pipeline (`.github/workflows/ci.yaml`) runs on:

- Push to `master` or `v2` branches
- Pull requests to `master`
- Version tags (`v*.*.*`)

The pipeline builds the application, creates releases for tags, and publishes Docker images to Docker Hub with multi-platform support (linux/amd64, linux/arm64).

## Important Notes

- Always run type checking before committing changes
- The domain state tracks uncommitted changes - records can be modified without auto-commit
- OAuth2 session state is synced between oidc-react and Redux
- The last selected domain is persisted in localStorage
