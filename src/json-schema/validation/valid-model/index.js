
function getValidModelParts(model, schema) {
  if (schema.allOf) {
    return cleanModelWithAllOfSchema(model, schema);
  }

  if (schema.oneOf) {
    return cleanModelWithOneOfSchema(model, schema);
  }

  if (schema.type) {
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
        return null;
    }
  }

  if (schema.enum && schema.enum.indexOf(model) >= 0) {
    return model;
  }
  // Unrecognised schema
  return null;
}

function cleanModelWithObjectSchema(model, schema) {
  const cleanedModel = {};
  Object.keys(schema.properties).forEach((property) => {
    // If the property exists in the model, clean it, and add it
    if (model && typeof model[property] !== 'undefined') {
      const newValue = getValidModelParts(model[property], schema.properties[property]);
      if (newValue !== null) {
        cleanedModel[property] = newValue;
      }
    }
  });
  return cleanedModel;
}

function cleanModelWithArraySchema(model, schema) {
  if (Array.isArray(model)) {
    return model.map(childModel => getValidModelParts(childModel, schema));
  }
  return null;
}

function cleanModelWithStringSchema(model) {
  if (typeof model === 'string') {
    return model;
  }
  return null;
}

function cleanModelWithNumberSchema(model) {
  if (typeof model === 'number') {
    return model;
  }
  return null;
}

function cleanModelWithBooleanSchema(model) {
  if (typeof model === 'boolean') {
    return model;
  }
  return null;
}

function cleanModelWithAllOfSchema(model, schema) {
  const cleanedModel = {};
  let validSubsetOfModel;

  schema.allOf.forEach((nestedSchema) => {
    validSubsetOfModel = getValidModelParts(model, nestedSchema);

    if (typeof validSubsetOfModel === 'object') {
      angular.extend(cleanedModel, validSubsetOfModel);
    }
  });
  return cleanedModel;
}

function cleanModelWithOneOfSchema(model, schema) { // eslint-disable-line
  return model;
}

export { getValidModelParts }; // eslint-disable-line
