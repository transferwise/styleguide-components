import { getValidModelParts } from '../utils/clean-model';

class Controller {
  $onChanges(changes) {
    if (changes.schema || changes.model) {
      // We keep each model separately, and combine them for broadcast, this gives
      // better control over cleaning up the model as we deal with values that are
      // removed.
      this.models = splitModel(this.model, this.schema ? this.schema.allOf : []);
    }
  }

  onModelChange(model, index) {
    const schema = this.schema.allOf[index];

    this.models[index] = getValidModelParts(model, schema);

    if (this.onChange) {
      this.onChange({ model: combineModels(this.models) });
    }
  }

  onRefreshRequirements(model, index) {
    const schema = this.schema.allOf[index];

    this.models[index] = getValidModelParts(model, schema);

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
      models.push(getValidModelParts(model, schema) || {});
    });
  }
  return models;
}

function combineModels(models) {
  return models.reduce((current, combined) => angular.extend(combined, current), {});
}

export default Controller;
