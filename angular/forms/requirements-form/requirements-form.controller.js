
function TwRequirementsFormController($scope, TwRequirementsService) {
  var $ctrl = this;
  $ctrl.switchTab = switchTab;

  function init() {
    if (!$ctrl.model) {
      $ctrl.model = {};
    }

    if ($ctrl.requirements) {
      TwRequirementsService.prepRequirements($ctrl.requirements);
    }

    $scope.$watch('$ctrl.requirements', function(newRequirements, oldRequirements) {
      if (!angular.equals(newRequirements, oldRequirements)) {
        TwRequirementsService.prepRequirements($ctrl.requirements);
        var oldType = $ctrl.model.type;
        var newType =
          $ctrl.requirements.length ? $ctrl.requirements[0].type : null;

        $ctrl.model.type = newType;

        if (oldRequirements && newRequirements) {
          TwRequirementsService.cleanModel(
            $ctrl.model,
            oldRequirements, oldType,
            newRequirements, newType
          );
        }
      }
    });

    $scope.$watch('$ctrl.model.type', function(newType, oldType) {
      switchTab(newType, oldType);
    });

    $scope.$watch('twForm.$valid', function(validity) {
      $ctrl.isValid = validity;
    });

    // TODO can we add asyncvalidator here? - prob not
  }

  /**
   * Perform the refreshRequirementsOnChange check on blur
   */
  $ctrl.onBlur = function(field) {
    if (!field.refreshRequirementsOnChange) {
      return;
    }
    // TODO disabled the form while we refresh requirements?

    if (false && $ctrl.onRefreshRequirements) {
      // Should post the current model back to the requirements end
      // point and update the requirements.
      // TODO Can we handle this internally?
      $ctrl.onRefreshRequirements();
    }
  };

  function switchTab(newType, oldType) {
    var oldRequirementType = TwRequirementsService.findRequirementByType(
      oldType, $ctrl.requirements
    );
    var newRequirementType = TwRequirementsService.findRequirementByType(
      newType, $ctrl.requirements
    );

    if (!oldRequirementType || !newRequirementType) {
      if (!$ctrl.model) {
          $ctrl.model = {};
      }
      $ctrl.model.type = newType;
    }

    TwRequirementsService.cleanRequirementsModel(
      $ctrl.model,
      oldRequirementType,
      newRequirementType
    );
  }

  init();
}

TwRequirementsFormController.$inject = ['$scope', 'TwRequirementsService'];

export default TwRequirementsFormController;
