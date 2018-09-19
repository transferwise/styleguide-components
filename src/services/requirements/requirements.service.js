import angular from 'angular';

function RequirementsService($http) {
  this.prepRequirements = (alternatives) => {
    alternatives.forEach((alternative) => {
      this.prepFieldGroups(alternative);
      this.prepLegacyAlternatives(alternative);
      this.prepFields(alternative.fields);
    });
  };

  /**
   * In an older format we had an extra fieldGroup level, here we flatten that out
   * So the inner arrays of fields within the different field groups are flattened
   * to a single array, which is returned.
   */
  this.prepFieldGroups = fieldGroups => fieldGroups.reduce(
    (fields, fieldGroup) => {
      // If there was a tooltip at fieldGroup level move it to first field.
      if (fieldGroup.tooltip && fieldGroup.fields.length && !fieldGroup.fields[0].helpText) {
        fieldGroup.fields[0].helpText = fieldGroup.tooltip;
      }

      if (fieldGroup.info && fieldGroup.fields.length && !fieldGroup.fields[0].helpText) {
        fieldGroup.fields[0].helpText = fieldGroup.info;
      }

      // If there are two parts of this group, render side by side
      if (fieldGroup.fields.length === 2) {
        fieldGroup.fields.forEach((field) => {
          field.width = 'md';
        });
      }
      if (fieldGroup.fields.length === 3) {
        fieldGroup.fields[0].width = 'md';
        fieldGroup.fields[1].width = 'md';
      }
      return fields.concat(fieldGroup.fields);
    },
    []
  );

  this.prepFields = (fields, model, validationMessages) => {
    if (!fields) {
      return {};
    }

    let preparedFields;
    if (fields instanceof Array) {
      preparedFields = {};
      fields.forEach((field) => {
        // If the field still has groups, we need to flatten to get the key
        if (field.group) {
          flattenGroup(field);
        }
        if (!field.key && field.name) {
          field.key = field.name;
        }
        preparedFields[field.key] = copyOf(field);
      });
    } else {
      preparedFields = copyOf(fields);
    }

    Object.keys(preparedFields).forEach((key) => {
      preparedFields[key] = this.prepField(preparedFields[key], model, validationMessages);
    });

    return preparedFields;
  };

  this.prepField = (field, model, validationMessages) => {
    const preparedField = copyOf(field);

    // also doing this above, presumably unnecessary?
    flattenGroup(preparedField);

    this.prepLegacyProps(preparedField);

    this.prepType(preparedField);
    this.prepPattern(preparedField);
    this.prepValuesAsync(preparedField, model);
    this.prepValues(preparedField);
    this.prepValidationMessages(preparedField, validationMessages);

    return preparedField;
  };


  this.prepType = (field) => {
    const type = field.type && field.type.toLowerCase && field.type.toLowerCase();

    switch (type) {
      case 'text':
        field.type = 'string';
        break;
      case 'date':
        field.type = 'string';
        field.format = 'date';
        break;
      case 'password':
        field.type = 'string';
        field.control = 'password';
        break;
      case 'checkbox':
        field.type = 'boolean';
        break;
      case 'select':
        if (!field.control) {
          field.control = 'select';
        }
        delete field.type;
        break;
      case 'radio':
        field.control = 'radio';
        delete field.type;
        break;
      case 'upload':
        field.type = 'string';
        field.format = 'base64url';
        break;
      case 'tel':
        field.type = 'string';
        field.format = 'phone';
        break;
      case 'textarea':
        field.type = 'string';
        field.control = 'textarea';
        break;
      default:
    }

    if (!field.control) {
      field.control = this.getControlType(field);
    }
  };

  this.prepLegacyAlternatives = (alternative) => {
    if (!alternative.label && alternative.title) {
      alternative.label = alternative.title;
    }
    if (!alternative.type && alternative.name) {
      alternative.type = alternative.name;
    }
    if (!alternative.description && alternative.tooltip) {
      alternative.description = alternative.tooltip;
    }
    if (alternative.fieldGroups && !alternative.fields) {
      alternative.fields = this.prepFieldGroups(alternative.fieldGroups);
      delete alternative.fieldGroups;
    }
  };

  this.prepLegacyProps = (field) => {
    delete field.key;

    if (field.name && !field.title) {
      field.title = field.name;
      delete field.name;
    }

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

    if (field.valuesAllowed && !field.values) {
      field.values = this.prepLegacyValuesAllowed(field.valuesAllowed);
      delete field.valuesAllowed;

      // In some legacy arrays the first value is actually a placeholder...
      if (field.values[0] &&
          !field.values[0].value &&
          field.values[0].label &&
          !field.placeholder) {
        field.placeholder = field.values[0].label;
        field.values = field.values.slice(1);
      }
    }
  };

  // Refactor this as also have prepValues which is very similar, map to values first, then run...
  this.prepLegacyValuesAllowed = valuesAllowed => valuesAllowed.map((valueAllowed) => {
    if (valueAllowed.title && !valueAllowed.label) {
      valueAllowed.label = valueAllowed.title;
      delete valueAllowed.title;
    }
    if (valueAllowed.code && !valueAllowed.value) {
      valueAllowed.value = valueAllowed.code;
      delete valueAllowed.code;
    }

    return valueAllowed;
  });

  this.prepPattern = (field) => {
    if (field.pattern) {
      try {
        RegExp(field.pattern);
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.warn('API regexp is invalid');
        delete field.pattern;
      }
    } else {
      delete field.pattern;
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
    $http({
      method: field.valuesAsync.method || 'GET',
      url: field.valuesAsync.url,
      data: postData || {}
    }).then((response) => {
      field.values = response.data;
      this.prepValues(field);
    });

  this.prepValues = (field) => {
    if (!angular.isArray(field.values)) {
      return;
    }
    field.values.forEach((option) => {
      option.value = option.value || option.key;
      option.label = option.label || option.name;
      delete option.key;
      delete option.name;
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

    if (!field.validationMessages) {
      delete field.validationMessages;
      return;
    }

    if (field.validationMessages.minimum) {
      field.validationMessages.min = field.validationMessages.minimum;
      delete field.validationMessages.minimum;
    }
    if (field.validationMessages.maximum) {
      field.validationMessages.max = field.validationMessages.maximum;
      delete field.validationMessages.maximum;
    }
  };

  this.getControlType = getControlType;
}


function getControlType(field) {
  if (field.control) {
    return field.control.toLowerCase();
  }
  if (field.hidden) {
    return 'hidden';
  }
  if (field.valuesAsync) {
    return 'select';
  }
  if (field.values && field.values.length) {
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
      return 'tel';
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

  const values = field.enum || field.values;
  if (values) {
    return values.length > 3 ? 'select' : 'radio';
  }
  return 'select';
}

function flattenGroup(field) {
  if (field.group && field.group[0]) {
    angular.extend(field, field.group[0]);
    delete field.group;
  }
}

function copyOf(obj) {
  // Object.assign is nicer, but lacks ie support
  return JSON.parse(JSON.stringify(obj));
}


RequirementsService.$inject = ['$http'];

export default RequirementsService;
