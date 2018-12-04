function getMockComponent(name) {
  function mockComponentFactory($provide) {
    (mockComponentFactory.templateText = name + 'content'),

    (mockComponentFactory.name = name);

    $provide.decorator(name + 'Directive', function($delegate) {
      const directive = $delegate[0];

      if (directive.templateUrl) {
        delete directive.templateUrl;
      }

      directive.compile = function() {};

      directive.template =
        '<div>' + mockComponentFactory.templateText + '</div>';

      directive.controller = function($attrs) {
        mockComponentFactory.attrs = $attrs;
        mockComponentFactory.bindings = this;
      };

      return $delegate;
    });
  }

  return mockComponentFactory;
}
