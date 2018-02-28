# styleguide-components
AngularJS components for TransferWise Bootstrap.  The repo provides form controls,
dynamic form components, validation, and some styling directives.

Live demo and documentation http://transferwise.github.io/styleguide-components/

### Installation
Use yarn, npm or bower to import the latest version.  Specify at least a major
version so that you can manage breaking changes.
```
dependencies: {
    "styleguide-components": "https://github.com/transferwise/styleguide-components.git#vX.X.X",
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
