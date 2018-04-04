# v3.1.1
## Addresses a bug where twSelect would not initialise selected value correctly
This only occurred when navigating between routes using ui-router. Solved by
updating to use one way binding for options and $onChanges over $scope.watch.

# v3.1.0
## Add on-expand and on-collapse callbacks to tw-card

# v3.0.7
## Copy fonts to the demo folder and branch

# v3.0.6
## Configure circle-ci identity on github
 - This will prevent failures here and there on deployment after merge to master

# v3.0.5
## Fix tw-form-control name
 - Pass tw-field name to tw-form-control instead of deleted field.key

# v3.0.4
## Improve CI pipeline
 - Copy README to dist folder
 - Fix issue with deployment of demo

# v3.0.3
## Fix automatic deploy of demo

# v3.0.2
## Bump version number

# v3.0.1
## Fix copy files to dist command
Add -p option to mkdir in the copy files to dist command

# v3.0.0
## Update build system
After this, the build won't need to be done manually.
On merge circleCI will:
 - build the project and publish it to github and npm
 - update the demo pages and publish it

In order to publish to npm, the project is also renamed to @transferwise/styleguide-components.
The README is also updated to reflect these changes.
