import { getValidModelParts } from '../utils/valid-model';

class Controller {
  $onChanges(changes) {
    if (changes.schema || changes.model) {
      // We keep each model separately, and combine them for broadcast, this gives
      // better control over cleaning up the model as we deal with values that are
      // removed.
      this.models = splitModel(this.model, this.schema ? this.schema.allOf : []);
    }
  }

  onModelChange(index, model, schema) {
    const schemaForIndex = this.schema.allOf[index];

    this.models[index] = getValidModelParts(model, schemaForIndex);

    if (this.onChange) {
      this.onChange({ model: combineModels(this.models), schema });
    }
  }
}

function splitModel(model, schemas) {
  // If we receive a model, break it down to parts valid for each schema
  const models = [];
  if (model && schemas) {
    schemas.forEach((schema) => {
      models.push(getValidModelParts(model, schema) || {});
    });
  }
  return models;
}

function combineModels(models) {
  return models.reduce((current, combined) => angular.extend(combined, current), {});
}

export default Controller;
