import { getValidModelParts } from '../validation/valid-model';
import { isValidSchema } from '../validation/schema-validators';

class Controller {
  constructor() {
    this.options = [];
    this.activeIndex = 1;
  }

  $onChanges(changes) {
    if (changes.schema) {
      this.activeIndex = getActiveSchemaIndex(this.schema, this.model);
    }
    if (changes.model) {
      this.prefillModels();
    }
  }

  prefillModels() {
    if (!this.schema || !this.schema.oneOf) {
      return;
    }
    this.models = getModelPartsForSchemas(this.model, this.schema.oneOf);
  }

  onSchemaChange(newSchema, index) {
    this.models[index] = getValidModelParts(this.models[index], newSchema);
    this.onModelChange(this.models[index], newSchema);
  }

  onModelChange(model, schema, index) {
    this.models[index] = model;
    if (this.onChange) {
      this.onChange({ model, schema });
    }
  }
}

/**
 * Determine which schema to show intitially based on validity of model
 * Default to 1 (active is 1-indexed)
 */
function getActiveSchemaIndex(schema, model) {
  if (!schema || !schema.oneOf) {
    return 1;
  }

  for (let i = 0; i < schema.oneOf.length; i++) {
    if (isValidSchema(model, schema.oneOf[i])) {
      return i + 1;
    }
  }

  return 1;
}

function getModelPartsForSchemas(model, schemas) {
  return schemas.map(schema => getValidModelParts(model, schema));
}

export default Controller;
