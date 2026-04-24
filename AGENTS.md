# Agents Guidelines

## Code Comments

All comments written inside source code (inline comments, block comments, doc comments) **must be in English**.

This applies to all programming languages used in this repository (Typescript, Javascript, Json, etc.).

## Git Commit Messages

Commit messages **must always be written in English**, regardless of the project or team language.

### Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

#### Types

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code change that is neither a feature nor a bug fix |
| `perf` | A code change that improves performance |
| `docs` | Documentation changes only |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates, tooling |
| `ci` | Changes to CI/CD configuration |
| `revert` | Reverting a previous commit |

#### Rules

- **Subject line**: imperative mood, no trailing period, ≤ 72 characters
  - ✅ `feat(upload): add recursive directory support`
  - ❌ `Added recursive directory support.`
- **Scope**: optional, lowercase, refers to the affected module or area (e.g., `login`, `upload`, `config`)
- **Body**: explain *what* and *why*, not *how*; wrap at 72 characters; separated from subject by a blank line
- **Line breaks**: use real newline characters in the commit body; do not write
  literal `\n` sequences
- **Breaking changes**: add `!` after the type/scope and/or a `BREAKING CHANGE:` footer

## General Guidelines

- This file itself is written in English as the authoritative reference for agents.

## Repository Workflow

- `demo-app/` is the Vite-based React + TypeScript app used for local
  verification of the library.
- Use the root scripts for demo work unless there is a specific reason to
  work inside `demo-app/` directly:
  - `npm run demo:dev`
  - `npm run demo:build`
  - `npm run demo:sync`
- The root `demo/` directory is a deployable mirror of `demo-app/dist/`.
  Do not update `demo/` manually; refresh it with `npm run demo:sync`.
- For code changes, the default validation commands are:
  - `npm run build`
  - `npm run demo:build`
- Package publishing is triggered by pushing a `v*` tag.
  The tag version must match `package.json.version` exactly.
