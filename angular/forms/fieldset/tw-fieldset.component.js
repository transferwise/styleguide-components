import TwFieldsetController from './tw-fieldset.controller.js';

const TwFieldset = {
  bindings: {
    legend: '@',
    model: '=',
    fields: '<',
    uploadOptions: '<',
    locale: '@',
    onRefreshRequirements: '&',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?'
  },
  controller: TwFieldsetController,
  template: " \
    <fieldset ng-form='twFieldset'> \
      <legend ng-if='$ctrl.legend'>{{$ctrl.legend}}</legend> \
      <div class='row row-equal-height'> \
        <div ng-repeat='fieldGroup in $ctrl.fields' class='col-xs-12' \
          ng-class='{ \
            \"col-sm-4\": fieldGroup.width === \"sm\", \
            \"col-sm-6\": fieldGroup.width === \"md\" || fieldGroup.maxlength && fieldGroup.maxlength <= 10, \
            \"col-sm-12\": fieldGroup.width === \"lg\" || !fieldGroup.maxlength || fieldGroup.maxlength > 10 \
          }'> \
          <div class='form-group tw-form-group-{{fieldGroup.key}}' style='width: 100%;' \
            ng-class='{ \
              \"has-error\": $ctrl.errorMessages[fieldGroup.key] \
            }'> \
            <label class='control-label' \
              ng-if='fieldGroup.type !== \"upload\"'> \
              {{fieldGroup.name}} \
            </label> \
            <div class='row'> \
              <div class='col-xs-{{field.columns}}' \
                ng-repeat='field in fieldGroup.group'> \
                <tw-dynamic-form-control \
                  name='{{field.key}}' \
                  label='{{fieldGroup.name}}' \
                  type='{{field.type | lowercase}}' \
                  placeholder='{{field.placeholder || field.example}}' \
                  help-text='{{field.helpText}}' \
                  locale='{{$ctrl.locale}}' \
                  upload-accept='{{field.accept}}' \
                  upload-icon='{{field.icon}}' \
                  upload-too-large-message='{{field.tooLargeMessage}}' \
                  options='field.valuesAllowed' \
                  upload-options='$ctrl.uploadOptions' \
                  ng-model='$ctrl.model[field.key]' \
                  ng-blur='$ctrl.onBlur(field)' \
                  ng-change='$ctrl.onChange(field)' \
                  ng-required='field.required' \
                  ng-disabled='field.disabled' \
                  tw-minlength='field.minLength' \
                  tw-maxlength='field.maxLength' \
                  ng-min='field.min' \
                  ng-max='field.max' \
                  ng-pattern='field.validationRegexp' \
                  text-format='field.displayFormat' \
                  tw-validation> \
                  <!-- tw-dynamic-async-validator='field.validationAsync' --> \
                </tw-dynamic-form-control> \
                <div class='error-messages'> \
                  <div ng-repeat='(validationType, validationMessage) in $ctrl.validationMessages' \
                    class='error-{{validationType}}'> \
                    {{validationMessage}} \
                  </div> \
                  <div class='error-provided' ng-if='$ctrl.errorMessages[field.key]'> \
                    {{ $ctrl.errorMessages[field.key] }} \
                  </div> \
                </div> \
                <div ng-if='field.tooltip' \
                  class='help-block'> \
                  {{field.tooltip}} \
                </div> \
              </div> \
            </div> \
          </div> \
        </div> \
      </div> \
    </div> \
  </fieldset>"
};

export default TwFieldset;
