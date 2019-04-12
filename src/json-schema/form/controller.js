import { isValidSchema } from '../utils/schema-validators';

class Controller {
  onModelChange(model, schema) {
    if (this.onChange) {
      const valid = isValidSchema(model, this.schema);
      this.onChange({ model, valid, schema });
    }
  }
}

export default Controller;
