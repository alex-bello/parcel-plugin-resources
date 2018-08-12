# parcel-plugin-resources

Parcel plugin to watch and copy resources to the Parcel bundle directory. This plugin is actually just a thin wrapper
for the [cpx](https://www.npmjs.com/package/cpx) module.

By default, this plugin recursively copies all files from `<rootDir>/resources` into `<bundleDir>/resources`. The
`<rootDir>` is the directory which contains your entry asset. If your entry asset is `my/project/index.js`, then the
`<rootDir>` is `my/project`.

If parcel is started as a local development server, then all resources will be watched and automatically re-copied when
changed, added, or removed.

## Getting Started

Install the plugin:

```bash
yarn add --dev parcel-plugin-resources
```

Or

```bash
npm install --dev parcel-plugin-resources
```

Parcel will automatically detect the plugin.

## Configuration

If you need to change the resource glob pattern or destination directory, you can add the following to your `package.json`.

```json
{
  ...
  "resources": {
    "glob": "resources/**",
    "destination": "resources"
  }
}
```

Default values are shown above.
