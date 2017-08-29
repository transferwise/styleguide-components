import TwRequirementsFormController from './tw-requirements-form.controller.js';

const TwRequirementsForm = {
  bindings: {
    model: '=',
    requirements: '<',
    uploadOptions: '<',
    locale: '@',
    onRefreshRequirements: '&',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?'
  },
  controller: TwRequirementsFormController,
  template: " \
  <tw-tabs \
    ng-if='$ctrl.requirements.length > 1' \
    tabs='$ctrl.requirements' \
    active='$ctrl.model.type'> \
  </tw-tabs> \
  <div class='tab-content' ng-form='twForm'> \
    <div ng-repeat='requirementType in $ctrl.requirements' \
      ng-if='$ctrl.model.type == requirementType.type' \
      class='tab-pane active' \
      id='{{requirementType.type}}'> \
      <p>{{requirementType.description}}</p> \
      <tw-fieldset \
        fields='requirementType.fields' \
        model='$ctrl.model' \
        upload-options='$ctrl.uploadOptions' \
        locale='{{$ctrl.locale}}' \
        onRefreshRequirements='$ctrl.onRefreshRequirements()' \
        validation-messages='$ctrl.validationMessages' \
        error-messages='$ctrl.errorMessages'> \
      </tw-fieldset> \
    </div> \
  </div>"
};


export default TwRequirementsForm;
