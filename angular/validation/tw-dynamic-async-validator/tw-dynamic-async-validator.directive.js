(function() {
    'use strict';

    angular
        .module('tw.form-validation')
        .directive('twDynamicAsyncValidator', TwDynamicAsyncValidator);

    TwDynamicAsyncValidator.$inject = ['$log', '$q', '$http'];

    function TwDynamicAsyncValidator($log, $q, $http) {
        return {
            require: 'ngModel',
            link: emailValidLink,
            restrict: "A"
        };
        function emailValidLink(scope, element, attrs, ngModel) {
            var validatorSetting = attrs['tw-dynamic-async-validator'];
            ngModel.$asyncValidators.async = dynamicAsyncValidator;
        }
        function dynamicAsyncValidator(modelValue, viewValue) {
            var req = {
                url: "/api/v1/account/checkEmail",
                params: {email: null}
            };
            req.params.email = modelValue || viewValue;
            return $http.get(req)
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
})();
