  import TwDateController from  './tw-date.controller.js';

  const daySectionTemplate = " \
    <label class='sr-only'>Day</label> \
    <input type='number' \
      name='day' \
      class='form-control tw-date-day' \
      ng-model='$ctrl.day' \
      ng-change='$ctrl.updateDateModelAndValidationClasses()' \
      placeholder='DD' \
      min='1' \
      ng-min='1' \
      ng-disabled='$ctrl.dateDisabled' \
      ng-required='$ctrl.dateRequired' \
      tw-focusable />";

  const monthSectionTemplate = "  \
    <label class='sr-only'>Month</label>\
    <tw-select \
      name='month' \
      class='tw-date-month' \
      ng-model='$ctrl.month' \
      ng-change='$ctrl.updateDateModelAndValidationClasses()' \
      ng-required='$ctrl.dateRequired' \
      ng-disabled='$ctrl.dateDisabled' \
      options='$ctrl.dateMonths'> \
    </tw-select>";

  const yearSectionTemplate = " \
    <label class='sr-only'>Year</label> \
    <input type='number' \
      name='year' \
      class='form-control tw-date-year' \
      placeholder='YYYY' \
      ng-model='$ctrl.year' \
      ng-change='$ctrl.updateDateModelAndValidationClasses()' \
      ng-min='$ctrl.min.getFullYear()' \
      ng-max='$ctrl.max.getFullYear()' \
      maxlength='4' \
      ng-maxlength='4' \
      ng-disabled='$ctrl.dateDisabled' \
      ng-required='$ctrl.dateRequired' \
      tw-focusable />";

  const templateAsString = " \
    <div class='row'> \
      <div class='col-sm-5 tw-date-month-column' ng-if='$ctrl.monthBeforeDay'>" +
        monthSectionTemplate + " \
      </div> \
      <div class='col-sm-3 tw-date-day-column'>" +
        daySectionTemplate + " \
      </div> \
      <div class='col-sm-5 tw-date-month-column' ng-if='!$ctrl.monthBeforeDay'>" +
        monthSectionTemplate + " \
      </div> \
      <div class='col-sm-4 tw-date-year-column'>" +
        yearSectionTemplate + " \
      </div> \
    </div>";

  const TwDate = {
    require: 'ngModel',
    controller: TwDateController,
    bindings: {
      ngModel: '=',
      required: '@',
      ngRequired: '<',
      disabled: '@',
      ngDisabled: '<',
      locale: '@',
      twLocale: '<',
      min: '@',
      ngMin: '<',
      max: '@',
      ngMax: '<',
      modelType: '@'
    },
    template: templateAsString
  };

  export default angular
    .module('tw.components.date', [])
    .component('twDate', TwDate).name;
