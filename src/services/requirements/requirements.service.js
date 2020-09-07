function RequirementsService($http) {
  this.prepRequirements = (alternatives) => {
    if (!alternatives || !alternatives.length) {
      return [];
    }

    const preppedAlternatives = copyOf(alternatives);

    preppedAlternatives.forEach((alternative) => {
      if (alternative.prepared) {
        return;
      }

      this.prepLegacyAlternatives(alternative);

      alternative.properties = this.prepFields(alternative.properties || alternative.fields);

      // If we're still treating type as a special case, move it to a hidden value
      if (alternative.type && alternative.type !== 'object' && !alternative.types) {
        alternative.properties.type = {
          type: 'string',
          enum: [alternative.type],
          required: true,
          hidden: true
        };

        alternative.type = 'object';
      }

      alternative.prepared = true;
    });

    return preppedAlternatives;
  };

  this.prepFields = (fields, model, validationMessages) => {
    if (!fields) {
      return {};
    }

    let preparedFields = copyOf(fields);

    preparedFields = flattenFieldsWithGroups(preparedFields);
    preparedFields = transformFieldArrayToMap(preparedFields);
    preparedFields = transformNestedKeysToNestedSpecs(preparedFields);

    Object.keys(preparedFields).forEach((key) => {
      preparedFields[key] = this.prepField(preparedFields[key], model, validationMessages);
    });

    return preparedFields;
  };

  this.prepField = (field, model, validationMessages) => {
    const preparedField = copyOf(field);

    this.prepLegacyProps(preparedField);
    this.prepType(preparedField);
    this.prepPattern(preparedField);
    this.prepValuesAsync(preparedField, model);
    this.prepValidationMessages(preparedField, validationMessages);
    this.prepHelp(preparedField);
    this.prepCameraGuidelines(preparedField);

    return preparedField;
  };

  /**
   * In an older format we had an extra fieldGroup level, here we flatten that out
   * So the inner arrays of fields within the different field groups are flattened
   * to a single array, which is returned.
   */
  function flattenFieldsWithGroups(fields) {
    if (fields instanceof Array) {
      let flattenedFields = [];
      fields.forEach((field) => {
        // If we've been given a group with nested fields, break them out.
        if (field.fields) {
          flattenedFields = flattenedFields.concat(flattenFieldWithGroup(field, field.fields));
        } else if (field.group) {
          flattenedFields = flattenedFields.concat(flattenFieldWithGroup(field, field.group));
        } else {
          // Otherwise it's a regular field, just add it.
          flattenedFields.push(field);
        }
      });
      return flattenedFields;
    }
    return fields;
  }

  function flattenFieldWithGroup(field, subFields) {
    // If first field doesn't have a label, use the one from the group
    if (field.name && subFields.length && !subFields[0].name) {
      subFields[0].name = field.name;
    }

    if (field.width && subFields.length && !subFields[0].width) {
      subFields[0].width = field.width;
    }

    // If there was a tooltip at fieldGroup level move it to first field.
    if (field.tooltip && subFields.length && !subFields[0].helpText) {
      subFields[0].helpText = field.tooltip;
    }

    if (field.info && subFields.length && !subFields[0].helpText) {
      subFields[0].helpText = field.info;
    }

    // If there are two parts of this group, render them side by side
    if (subFields.length === 2) {
      subFields.forEach((nestedField) => {
        nestedField.width = 'md';
      });
    }

    // If there are three parts, render the first two side by side
    if (subFields.length === 3) {
      subFields[0].width = 'md';
      subFields[1].width = 'md';
    }

    return subFields;
  }

  /*
   * Some older requirements return an array of fields, where it should be a map
   * from the property name to the spec.  This converts arrays to maps.
   */
  function transformFieldArrayToMap(fields) {
    if (fields instanceof Array) {
      const fieldMap = {};
      fields.forEach((field) => {
        const key = field.key || field.name;
        delete field.key;

        fieldMap[key] = copyOf(field);
      });
      return fieldMap;
    }
    return fields;
  }

  /*
   * Some older format return keys like 'address.city', expecting the value of
   * city to be nested inside an address object.  This function creates a spec of
   * type 'object', and nests such fields inside of it.  When we render we pass
   * this object spec to a nested fieldset.
   */
  function transformNestedKeysToNestedSpecs(fieldMap) {
    if (fieldMap instanceof Array) {
      throw new Error('Expecting a map of fields, not an array');
    }

    const nestedFields = {};
    Object.keys(fieldMap).forEach((key) => {
      if (key.indexOf('.') > 0) {
        // If the key contains a period we need to nest the fields in another object
        const pathSections = key.split('.');
        const nestedKey = pathSections[0];

        // If this sub object doesn't exist yet, create it
        if (!nestedFields[nestedKey]) {
          nestedFields[nestedKey] = {
            type: 'object',
            properties: {}
          };
        }
        nestedFields[nestedKey].properties[pathSections[1]] = fieldMap[key];
      } else {
        nestedFields[key] = fieldMap[key];
      }
    });
    return nestedFields;
  }

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
        if (field.selectType === 'CHECKBOX') {
          field.type = 'array';
        } else {
          if (!field.control) {
            field.control = 'select';
          }
          delete field.type;
        }

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
      case 'array':
        field.control = this.getControlForArray(field);
        break;
      case 'hidden':
        field.type = 'string';
        field.hidden = true;
        break;
      default:
    }

    if (!field.control && field.type !== 'object') {
      field.control = this.getControlType(field);
    }
  };

  this.getControlForArray = (field) => {
    if (field.items.enum) {
      return 'checkbox-group';
    }
    if (field.items.format === 'base64url') {
      return 'multi-upload';
    }
    return null;
  };

  this.prepLegacyAlternatives = (alternative) => {
    if (!alternative.title && alternative.label) {
      alternative.title = alternative.label;
    }
    if (!alternative.title) {
      alternative.title = getNameFromType(alternative.type);
    }
    if (!alternative.type && alternative.name) {
      alternative.type = alternative.name;
    }
    if (!alternative.description && alternative.tooltip) {
      alternative.description = alternative.tooltip;
    }
    if (alternative.fieldGroups && !alternative.fields) {
      alternative.fields = flattenFieldsWithGroups(alternative.fieldGroups);
      delete alternative.fieldGroups;
    }
  };

  this.prepLegacyProps = (field) => {
    if (field.name && !field.title) {
      field.title = field.name;
      delete field.name;
    }

    if (field.validationRegexp) {
      field.pattern = field.validationRegexp;
      delete field.validationRegexp;
    }

    if (field.min && !field.minimum) {
      field.minimum = field.min;
      delete field.min;
    }

    if (field.max && !field.maximum) {
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

    if (field.valuesAllowed && !field.values && field.selectType !== 'CHECKBOX') {
      field.values = field.valuesAllowed;
      delete field.valuesAllowed;
    }

    if (field.valuesAllowed && !field.items && field.selectType === 'CHECKBOX') {
      field.items = {
        values: field.valuesAllowed
      };
      delete field.valuesAllowed;
    }

    if (field.values && field.values.map) {
      field.values = this.prepLegacyValues(field.values);

      const convertValueToConst = value => ({ const: value.value, title: value.label });

      field.oneOf = field.values.map(convertValueToConst);
    }

    if (field.value && !field.default) {
      field.default = field.value;
      delete field.value;
    }

    if (field.values) {
      // In some legacy arrays the first value is a placeholder, extract it.
      if (
        field.values
        && field.values.length
        && field.values[0]
        && !field.values[0].value
        && field.values[0].label
        && !field.placeholder
      ) {
        field.placeholder = field.values[0].label;
        field.values = field.values.slice(1);
      }
    }

    if (field.helpOptions && !field.help) {
      field.help = field.helpOptions;
      delete field.helpOptions;
    }
  };

  this.prepLegacyValues = values => values.map(prepLegacyValue);

  function prepLegacyValue(value) {
    if (!value.label && value.title) {
      value.label = value.title;
      delete value.title;
    }
    if (!value.label && value.name) {
      value.label = value.name;
      delete value.name;
    }

    if (!value.value && value.code) {
      value.value = value.code;
      delete value.code;
    }
    if (!value.value && value.key) {
      value.value = value.key;
      delete value.key;
    }

    return value;
  }

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
    if (field.valuesAsync.params && field.valuesAsync.params.length) {
      postData = this.getParamValuesFromModel(model, field.valuesAsync.params);
    }

    // Retry once on failure
    this.fetchValuesAsync(field, postData).catch(() => this.fetchValuesAsync(field, postData));
  };

  this.fetchValuesAsync = (field, postData) => $http({
    method: field.valuesAsync.method || 'GET',
    url: field.valuesAsync.url,
    data: postData || {}
  }).then((response) => {
    field.values = this.prepLegacyValues(response.data);
  });

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

  this.prepValidationMessages = (field) => {
    if (field.validationMessages && field.validationMessages.min) {
      field.validationMessages.minimum = field.validationMessages.min;
      delete field.validationMessages.min;
    }
    if (field.validationMessages && field.validationMessages.max) {
      field.validationMessages.maximum = field.validationMessages.max;
      delete field.validationMessages.max;
    }
    if (field.validationMessages && field.validationMessages.minlength) {
      field.validationMessages.minLength = field.validationMessages.minlength;
      delete field.validationMessages.minlength;
    }
    if (field.validationMessages && field.validationMessages.maxlength) {
      field.validationMessages.maxLength = field.validationMessages.maxlength;
      delete field.validationMessages.maxlength;
    }
  };

  this.prepHelp = (field) => {
    if (
      !field.help
      && (field.helpText || field.helpImage || field.helpList || field.uploadPlaceholderImage)
    ) {
      field.help = {};
    }
    if (field.helpText) {
      field.help.message = field.helpText;
      delete field.helpText;
    }
    if (field.helpImage) {
      field.help.image = field.helpImage;
      delete field.helpImage;
    }
    // helpImage does not have same lineage placeholder image
    // 2 fields can overwrite each other safely (only one will be present at a time)
    if (field.uploadPlaceholderImage) {
      field.help.image = field.uploadPlaceholderImage;
      delete field.uploadPlaceholderImage;
    }
    if (field.list) {
      field.help.list = field.helpList;
      delete field.helpList;
    }
  };

  // In an older format we expected a camera outline guide under the 'camera.overlay' prop.
  // But in the final camera guidelines spec, 'camera.overlay' is meant for the solid mask,
  // not the outline.
  // Remove when legacy producers have been upgraded (Japan eKYC live uploads).
  this.prepCameraGuidelines = (field) => {
    if (field.camera && field.camera.overlay && !field.camera.outline) {
      field.camera.outline = field.camera.overlay;
      delete field.camera.overlay;
    }
  };

  this.getRequiredFields = getRequiredFields;
  this.getControlType = getControlType;
}

/**
 * Older style format had required as a property of fields, in JSON schema it
 * should be a separate array of property names
 */
function getRequiredFields(fields) {
  if (Array.isArray(fields)) {
    throw new Error('Expected field map');
  }
  // Return array of keys that have required set
  return Object.keys(fields).filter(property => fields[property].required);
}

function getControlType(field) {
  if (field.control) {
    if (field.control === 'select' && field.selectType === 'CHECKBOX') {
      return 'checkbox-group';
    }

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
  }

  if (field.type === 'select') {
    return 'select';
  }

  if (field.type === 'radio') {
    return 'radio';
  }

  const values = field.enum || field.values;
  if (values) {
    return values.length > 3 ? 'select' : 'radio';
  }
  return 'select';
}

function copyOf(obj) {
  // Object.assign is nicer, but lacks ie support
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Some older requirments formats do not include a label for alternatives
 */
function getNameFromType(tabType) {
  if (tabType && tabType.length > 0) {
    const tabNameWithSpaces = tabType
      .toLowerCase()
      .split('_')
      .join(' '); // String.replace method only replaces first instance
    return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
  }
  return '';
}

RequirementsService.$inject = ['$http'];

export default RequirementsService;
