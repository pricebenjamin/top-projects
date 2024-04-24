## Repository Setup

### Install `typescript`

```
npm install --save-dev typescript
```

### Install and configure `jest`

Following along with https://jestjs.io/docs/getting-started

This repository will be using `jest` with `typescript` support provided by
`babel`.

```bash
npm install --save-dev \
  jest \
  babel-jest \
  @babel/core \
  @babel/preset-env \
  @babel/preset-typescript
```

Create `babel.config.json` with the following contents.

```babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/preset-typescript"
  ]
}
```

Add `test` script to `package.json`.

```package.json
{
  "scripts": {
    "test": "jest"
  }
}
```
