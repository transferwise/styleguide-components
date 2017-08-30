
function TwDynamicFormControlController($element, $scope) {
  var $ctrl = this;
  var ngModelController = $element.controller('ngModel');
  $ctrl.change = function() {
    ngModelController.$setDirty();
    if ($ctrl.ngChange) {
      $ctrl.ngChange();
    }
  };
  $ctrl.focus = function() {
    $element.triggerHandler('focus');
  };
  $ctrl.blur = function() {
    ngModelController.$setTouched();
    $element.triggerHandler('blur');
  };

  ngModelController.$validators.minlength = function(modelValue, viewValue) {
    var value = modelValue || viewValue;
    if ($ctrl.type !== 'text' || !$ctrl.ngMinlength) {
      return true;
    }
    return !value || value.length >= $ctrl.ngMinlength;
  };
  ngModelController.$validators.maxlength = function(modelValue, viewValue) {
    var value = modelValue || viewValue;
    if ($ctrl.type !== 'text' || !$ctrl.ngMaxlength) {
      return true;
    }
    return !value || value.length <= $ctrl.ngMaxlength;
  };

  // Min and max do not work on custom elements, add manual validators
  ngModelController.$validators.min = function(modelValue, viewValue) {
    var value = modelValue || viewValue;
    if (typeof $ctrl.ngMin === "undefined") {
      return true;
    }
    if (typeof value === "number" &&
      typeof $ctrl.ngMin === "number" &&
      value < $ctrl.ngMin) {
      return false;
    }
    if (value &&
      value.getUTCDate &&
      $ctrl.ngMin.getUTCDate &&
      value < $ctrl.ngMin) {
      return false;
    }
    return true;
  };
  ngModelController.$validators.max = function(modelValue, viewValue) {
    var value = modelValue || viewValue;
    if (typeof $ctrl.ngMax === "undefined") {
      return true;
    }
    if (typeof value === "number" &&
      typeof $ctrl.ngMax === "number" &&
      value > $ctrl.ngMax) {
      return false;
    }
    if (value &&
      viewValue.getUTCDate &&
      $ctrl.ngMax.getUTCDate &&
      value > $ctrl.ngMax) {
      return false;
    }
    return true;
  };
}

TwDynamicFormControlController.$inject = ['$element', '$scope'];

export default TwDynamicFormControlController;
