
  function TwDynamicAsyncValidator($log, $q, $http) {
    return {
      /*require: 'ngModel',*/
      link: emailValidLink,
      restrict: 'A',
      controller: DyancicAsyncValidatorController,
      contollerAs: 'ctrl',
      bindToController: {
        twDynamicAsyncValidator: '='
      }
    };

    function DyancicAsyncValidatorController() {
      var $ctrl = this;
      console.log("this.twDynamicAsyncValidator");
      console.log(ctrl.twDynamicAsyncValidator);
    }
    function emailValidLink(scope, element, attrs, ngModel) {
      var validatorSetting = attrs['tw-dynamic-async-validator'];
      //ngModel.$asyncValidators.async = dynamicAsyncValidator;
      //console.log(ngModel);
      //console.log(ngModel.twDynamicAsyncValidator);
    }
    function dynamicAsyncValidator(modelValue, viewValue) {
      var req = {
        method: 'GET',
        url: 'partials/requirements.json', // TODO!!!!!
        params: {email: null}
      };
      req.params.email = modelValue || viewValue;
      return $http(req)
        .catch(function(response) {
          $log.warn('emailValidValidator', 'response', response);
          return response;
        })
        .then(function(response) {
          if (response.data.errors) {
            return $q.reject(response.data.errors[0].message);
          }
          return true;
        });
    }
  }

  TwDynamicAsyncValidator.$inject = ['$log', '$q', '$http'];

  export default angular
    .module('tw.styleguide.validation.async', [])
    .directive('twDynamicAsyncValidator', TwDynamicAsyncValidator).name;
