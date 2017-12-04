import angular from 'angular';

function RequirementsService() {
  this.prepRequirements = (alternatives) => {
    alternatives.forEach((alternative) => {
      this.prepFields(alternative.fields);
    });
  };

  this.prepFields = (fields, model, validationMessages) => {
    if (!fields) {
      return [];
    }
    const isArrayForm = Array.isArray(fields);
    // const preparedFields = {};
    const preparedFields = [];
    if (isArrayForm) {
      fields.forEach((field) => {
        preparedFields.push(this.prepField(field, model, validationMessages));
        // preparedFields[field.key] = this.prepField(field, model, validationMessages);
      });
    } else {
      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        field.key = key;
        preparedFields.push(this.prepField(field, model, validationMessages));
        // preparedFields[key] = this.prepField(field, model, validationMessages);
      });
    }
    return preparedFields;
  };

  this.prepField = (field, model, validationMessages) => {
    const preparedField = Object.assign({}, field);

    if (preparedField.group) {
      preparedField.group.forEach((fieldSection) => {
        if (fieldSection.refreshRequirementsOnChange) {
          preparedField.refreshRequirementsOnChange = true;
        }

        this.prepType(fieldSection);
        this.prepRegExp(fieldSection);
        this.prepValuesAsync(fieldSection, model);
        this.prepValuesAllowed(fieldSection);
        this.prepValidationMessages(fieldSection, validationMessages);
      });

      if (preparedField.group.length) {
        field.key = field.key || field.group[0].key;
        field.type = field.type || field.group[0].type;
      }
    } else {
      this.prepType(preparedField);
      this.prepRegExp(preparedField);
      this.prepValuesAsync(preparedField, model);
      this.prepValuesAllowed(preparedField);
      this.prepValidationMessages(preparedField, validationMessages);
    }
    return preparedField;
  };

  this.prepType = (field) => {
    switch (field.type) {
      case 'date':
        field.type = 'string';
        field.format = 'date';
        break;
      case 'password':
        field.type = 'string';
        field.format = 'password';
        break;
      case 'checkbox':
        field.type = 'boolean';
        break;
      case 'select':
      case 'radio':
        break;
      default:
    }
  };

  this.prepRegExp = (field) => {
    if (field.validationRegexp) {
      try {
        field.validationRegexp = new RegExp(field.validationRegexp);
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.warn('API regexp is invalid');
        field.validationRegexp = false;
      }
    } else {
      field.validationRegexp = false;
    }
  };

  this.prepValuesAsync = (field, model) => {
    if (!field.valuesAsync) {
      return;
    }
    let postData = {};
    if (field.valuesAsync.params &&
      field.valuesAsync.params.length) {
      postData = this.getParamValuesFromModel(model, field.valuesAsync.params);
    }

    this.fetchValuesAsync(field, postData).catch(() =>
      // Retry once on failure
      this.fetchValuesAsync(field, postData));
  };

  this.fetchValuesAsync = (field, postData) =>
    this.$http.post(field.valuesAsync.url, postData)
      .then((response) => {
        field.valuesAllowed = response.data;
        this.prepValuesAllowed(field);
      });

  this.prepValuesAllowed = (field) => {
    if (!angular.isArray(field.valuesAllowed)) {
      return;
    }
    field.valuesAllowed.forEach((valueAllowed) => {
      valueAllowed.value = valueAllowed.value || valueAllowed.key;
      valueAllowed.label = valueAllowed.label || valueAllowed.name;
    });
  };

  this.getParamValuesFromModel = (model, params) => {
    const data = {};
    params.forEach((param) => {
      if (model[param.key]) {
        data[param.parameterName] = model[param.key];
      } else if (param.required) {
        // TODO Problem, parameter is required, but data is missing.
      }
    });
    return data;
  };

  this.prepValidationMessages = (field, validationMessages) => {
    field.validationMessages = field.validationMessages ?
      field.validationMessages :
      validationMessages;
  };
}

export default RequirementsService;
