import Forms from './forms/demo.js';
import Formatting from './formatting/demo.js';
import Validation from './validation/demo.js';
import Loading from './loading/demo.js';
import Layout from './layout/demo.js';
import Help from './help/demo.js';

const module = angular.module('tw.styleguide.demo', [
  Forms,
  Formatting,
  Validation,
  Loading,
  Layout,
  Help
]);

module.config(['$compileProvider', ($compileProvider) => {
  $compileProvider.debugInfoEnabled(false);
}])
  .controller('PageController', () => {
    this.log = (message) => {
      console.log(message); // eslint-disable-line
    };

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
  })
  .component('docsNavigation', {
    template: `
    <h4>Jump to:</h4>

    <h5>Form Styling &amp; Validation:</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#focusable">Focusable</a></li>
      <li><a href="index.html#pop-over">Pop over</a></li>
      <li><a href="index.html#tool-tip">Tool tip</a></li>
      <li><a href="index.html#validation">Validation</a></li>
    </ul>

    <h5>Form components:</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#amount-currency-select">Amount currency select</a></li>
      <li><a href="index.html#checkbox">Checkbox</a></li>
      <li><a href="index.html#currency-input">Currency input</a></li>
      <li><a href="index.html#date">Date</a></li>
      <li><a href="index.html#date-lookup">Date lookup</a></li>
      <li><a href="index.html#form-control">Form control</a></li>
      <li><a href="index.html#radio">Radio</a></li>
      <li><a href="index.html#select">Select</a></li>
      <li><a href="index.html#telephone">Telephone</a></li>
      <li><a href="index.html#upload">Upload</a></li>
    </ul>

    <h5>Requirements:</h5>
    <ul class="list-unstyled">
      <li><a href="requirements.html#field">Field</a></li>
      <li><a href="requirements.html#fieldset">Fieldset</a></li>
      <li><a href="index.html#requirements-form">Form</a></li>
      <li><a href="requirements.html#definition-list">Definition list</a></li>
    </ul>

    <h5>Formatting:</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#currency-format">Currency format</a></li>
      <li><a href="index.html#date-format">Date format</a></li>
      <li><a href="index.html#number-format">Number format</a></li>
      <li><a href="index.html#text-format">Text format</a></li>
    </ul>

    <h5>Layout components:</h5>
    <ul class="list-unstyled">
      <li><a href="index.html#cards">Cards</a></li>
    </ul>

    <h5>Other components:</h5>
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
