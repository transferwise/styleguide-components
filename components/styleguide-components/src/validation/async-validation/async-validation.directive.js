
class AsyncValidatorController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    // console.log("this.twDynamicAsyncValidator");
    // console.log(ctrl.twDynamicAsyncValidator);
  }
}

function AsyncValidation($log, $q, $http) {
  return {
    /* require: 'ngModel', */
    link: AsyncValidationLink,
    restrict: 'A',
    controller: AsyncValidatorController,
    contollerAs: 'ctrl',
    bindToController: {
      twDynamicAsyncValidator: '='
    }
  };

  // eslint-disable-next-line no-unused-vars
  function AsyncValidationLink(scope, element, attrs, ngModel) {
    // eslint-disable-next-line no-unused-vars
    const validatorSetting = attrs['tw-dynamic-async-validator'];
    // ngModel.$asyncValidators.async = dynamicAsyncValidator;
    // console.log(ngModel);
    // console.log(ngModel.twDynamicAsyncValidator);
  }

  // eslint-disable-next-line no-unused-vars
  function dynamicAsyncValidator(modelValue, viewValue) {
    const req = {
      method: 'GET',
      url: 'partials/requirements.json', // TODO!!!!!
      params: {
        email: null
      }
    };
    req.params.email = modelValue || viewValue;
    return $http(req)
      .catch((response) => {
        $log.warn('emailValidValidator', 'response', response);
        return response;
      })
      .then((response) => {
        if (response.data.errors) {
          return $q.reject(response.data.errors[0].message);
        }
        return true;
      });
  }
}

AsyncValidation.$inject = ['$log', '$q', '$http'];

export default AsyncValidation;
