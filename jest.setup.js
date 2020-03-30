/* eslint-disable no-multi-assign */
global.jQuery = global.$ = require('jquery');
require('bootstrap');
require('angular');
require('angular-mocks');

require('./src');
require('./src/json-schema');

global.getMockComponent = function getMockComponent(name) {
  function mockComponentFactory($provide) {
    mockComponentFactory.templateText = `${name}content`;
    $provide.decorator(`${name}Directive`, ($delegate) => {
      const directive = $delegate[0];

      if (directive.templateUrl) {
        delete directive.templateUrl;
      }

      directive.compile = function compile() {};

      directive.template = `<div>${mockComponentFactory.templateText}</div>`;

      directive.controller = function controller($attrs) {
        mockComponentFactory.attrs = $attrs;
        mockComponentFactory.bindings = this;
      };

      return $delegate;
    });
  }

  return mockComponentFactory;
};
