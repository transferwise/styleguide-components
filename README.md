# styleguide-components
AngularJS components for TransferWise Bootstrap.  The repo provides form controls,
dynamic form components, validation, and some styling directives.

Live demo and documentation http://transferwise.github.io/styleguide-components/

### Installation
It is recommended to use yarn, npm or bower to import the latest version
```
dependencies: {
    "styleguide-components": "https://github.com/transferwise/styleguide-components.git#v1.2.0",
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
To try a live example clone this project, run `npm install` and open index.html in the examples folder.

For live reload on port 8181, you can run the following:
```
npm run dev
```

## Releasing

In order to release a new version, here are the steps necessary:

1. **Build your files and commit them**

    Simply running `npm start` will build them, then you should see changes in `/dist`, you should commit both source and distribution files.

2. **Run the tests**

    `npm test` will do the trick but make sure you run these after building the `/dist` files

3. **Bump the version in `package.json`**

    Recommended to stick to semver for this: http://semver.org

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
