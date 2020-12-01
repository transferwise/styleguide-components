function getMockComponent(name) {
  function mockComponentFactory($provide) {
    mockComponentFactory.templateText = `${name}Content`;
    mockComponentFactory.name = name;

    $provide.decorator(`${name} Directive`, $delegate => {
      const directive = $delegate[0];

      if (directive.templateUrl) {
        delete directive.templateUrl;
      }

      directive.compile = () => {};

      directive.template = `<div>${mockComponentFactory.templateText}</div>`;

      directive.controller = $attrs => {
        mockComponentFactory.attrs = $attrs;
        mockComponentFactory.bindings = this;
      };

      return $delegate;
    });
  }

  return mockComponentFactory;
}
