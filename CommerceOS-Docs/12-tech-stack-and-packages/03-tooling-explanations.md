# Tooling & Package Explanations

This document provides a breakdown of specific tools and packages used in the CommerceOS monorepo, detailing their purpose and why they were chosen based on our architectural guidelines.

## 1. Security
- **`argon2`**: Used for hashing user passwords before saving them to the database. It is the modern cryptographic standard and is significantly more resistant to brute-force attacks (especially those using GPUs) than older alternatives like `bcrypt`. 

## 2. Code Quality & Git Workflow
These tools work together to ensure poor-quality code or badly formatted commits never make it into the repository:
- **`husky`**: Manages Git Hooks. It listens for Git commands (like `git commit`) and triggers validation scripts *before* the commit is allowed to complete.
- **`lint-staged`**: Triggered by Husky right before a commit. Instead of checking the *entire* codebase (which is slow), it only runs the linter (`eslint`) and formatter (`prettier`) on the specific files that were just edited. If it finds errors, it blocks the commit.
- **`@commitlint`**: Also triggered by Husky, it checks commit messages to ensure they follow the "Conventional Commits" format (e.g., `feat(api): add user login`). This keeps the git history clean and enables automated release notes.

## 3. Testing Suite
- **`@playwright/test`**: Used for End-to-End (E2E) testing. It spins up a real browser (Chrome, Firefox, Safari) and simulates a user clicking through the storefront or admin panel to ensure the entire system works from end to end.
- **`k6`**: A performance and load-testing tool. Used to simulate thousands of concurrent users hitting the API or checkout endpoints to verify server stability under pressure.
- **`storybook`**: A development environment specifically for UI components. It allows developers to view, test, and interact with individual React components (like buttons, modals, and cards) in isolation, without having to spin up the entire application.
- **`axe-core` & `jest-axe`**: Automated accessibility testing engines. They scan UI components to ensure they can be used by people with disabilities (e.g., checking color contrast, screen-reader compatibility, and keyboard navigation).

## 4. Utilities & Observability
- **`date-fns`**: A utility library for parsing, formatting, and manipulating dates and times (e.g., adding days, formatting for different timezones). It replaces the need to write custom Javascript `Date` math, which is notoriously error-prone and buggy.
- **`@sentry/nextjs` & `@sentry/react`**: Error tracking tools. If a user's browser crashes or throws a JavaScript error while they are using the Storefront or Admin dashboard, Sentry automatically catches the error and sends a detailed report (including the exact line of code that failed) to the Sentry dashboard.

## 5. Frontend Guidelines (React Query)
- **`useSuspenseQuery`**: A specific hook from `@tanstack/react-query`. Previously, the app used `useQuery`, which required manually writing `if (isLoading) return <Spinner/>` inside every single component. `useSuspenseQuery` is a modern React pattern that automatically "suspends" the component while data is fetching, pushing the loading state up to a single, global `<Suspense>` boundary. This results in cleaner code and better loading experiences.
