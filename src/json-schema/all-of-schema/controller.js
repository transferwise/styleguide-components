import { cleanModel } from '../utils/clean-model';

class Controller {
  $onChanges(changes) {
    if (changes.schema || changes.model) {
      // We keep each model separately, and combine them for broadcast, this gives
      // better control over cleaning up the model as we deal with values that are
      // removed
      this.models = [];
      if (this.schema && this.schema.allOf) {
        this.models = splitModel(this.model, this.schema.allOf);
      }
    }
  }

  onModelChange(model, index) {
    const schemaForIndex = this.schema.allOf[index];

    this.models[index] = cleanModel(model, schemaForIndex);

    if (this.onChange) {
      this.onChange({ model: combineModels(this.models) });
    }
  }

  onRefreshRequirements(model, index) {
    // TODO tidy
    const schemaForIndex = this.schema.allOf[index];

    this.models[index] = cleanModel(model, schemaForIndex);

    if (this.onRefresh) {
      this.onRefresh({ model: combineModels(this.models) });
    }
  }
}

function splitModel(model, schemas) {
  // If we receive a model, break it down to parts valid for each schema
  const models = [];
  if (model && schemas) {
    schemas.forEach((schema) => {
      models.push(cleanModel(model, schema) || {});
    });
  }
  return models;
}

function combineModels(models) {
  return models.reduce((current, combined) => angular.extend(combined, current), {});
}

export default Controller;
