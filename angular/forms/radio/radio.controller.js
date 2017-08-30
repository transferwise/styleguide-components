
function TwRadioController($scope, $element) {
  var $ctrl = this,
    $ngModel = $element.controller('ngModel'),
    radioSelector = '.radio',
    labelSelector = 'label';

  $ctrl.isChecked = function() {
    return ($ctrl.ngValue && $ctrl.ngModel === $ctrl.ngValue) ||
      $ctrl.value === $ctrl.ngModel;
  };
  $ctrl.checked = $ctrl.isChecked();
  $ctrl.buttonClick = function($event) {
    if ($ctrl.ngDisabled) {
      return;
    }

    $ctrl.checked = true;
    $ngModel.$setViewValue($ctrl.ngValue || $ctrl.value);
  };
  $ctrl.buttonFocus = function() {
    $element.closest(labelSelector).addClass('focus');
    $element.triggerHandler('focus');
  };
  $ctrl.buttonBlur = function() {
    $element.closest(labelSelector).removeClass('focus');
    $element.triggerHandler('blur');
  };
  $ctrl.hiddenInputChange = function() {
    // This only fires on label click
    // Normal change handler doesn't, so trigger manually
    if ($ctrl.ngChange) {
      $ctrl.ngChange();
    }
  };

  $element.on('blur', function(event) {
    $ngModel.$setTouched();
  });

  $scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $ngModel.$setDirty();
    }
    $ctrl.checked = $ctrl.isChecked();
  });

  $scope.$watch('$ctrl.ngDisabled', function(newValue, oldValue) {
    if (newValue && !oldValue) {
      $element.closest(radioSelector).addClass('disabled');
    } else if (!newValue && oldValue) {
      $element.closest(radioSelector).removeClass('disabled');
    }
  });
}

TwRadioController.$inject = ['$scope', '$element'];

export default TwRadioController;
