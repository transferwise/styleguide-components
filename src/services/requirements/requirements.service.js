import angular from 'angular';

function RequirementsService() {
  this.prepRequirements = (types) => {
    types.forEach((type) => {
      this.prepFields(type.fields);
    });
  };

  this.prepFields = (fields, model, validationMessages) => {
    if (!fields) {
      return;
    }
    fields.forEach((field) => {
      if (field.group) {
        if (field.group.length) {
          field.key = field.group[0].key;
        }
        field.group.forEach((fieldSection) => {
          if (fieldSection.type === 'upload') {
            field.type = 'upload';
          }
          if (fieldSection.refreshRequirementsOnChange) {
            field.refreshRequirementsOnChange = true;
          }
          this.prepRegExp(fieldSection);
          this.prepValuesAsync(fieldSection, model);
          this.prepValuesAllowed(fieldSection);
          this.prepValidationMessages(fieldSection, validationMessages);
        });
      } else {
        this.prepRegExp(field);
        this.prepValuesAsync(field, model);
        this.prepValuesAllowed(field);
        this.prepValidationMessages(field, validationMessages);
      }
    });
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
