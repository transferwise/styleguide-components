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

1. **Build your files and commit them**

    Simply running `npm build` will build them, your changes will appear in `/dist`,
    you should commit both source and distribution files.  This will also set up
    a watch to reprocess files as you save them.

2. **Run the tests**

    `npm test`

3. **Bump the version in `package.json`**

    Use semver: http://semver.org

4. **Make a pull request**

    You will need a review from a member of the @transferwise/frontend-guild.

5. **Squash WIP commits and merge**

    Delete your branch after merging.

6. **Send out a new release**

    Go to https://github.com/transferwise/styleguide-components/releases/new, write a good title and description, ask someone what they think and then release 🚀

7. **Update the documentation**

    To update the version hosted on http://transferwise.github.io/styleguide-components/, run the following inside the styleguide-components directory:
    If this is your first time:
    ```
        git clone git@github.com:transferwise/styleguide-components.git gh-pages
        cd gh-pages
        git checkout gh-pages
    ```
    Then, for every update: (checking that you are on the branch `gh-pages`)
    ```
        grunt (in the root of styleguide-components)
        cd gh-pages
        git add .
        git commit -m "Update docs"
        git push origin gh-pages
    ```
