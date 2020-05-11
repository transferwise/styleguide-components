# v5.6.1
## Change requested size of images uploaded through the camera component

# v5.6.0
## Add checkbox-group component
Add checkbox-group component and support checkbox control for DF

# v5.5.1
## Fix for v5.5.0: widths sometimes not calculating properly in ng-style for camera

# v5.5.0
## Refactors and fixes assorted bugs with the camera upload component
Most importantly, the camera component will now save images based on the camera resolution, not screen resolution.

# v5.4.2
## Fixes bug where validationMessages were not showing correctly in upload
Error was not correctly passed to onPersistAsyncFailure method and read correctly if been via http interceptor.
This PR corrects how error is sent and checked.

# v5.4.1
## Readme update only, for advice on running tests on Ubuntu 16.04

# v5.4.0
## Markdown component
Introduce markdown component

# v5.3.2
## Use JPEG compression for camera upload image
We were using png before for camera uploads and the image was too big. This update reduces image size from camera upload component by up to 10x.

# v5.3.1
## twSelect calls ngChange when the ngModel and ngRequired are set
Fixes a bug when ngRequired is set to true and a valid ngModel is passed to the component, but parent component was not notified via ngChange callback.

# v5.3.0
## Add responseErrorExtractor to multi file upload
responseErrorExtractor now called whenever a file fails to upload with an error object.

# v5.2.0
## Add onFailure callback when file fails to upload for multi-file upload
onFailure is now called whenever a file fails to upload with an error object. Renamed 'secondaryButtonText' to 'addMoreButtonText'.


# v5.1.2
## Remove failure for upload component on 422 only
Fail on any error status instead of 422 only for upload components. Multi-file upload bug fix when user clicks cancel after uploading.

# v5.1.1
## Fix single file upload
Fix for single file upload where the user has to click on the upload button again to start the upload

# v5.1.0
## Multi upload component
Add multi upload component

# v5.0.2
## Minor problem fixes for upload component
Added async apply to some UI state changes in live upload component
Minor fix to "upload success" callback's parameter routing

# v5.0.1
## Update live upload component's display of overlay image
Flip overlay horizontally if camera is user facing

# v5.0.0
## Refactor twUpload, add drag and drop directives
Removes the ability to transclude a custom success screen into twUpload. Removes uploadingText binding, use processingText.  Removes errorMessage binding, use errorText.

Adds ability to customise droppingText. Refactors the component into multiple parts.

New drag and drop directives simplify working with drag and drop.

# v4.5.7
## Fix upload async actions to not be blocking
If an async action returns any status code other than 422 than continue with the upload flow as normal.

# v4.5.6
## Showing icon on SM screens
Only hiding icons on success and error on XS screens

# v4.5.5
## Fix spacing on feedback text and CTAs on upload
Fail scenarios on async upload will have correct spacing between text and CTAs.

# v4.5.4
## Fix inconsistency with feedback text on upload
Success and fail are now h5 and all icons shown on all screen sizes.

# v4.5.3
## Fix checking error response
Due to a http interceptor in frontend common, error can come back with originalData too.

# v4.5.2
## Fix key for persistAsync
Key should come from httpOptions or fallback to fieldName

# v4.5.1
## Remove elipsis on p
Removed elipsis on p tag in verification

# v4.5.0
## Enablig persistAsync again
Added back persistAsync functionality.

# v4.4.1
## Fixing broken fieldset width
Fieldset width without btn-block was breaking, adding width 100%

# v4.4.0
## Added new design when persistAsync returns errors
Added new design when persistAsync returns errors that the user needs to act on.

# v4.3.0
## Added new design when persistAsync is succesful
Added new design for upload component.

# v4.2.0
## New upload option
Fix bug where uploadOptions was not propagated correctly and add uploadingText to have single state processing copy as an option over processing -> success/failure copy.

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
