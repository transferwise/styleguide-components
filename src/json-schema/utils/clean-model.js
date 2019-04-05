
function cleanModel(model, schema) {
  if (schema.allOf) {
    return cleanModelWithAllOfSchema(model, schema);
  } else if (schema.oneOf) {
    return cleanModelWithOneOfSchema(model, schema);
  } else if (schema.type) {
    switch (schema.type) {
      case 'object':
        return cleanModelWithObjectSchema(model, schema);
      case 'array':
        return cleanModelWithArraySchema(model, schema);
      case 'string':
        return cleanModelWithStringSchema(model);
      case 'number':
      case 'integer':
        return cleanModelWithNumberSchema(model);
      case 'boolean':
        return cleanModelWithBooleanSchema(model);
      default:
        return; // eslint-disable-line
    }
  } else if (schema.enum) {
    if (schema.enum.indexOf(model) >= 0) {
      return model;
    }
  }
  // Unrecognised schema
  return; // eslint-disable-line
}

function cleanModelWithObjectSchema(model, schema) {
  const cleanedModel = {};
  Object.keys(schema.properties).forEach((property) => {
    // If the property exists in the model, clean it, and add it
    if (typeof model[property] !== 'undefined') {
      const newValue = cleanModel(model[property], schema.properties[property]);
      if (typeof newValue !== 'undefined') {
        cleanedModel[property] = newValue;
      }
    }
  });
  return cleanedModel;
}

function cleanModelWithArraySchema(model, schema) {
  if (Array.isArray(model)) {
    // TODO not adequate
    return model.map(childModel => cleanModel(childModel, schema));
  }
  return; // eslint-disable-line
}

function cleanModelWithStringSchema(model) {
  if (typeof model === 'string') {
    return model;
  }
  return; // eslint-disable-line
}

function cleanModelWithNumberSchema(model) {
  if (typeof model === 'number') {
    return model;
  }
  return; // eslint-disable-line
}

function cleanModelWithBooleanSchema(model) {
  if (typeof model === 'boolean') {
    return model;
  }
  return; // eslint-disable-line
}

function cleanModelWithAllOfSchema(model, schema) {  // eslint-disable-line
  const cleanedModel = {};
  let validSubsetOfModel;

  schema.allOf.forEach((nestedSchema) => {
    validSubsetOfModel = cleanModel(model, nestedSchema);

    if (typeof validSubsetOfModel === 'object') {
      angular.extend(cleanedModel, validSubsetOfModel);
    }
  });
  return cleanedModel;
}

function cleanModelWithOneOfSchema(model, schema) { // eslint-disable-line
  return model;
}

export { cleanModel }; // eslint-disable-line
