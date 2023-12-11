# Front End React App extended from Tasty Trade Example app

See [front-end-extensiont.md](./front-end-extensions.md)

## Running locally

This example app links to the `tastytrade-api` npm package locally in the package.json.

Before running this, you need to compile the typescript in that package.

```node
npm run build
cd examples
npm run dev
```

Any time you make changes to the code in the package (i.e. any code in `lib/`), you need to re-run `npm run build`.

//TODO: Deploy to Azure:
//TODO: Github workflow to deploy to Azure

## Increment version for changes

```node

npm version patch # increments the patch version
npm version minor # increments the minor version
npm version major # increments the major version

```

## Create Git Tags for changes/releases

```git

git tag -a v1.0.0 -m "Release version 1.0.0"
git push --tags

```
