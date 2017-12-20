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

    return fields.map(field => this.prepField(field, model, validationMessages));
  };

  this.prepField = (field, model, validationMessages) => {
    // Copy object, Object.assign is nicer, but lacks ie support
    const preparedField = JSON.parse(JSON.stringify(field));

    if (preparedField.group && preparedField.group[0]) {
      angular.extend(preparedField, preparedField.group[0]);
      delete preparedField.group;
    }

    this.prepLegacyProps(preparedField);

    this.prepType(preparedField);
    this.prepPattern(preparedField);
    this.prepValuesAsync(preparedField, model);
    this.prepValuesAllowed(preparedField);
    this.prepValidationMessages(preparedField, validationMessages);

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
        field.control = 'select';
        break;
      case 'radio':
        field.control = 'radio';
        break;
      case 'upload':
        field.type = 'string';
        field.format = 'base64url';
        break;
      default:
    }

    if (!field.control) {
      field.control = getControlType(field);
    }
  };

  this.prepLegacyProps = (field) => {
    if (field.validationRegexp) {
      field.pattern = field.validationRegexp;
      delete field.validationRegexp;
    }

    if (field.min) {
      field.minimum = field.min;
      delete field.min;
    }

    if (field.max) {
      field.maximum = field.max;
      delete field.max;
    }

    if (field.example && !field.placeholder) {
      field.placeholder = field.example;
      delete field.example;
    }

    if (field.tooltip && !field.helpText) {
      field.helpText = field.tooltip;
      delete field.tooltip;
    }
  };

  this.prepPattern = (field) => {
    if (field.pattern) {
      try {
        RegExp(field.pattern);
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.warn('API regexp is invalid');
        field.pattern = false;
      }
    } else {
      field.pattern = false;
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

function getControlType(field) {
  if (field.control) {
    return field.control;
  }
  if (field.hidden) {
    return 'hidden';
  }
  if (field.enum || field.values || field.valuesAllowed) {
    return getSelectionType(field);
  }

  switch (field.type) {
    case 'string':
      return getControlForStringFormat(field.format);
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'checkbox';
    default:
      return 'text';
  }
}

function getControlForStringFormat(format) {
  switch (format) {
    case 'date':
      return 'date';
    case 'base64url':
      return 'file';
    case 'password':
      return 'password';
    case 'uri':
      return 'text'; // 'url'; - not implemented
    case 'email':
      return 'text'; // 'email'; - not implemented
    case 'phone':
      return 'text'; // 'tel'; - not implemented
    default:
      return 'text';
  }
}

function getSelectionType(field) {
  if (field.control) {
    return field.control;
  } else if (field.type === 'select') {
    return 'select';
  } else if (field.type === 'radio') {
    return 'radio';
  }

  const values = field.enum || field.values || field.valuesAllowed;
  if (values) {
    return values.length > 3 ? 'select' : 'radio';
  }
  return 'select';
}

export default RequirementsService;
