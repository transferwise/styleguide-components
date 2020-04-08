import template from './markdown.html';
import controller from './markdown.controller.js';

const Markdown = {
  controller,
  template,
  bindings: {
    markdown: '<',
  }
};

export default Markdown;
