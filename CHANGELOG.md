# v4.1.0
## New Async Task Config service
New service to enhance and extend async functionality (persistAsync/validationAsync).
Optional service for consumers to set base url and headers.

# v4.0.0
## Temporarily remove async upload with tw-upload
Until a robust solution is found to accept the correct url.
We temporarily stop async upload, because it fails and stops a user from submitting the form.

# v3.13.0
## Feature enhancements for camera upload component
Added camera overlay
Default to selfie cam for devices with single video input and make selfie cam mirror user

# v3.12.4
## Bump angular to 1.5.10
The components use features introduced in 1.5.10, so the library should enforce that

# v3.12.3
## Select undefined options fix
Check if the available options passed to the `twSelect` component is an iterable array

# v3.12.2
## Camera upload component bugfix
Convert camera direction component input to lowercase

# v3.12.1
## Fix css style problem with buttons in camera upload component
Fixed line-height attribute for cancel and confirm button in camera upload component

# v3.12.0
## JSON schema forms now default to the first 'oneOf' schema that validates
This is useful when editing existing data as we select a sensible schema.  Also
addresses a couple small bugs when handling unusual data. Adds a new 'JSON schema
playground' where you can see how schemas render in real time.

# v3.11.1
## Support new camera upload related dynamic form properties
Process and propate newly added properties in dynamic interface supporting camera upload

# v3.11.0
## Add camera upload component
Added a component in twUpload that allows users to perform assisted camera uploads
This component is used in place when a "camera only" upload mode is specified for twUpload

# v3.10.3
## Ensure components include their dependent modules
Tests now only instantiate their own module, rather than the full library.
Switch to using angular.mock.inject and angular.mock.module rather than globals.

# v3.10.2
## Enable eslint operator-linebreak rule
Fix violations.

# v3.10.1
## Enable eslint no-useless-path-segments rule
Fix violations

# v3.10.0
## Add support for persistAsync
twUpload can now post images immediately and extract an id from the response to
bind to the model.  This can also be used by twFormControl and twField.

# v3.9.4
## Change the tests to run in Chrome
PhantomJS was failing non-deterministically.

# v3.9.3
## Render all header option in select

# v3.9.2
## Update dependencies, remove jshint.

# v3.9.1
## Fix min and max validation error messages

# v3.9.0
## Adds "empty" option to tw-card

# v3.8.5
## Filter duplicates based on label and value in tw-select

# v3.8.4
## Increase the tw-select large option size from 50 to 300

# v3.8.3
## Improve tw-select performance with large option lists

# v3.8.2
## Adjust date time format

# v3.8.1
## Changes the background for repeat transfer section of the card
This section was wrongly painted white, where it should have been grey.

# v3.8.0
## Add validation features and broadcast validity from json schema form
onChange event now includes an isValid parameter

# v3.7.1
## Improve JSON schema dynamic forms documentation
Also fixes a small bug on help text and browser autocomplete

# v3.7.0
## Add full support for JSON schema dynamic forms
These components are published in a separate file which must be included to use
the functionality

# v3.6.2
## Add support for twFieldset to use JSON schema required format
twField was already adapted to work this way, this brings twFieldset into line and addresses a bug.  Backwards compatibility is maintained for the previous approach.

# v3.6.1
## Allow user to remove a chosen file from Upload form
Previous behavior required `cancelText` to be passed into the
upload component for the "cancel" link to render. This change provides a placeholder "X" icon when no `cancelText` is provided.

# v3.6.0
## In requirements, help information is now nested, 'required' uses JSON schema approach.
helpText, helpList & helpImage are now expected to be nested as
```
help: {
  message: "...",
  list: [...],
  image: "..."
}
```
Required is now supplied as per JSON schema spec so as an array on the object

```
{
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" }
  }
}
```
Not as a boolean within the property

```
{
  type: "object",
  properties: {
    name: { type: "string", required: true }
  }
}
```
twField therefore adds a property 'required' as the data is no longer within the 'field' data.

```
<tw-field field="$ctrl.field" required="true"></tw-field>
```

# v3.5.10
## Add a callback for model changes on requirements form

# v3.5.9
## Fixing chevron cards style
We have been using button styles so hovering over chevrons presents a wrong behaviour. This version fixes it.

# v3.5.8
## Adding chevron icons to cards.
As part of making activity list cards more visible to customers, we are now adding chevrons to indicate the user that it's a clickable and expandable card item.

# v3.5.7
## Remove special case handling for 'type' in dynamic forms.
Use JSON schema to document is as a required field with a single enum value. Backwards compatibility is maintained.

Refactor twTabs interface so as not to rely on dynamic form structure, this is a breaking interface change but it is not in use outside of the twRequirementsForm.

# v3.5.6
## Add additional CSS class in order to target the popover created by this service
Target the popover created by this service in the DOM in order to reuse the element

# v3.5.5
## Refactor tests for twTelephone
Adopt given, when, then test structure.

# v3.5.4
## Automatically show search box for long lists of values in twSelect
If more than 12 values are supplied search box will be automatically disaplyed.

# v3.5.3
## Fix issue when clicking on containing label of radio button
On first click it failed to update the model, when the model was not already set.

# v3.5.2
## Disable browser autocomplete when we have helpText
Autocomplete hides our help text which normally contains important information.

# v3.5.1
## Remove redundant upload switch case from form-control
Removed redundant switch case 'upload' from form-control component since it was never used.

# v3.5.0
## Add new support to the pop over service for the new popover placements
Changing the popover service API. Adding three new placements for the top, right, bottom and left initial placements.

# v3.4.3
## onRefreshRequirements triggering changes
onRefreshRequirements is now triggered in onChange for all field types.
For text fields the field events are debounced by 300ms to not send a request for every keystroke

# v3.4.2
## Add support for nested error messages inside nested fieldsets
This should have been there from the start.  Nested fieldsets now trigger onRefreshRequirements. Also adds support for warning messages, and fixes a small initialisation bug on tw-checkbox.

# v3.4.1
## Switch dynamic forms to expect model properties in 'properties' not 'fields'.
This change brings us more into line with JSON schema. Backwards compatibility
is maintained for alternatives with a fields collection.

# v3.4.0
## Add support for default values in dynamic fields.

# v3.3.2
## Add a new layout property to tw-definition-list
Allows you to show a definition list in a justified, horizontal, vertical (default) layout

# v3.3.1
## Remove the insertion of the close button from the popover service and move it to the template of the promotions
The responsability of the close button is now part of the templates passed to the popover service.

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
