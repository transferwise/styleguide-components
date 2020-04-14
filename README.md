# styleguide-components
AngularJS components for TransferWise Bootstrap.  The repo provides form controls,
dynamic form components, validation, and some styling directives.

Live demo and documentation: http://transferwise.github.io/styleguide-components/

For detailed documentation on how to use JSON schema dynamic forms: https://transferwise.github.io/styleguide-components/requirements.html

For a playground where you can try out different JSON schemas in a live editor: https://transferwise.github.io/styleguide-components/playground.html

### Installation
Import the latest version number from NPM.
```
dependencies: {
  "@transferwise/styleguide-components": "^3.10.4",
}
```

Include the distribution file (exact path depends on your yarn/npm/bower config).
```
<script src="node_modules/styleguide-components/dist/js/styleguide-components.min.js"></script>
```

Within your angular application, simply add the module as a dependency for your application definition.
```
angular.module('my-app', ['tw.styleguide-components']);
```

### Contributing
Clone the project and run `npm start`, this will build the project and set up a
watch for changes.

To run the local server with live reload you can run the following:
```
npm run dev
```

### Testing

To test, run `npm test`.

If you get errors while testing along the lines of:

```
libpng16.so.16: cannot open shared object file: No such file or directory

    at Object.<anonymous> (node_modules/canvas/lib/bindings.js:3:18)
```

Then be sure to install the necessary dependencies for your OS by following https://www.npmjs.com/package/canvas#compiling.

If you still can't able to find `libpcre.so.1`, and you're (still) on Ubuntu 16.04, well there's no `libpcre.so.1` in the apt packages. Take guidance from [this StackOverflow comment](https://stackoverflow.com/questions/43301339/pcre-issue-when-setting-up-wsgi-application#comment73670596_43301339). You will need to download and extract the latest pcre-8.XX package from https://www.pcre.org/, `./configure`, `make`, (sudo-)move the resulting `.lib/libpcre.so.1.X.X` to maybe `/usr/lib`, update its permissions, and `ln -s` `libpcre.so.1` to it.


## Releasing

In order to release a new version, here are the steps necessary:

1. **Bump the version in `package.json` and add description of the change in `CHANGELOG.md`**

    Use semver: http://semver.org

2. **Make a pull request**

    Tests will be run automatically.
    You will need a review from a member of the @transferwise/frontend-guild.

3. **Squash WIP commits and merge**

    Delete your branch after merging.

4. **Build and release are made automatically on merge**

    CircleCI will:
     - Build the project and publish it to github and npm
     - Update the documentation available on http://transferwise.github.io/styleguide-components/
