# demo-app

`demo-app/` is the Vite-based React + TypeScript application used to develop and
manually verify `@brainminds-dataportal/vol-renderer`.

## What it does

- imports the library through the local source entrypoint
- bundles the library dependencies into the demo build
- provides a simple browser app for checking `Volume`, `3D Slices`, and related UI behavior

## Commands

From the repository root:

```sh
npm run demo:dev
npm run demo:build
npm run demo:sync
```

Or from inside `demo-app/`:

```sh
npm install
npm run dev
npm run build
```

## Notes

- the demo volume is served from `public/resources/`
- the Vite config aliases `@brainminds-dataportal/vol-renderer` to `../src/index.ts`
- `dist/` is a generated output directory and should not be committed
- `npm run demo:sync` rebuilds `demo-app` and replaces the root `demo/` directory
  with the latest `demo-app/dist/` output
