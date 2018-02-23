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

module.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])
  .component('docsNavigation', {
    templateUrl: 'partials/navigation.html'
  })
  .controller('PageController', function () {
    this.log = function (message) { console.log(message); };

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
  .directive('validateRegexp', ['$q', function ($q) {
    return {
      require: 'ngModel',
      link(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.async = function () { // (modelValue, viewValue) {
          try {
            // const reg = new RegExp(viewValue);
            return $q.when(true);
          } catch (error) {
            return $q.reject(false);
          }
        };
      }
    };
  }])
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
