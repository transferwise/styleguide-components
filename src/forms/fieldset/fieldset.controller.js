import angular from 'angular';

class FieldsetController {
  constructor($scope, $http) {
    this.$http = $http;

    if (!this.model) {
      this.model = {};
    }

    if (!this.validationMessages) {
      this.validationMessages = {
        required: 'Required',
        pattern: 'Incorrect format',
        min: 'The value is too low',
        max: 'The value is too high',
        minlength: 'The value is too short',
        maxlength: 'The value is too long'
      };
    }

    if (this.fields) {
      prepFields(this.fields, this.model, this.validationMessages);
    }

    $scope.$watch('$ctrl.fields', (newValue, oldValue) => {
      if (!angular.equals(newValue, oldValue)) {
        prepFields(this.fields, this.model, this.validationMessages);
      }
    });

    $scope.$watch('twFieldset.$valid', (validity) => {
      this.isValid = validity;
    });

    // TODO can we add asyncvalidator here? - prob not
  }

  onBlur(field) {
    this.removeFieldError(field.key);

    if (!field.refreshRequirementsOnChange) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    // TODO disabled the form while we refresh requirements?
    /*
    if (this.onRefreshRequirements) {
      // Should post the current model back to the requirements end
      // point and update the requirements.
      // TODO Can we handle this internally?
      this.onRefreshRequirements();
    }
    */
  }

  onChange(field) {
    this.removeFieldError(field.key);
  }

  removeFieldError(fieldKey) {
    if (this.errorMessages) {
      delete this.errorMessages[fieldKey];
    }
  }
}

function prepFields(fields, model, validationMessages) {
  fields.forEach((fieldGroup) => {
    if (fieldGroup.group.length) {
      fieldGroup.key = fieldGroup.group[0].key;
    }
    fieldGroup.group.forEach((field) => {
      if (field.type === 'upload') {
        fieldGroup.type = 'upload';
      }
      prepRegExp(field);
      prepValuesAsync(field, model);
      prepValuesAllowed(field);
      prepValidationMessages(field, validationMessages);
    });
  });
}

function prepRegExp(field) {
  if (field.validationRegexp) {
    try {
      field.validationRegexp = new RegExp(field.validationRegexp);
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log('API regexp is invalid');
      field.validationRegexp = false;
    }
  } else {
    field.validationRegexp = false;
  }
}

function prepValuesAsync(field, model) {
  if (!field.valuesAsync) {
    return;
  }
  let postData = {};
  if (field.valuesAsync.params &&
    field.valuesAsync.params.length) {
    postData = getParamValuesFromModel(model, field.valuesAsync.params);
  }

  this.$http.post(field.valuesAsync.url, postData).then((response) => {
    field.valuesAllowed = response.data;
    prepValuesAllowed(field);
  }).catch(() => {
    // TODO - RETRY?
  });
}

function prepValuesAllowed(field) {
  if (!angular.isArray(field.valuesAllowed)) {
    return;
  }
  field.valuesAllowed.forEach((valueAllowed) => {
    valueAllowed.value = valueAllowed.key;
    valueAllowed.label = valueAllowed.name;
  });
}

function getParamValuesFromModel(model, params) {
  const data = {};
  params.forEach((param) => {
    if (model[param.key]) {
      data[param.parameterName] = model[param.key];
    } else if (param.required) {
      // TODO Problem, parameter is required, but data is missing.
    }
  });
  return data;
}

function prepValidationMessages(field, validationMessages) {
  field.validationMessages = field.validationMessages ?
    field.validationMessages :
    validationMessages;
}

FieldsetController.$inject = ['$scope', '$http'];

export default FieldsetController;
