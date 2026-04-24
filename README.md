# vol-renderer

A npm package to display NIfTI volume (based on ThreeJs)

<div align="center">
  <img src="docs/vol-renderer_preview.png">
</div>

<br/><br/>

## Try the online [demo](https://brainminds-dataportal.github.io/vol-renderer/demo/index.html).

<br/><br/>

## Usage

In the consuming project, add a line to your `.npmrc` file so this package can be retrieved from github package registry :

```.rc
@brainminds-dataportal:registry=https://npm.pkg.github.com
```

And if not already done, you'll also need to include a personal token with `read:packages` scope to be able to install packages from github registry:
```.rc
//npm.pkg.github.com/:_authToken=<REPLACE_BY_YOUR_TOKEN>'
```

(References: [authenticating to github packages](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages#authenticating-to-github-packages) and [create a personal (classic) token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic))

### Install package

```sh
npm install @brainminds-dataportal/vol-renderer
```

### Import package and use in your code

The published npm package exposes the library entrypoints and stylesheet below.
Files under `demo/` and `demo-app/` are for repository demos and are not part of
the package API.

```javascript

import 'normalize.css';

....

import { VolumeRenderer } from "@brainminds-dataportal/vol-renderer";

import "@brainminds-dataportal/vol-renderer/dist/main.css";

....

    <VolumeRenderer
        url='resources/Marmoset_T2WI.nii.gz'
        inlineControls={true}
    />


```

<br/><br/>

## Repository demo app

A Vite-based React + TypeScript demo project is available under `demo-app/`.
It is intended for repository development and manual verification of the library.

From the repository root:

```sh
npm install
npm run demo:dev
npm run demo:build
npm run demo:sync
```

For demo-app-specific notes, see [`demo-app/README.md`](demo-app/README.md).

<br/><br/>

## Package publishing

Publishing to GitHub Packages is handled by GitHub Actions on `v*` tags.
The tag version must match `package.json` exactly (for example, `v0.1.0`
requires `"version": "0.1.0"`).
