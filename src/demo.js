import Forms from './forms/demo.js';
import Formatting from './formatting/demo.js';
import Validation from './validation/demo.js';
import Loading from './loading/demo.js';
import Layout from './layout/demo.js';
import Help from './help/demo.js';
import JsonSchema from './json-schema/demo.js';

const module = angular.module('tw.styleguide.demo', [
  Forms,
  Formatting,
  Validation,
  Loading,
  Layout,
  Help,
  JsonSchema
]);

class PageController {
  constructor() {
    this.model = {
      components: {}
    };

    this.locales = [
      { value: 'en-GB', label: 'English UK' },
      { value: 'en-US', label: 'English US' },
      { value: 'fr-FR', label: 'French' },
      { value: 'es-ES', label: 'Spanish' },
      { value: 'es-US', label: 'Spanish US' },
      { value: 'pt-BR', label: 'Brazillian Portuguese' },
      { value: 'ja-JP', label: 'Japanese' },
      { value: 'ar-EG', label: 'Eastern Arabic' },
      { value: 'en-IN', label: 'English Indian' },
      { value: 'xx-XX', label: 'Unknown locale' }
    ];
  }
  // eslint-disable-next-line
  log(message) {
    console.log(message); // eslint-disable-line
  }
}

module
  .config([
    '$compileProvider',
    ($compileProvider) => {
      $compileProvider.debugInfoEnabled(false);
    }
  ])
  .controller('PageController', PageController)
  .component('docsNavigation', {
    template: `
    <h5>Help</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#pop-over">Pop over</a></li>
      <li><a href="index.html#tool-tip">Tool tip</a></li>
    </ul>

    <h5>Forms</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#amount-currency-select">Amount currency select</a></li>
      <li><a href="index.html#checkbox">Checkbox</a></li>
      <li><a href="index.html#currency-input">Currency input</a></li>
      <li><a href="index.html#date">Date</a></li>
      <li><a href="index.html#date-lookup">Date lookup</a></li>
      <li><a href="index.html#drag-and-drop">Drag and drop</a></li>
      <li><a href="index.html#focusable">Focusable</a></li>
      <li><a href="index.html#form-control">Form control</a></li>
      <li><a href="index.html#radio">Radio</a></li>
      <li><a href="index.html#select">Select</a></li>
      <li><a href="index.html#submit">Submit</a></li>
      <li><a href="index.html#telephone">Telephone</a></li>
      <li><a href="index.html#upload">Upload</a></li>
      <li><a href="index.html#multi-upload-demo">Multi-upload</a></li>
      <li><a href="index.html#validation">Validation</a></li>
    </ul>

    <h5>Dynamic Forms</h5>
    <ul class="list-unstyled">
      <li><a href="requirements.html#field">Field</a></li>
      <li><a href="requirements.html#fieldset">Fieldset</a></li>
      <li><a href="index.html#requirements-form">Form</a></li>
      <li><a href="requirements.html#definition-list">Definition list</a></li>
      <li><a href="json-schema.html">JSON schema forms</a></li>
    </ul>

    <h5>Formatting</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#currency-format">Currency format</a></li>
      <li><a href="index.html#date-format">Date format</a></li>
      <li><a href="index.html#number-format">Number format</a></li>
      <li><a href="index.html#text-format">Text format</a></li>
      <li><a href="index.html#markdown">Markdown</a></li>
    </ul>

    <h5>Layout</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#cards">Cards</a></li>
    </ul>

    <h5>Loading</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#process">Process</a></li>
      <li><a href="index.html#loader">Loader</a></li>
    </ul>`
  })
  .directive('docsErrorMessages', () => ({
    replace: true,
    template: `
    <div class='alert alert-danger'>
      <div class='error-required'>Required</div>
      <div class='error-minlength'>Too short</div>
      <div class='error-maxlength'>Too long</div>
      <div class='error-pattern'>Invalid characters</div>
      <div class='error-async'>Invalid async</div>
    </div>`
  }))
  .directive('docsStatusMessages', () => ({
    replace: true,
    template: `
    <div class='status-messages'>
      <div class='touched'>Touched</div>
      <div class='untouched'>Untouched</div>
      <div class='pristine'>Pristine</div>
      <div class='dirty'>Dirty</div>
    </div>`
  }));

export default module.name;
