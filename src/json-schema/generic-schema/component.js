import controller from './controller';
import template from './template.html';

const Component = {
  controller,
  template,
  bindings: {
    schema: '<',
    model: '<',
    errors: '<',
    locale: '<',
    translations: '<',
    required: '<',
    submitted: '<',
    hideTitle: '<',
    onChange: '&'
  }
};

export default Component;
