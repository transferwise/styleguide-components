import { isValidSchema } from '../validation/schema-validators';

class Controller {
  onModelChange(model, schema) {
    if (this.onChange) {
      const isValid = isValidSchema(model, this.schema);
      this.onChange({ model, isValid, schema });
    }
  }
}

export default Controller;
