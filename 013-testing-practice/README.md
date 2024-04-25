## The Odin Project: Testing Practice

For this project, we're asked to write several small pieces of code while
following a test-driven development workflow.

Specifically, my workflow consisted of the following steps:

1. Write a new test
2. Ensure this test fails
3. Write enough code to make all tests pass
4. Repeat

## Repository Setup

Unlike previous projects, this repository is not based on a `vite` template.
Instead, it is a minimally configured installation of `typescript`, `jest`,
and `babel`.

### Install `typescript`

```
npm install --save-dev typescript
```

### Install and configure `jest`

Following along with https://jestjs.io/docs/getting-started

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
