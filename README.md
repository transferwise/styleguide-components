# styleguide-components
AngularJS components for TransferWise Bootstrap.  Currently these components focus on forms and form behaviour, they enable you to use standard Boostrap markup, but gain additional visuals and behaviour.

Live demo http://transferwise.github.io/styleguide-components/

### Installation
It is recommended to use bower to import the latest version
```
dependencies: {
    "styleguide-components": "https://github.com/transferwise/styleguide-components.git#v1.2.0",
}
```

Include the distribution file (exact path depends on your bower directory).
```
<script src="bower_components/styleguide-components/dist/js/styleguide-components.min.js"></script>
```

Within your angular application, simply add the module as a dependency for your application definition.
```
angular.module('my-app', ['tw.styleguide-components']);
```

### Forms
##### Validation
The styleguide components rely on Bootstrap's form-groups to add styling, to add validation simply include the tw-validation directive. Validation will only work if you have bound a value with `ngModel`.  If you were to focus this input and exit without entering a valid value, a `has-error` class will be added to form-group, and the control will be style to show the validation error.
```
<div class="form-group">
    <input class="form-control" ng-model="ctrl.example" tw-validation required />
</div>
```

If you add a Bootstrap `control-label` this will also be styled, blue when the control is focussed, red when invalid.
```
<div class="form-group">
    <label class="control-label">Label</label>
    <input class="form-control" ng-model="ctrl.example" tw-validation required />
</div>
```

If the controls are inside a `form`, validation will also occur on form submit.  Use the `novalidate` attribute to prevent the browser's own validation interfering.
```
<form novalidate>
    <div class="form-group">
        <label class="control-label">Label</label>
        <input class="form-control" ng-model="ctrl.example" required />
    </div>
    <button type="submit">Submit</button>
</form>
```

##### Radio and checkboxes
Using the standard bootstrap form structure, your radio and checkboxes will also be upgraded to much prettier versions supporting all standard functionality.

You will need to use the [TransferWise Bootstrap](http://bootstrap.transferwise.com) project to take advantage of  these styles.
```
<div class="form-group">
    <label class="control-label">Label</label>
	<div class="checkbox">
		<label>
		    <input type="checkbox" value="1" class="form-control" />
			Checkbox 1 label
		</label>
	</div>
</div>
```

### Components
#### tw-select
tw-select is styled replacement for a regular HTML select supporting the same interface, along with keyboard controls etc.
```
<tw-select
  name="mySelect"
  placeholder="Select an option..."
  ng-model="vm.components.select"
  options="[
    {'value': '1', 'label': 'One'},
    {'value': '2', 'label': 'Two'},
    {'value': '3', 'label': 'Three'}
  ]"
  tw-validation>
</tw-select>
```


#### tw-date
Usage:
2 way binding via ng-model, with either a javascript `Date` object or an ISO8601 `String` date: `1994-11-05T08:15:30-05:00`
```
<tw-date ng-model="vm.profile.dateOfBirth" required="true"></tw-date>
```
<img width="488" alt="transferwise_ _pay" src="https://cloud.githubusercontent.com/assets/6596835/13503866/568d1a82-e17a-11e5-8ac2-449b59f0b087.png">

### Examples
To try a live example clone this project, run `npm install` and open index.html in the examples folder.
