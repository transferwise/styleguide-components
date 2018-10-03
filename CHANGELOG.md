# v3.4.0
## Add support for default values in dynamic fields.

# v3.3.0
## Add support for nested model in dynamic forms.
Use twFieldset recursively to allow models with nested objects to be created.

Enhance backwards compatibility for older requirements formats.

# v3.2.7
## Update circle ci config

# v3.2.6
## Bump version to fix npm release

# v3.2.5
## Fixed tw-select behavior when no match for filter and enter key pressed

# v3.2.4
## Fixed tw-select to update selected value based on model change

# v3.2.3
## Added support of secondary label for tw-field if control: "radio"

# v3.2.2
## Requirement service use predefined control if present for select type

# v3.2.1
## Add text-word-break to definition list elements to stop overflowing over other elements

# v3.2.0
## Add a submit button component
Provides loading indication and success/failure feedback using twProcess.

# v3.1.2
## Addresses a bug where twSelect would not initialise selected value correctly
This only occurred when navigating between routes using ui-router. Solved by
updating to use one way binding for options and $onChanges over $scope.watch.

# v3.1.1
## Make tw-telephone safer if we get any DOM errors

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
