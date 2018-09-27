'use strict';

describe('Definition list', function() {
  var $compile,
    $rootScope,
    $scope,
    $element,
    element,
    term,
    listItem,
    definition;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();

    $scope.locale = 'en-GB';
    $scope.model = {};
    $scope.fields = [];

    $element = getCompiledDirectiveElement();
    element = $element[0];
    listItem = element.getElementsByTagName('dl')[0];
    term = element.getElementsByTagName('dt')[0];
    definition = element.getElementsByTagName('dd')[0];
  }));

  describe('when given a text field', function() {
    beforeEach(function() {
      $scope.model = {
        key: 'ABCD'
      };
      $scope.fields = {
        key: {
          title: 'Text label',
          type: 'text',
          displayFormat: '** - **'
        }
      };
      setupVars();
    });
    it('should display the formatted text value', function() {
      expect(definition.textContent.trim()).toBe('AB - CD');
    });
  });

  describe('when given a number field', function() {
    beforeEach(function() {
      $scope.model = {
        key: 1234
      };
      $scope.fields = {
        key: {
          title: 'Number label',
          type: 'number'
        }
      };
      setupVars();
    });
    it('should display the formatted number value', function() {
      if (isNumberLocaleSupported()) {
        expect(definition.textContent.trim()).toBe('1,234');
      } else {
        expect(definition.textContent.trim()).toBe('1234');
      }
    });
  });

  describe('when given a date field', function() {
    beforeEach(function() {
      $scope.model = {
        key: '2000-01-01T00:00:00Z'
      };
      $scope.fields = {
        key: {
          title: 'Date label',
          type: 'date'
        }
      };
      setupVars();
    });
    it('should display the formatted date value', function() {
      expect(definition.textContent.trim()).toBe('1 January 2000');
    });
  });

  describe('when given a select field', function() {
    beforeEach(function() {
      $scope.model = {
        key: '2'
      };
      $scope.fields = {
        key: {
          title: 'Select label',
          type: 'select',
          values: [
            {
              'value': '1',
              'label': 'One'
            },
            {
              'value': '2',
              'label': 'Two'
            }
          ]
        }
      };
      setupVars();
    });
    it('should display the selected option value', function() {
      expect(definition.textContent.trim()).toBe('Two');
    });
  });

  describe('when given a radio field', function() {
    beforeEach(function() {
      $scope.model = {
        key: '2'
      };
      $scope.fields = {
        key: {
          title: 'Radio label',
          type: 'radio',
          values: [
            {
              'value': '1',
              'label': 'One'
            },
            {
              'value': '2',
              'label': 'Two'
            }
          ]
        }
      };
      setupVars();
    });
    it('should display the selected radio value', function() {
      expect(definition.textContent.trim()).toBe('Two');
    });
  });

  describe('when given a checkbox field', function() {
    beforeEach(function() {
      $scope.model = {
        key: true
      };
      $scope.fields = {
        key: {
          title: 'Checkbox label',
          type: 'boolean'
        }
      };
      setupVars();
    });
    it('should display the boolean', function() {
      expect(definition.textContent.trim()).toBe('true');
    });
  });

  describe('when given a password field', function() {
    beforeEach(function() {
      $scope.model = {
        key: '1234'
      };
      $scope.fields = {
        key: {
          title: 'Password label',
          type: 'string',
          control: 'password'
        }
      };
      setupVars();
    });
    it('should display the password masked', function() {
      expect(definition.textContent.trim()).toBe('****');
    });
  });

  describe('when given requirements with nested field groups', function () {

    describe('when given a text field', function() {
      beforeEach(function() {
        $scope.model = {
          key: 'ABCD'
        };
        $scope.fields = {
          key: {
            title: 'Text label',
            type: 'string',
            displayFormat: '** - **'
          }
        };
        setupVars();
      });
      it('should display the formatted text value', function() {
        expect(definition.textContent.trim()).toBe('AB - CD');
      });
    });

    describe('when given a number field', function() {
      beforeEach(function() {
        $scope.model = {
          key: 1234
        };
        $scope.fields = {
          key: {
            title: 'Number label',
            type: 'number'
          }
        };
        setupVars();
      });
      it('should display the formatted number value', function() {
        if (isNumberLocaleSupported()) {
          expect(definition.textContent.trim()).toBe('1,234');
        } else {
          expect(definition.textContent.trim()).toBe('1234');
        }
      });
    });

    describe('when given a date field', function() {
      beforeEach(function() {
        $scope.model = {
          key: '2000-01-01T00:00:00Z'
        };
        $scope.fields = {
          key: {
            title: 'Date label',
            type: 'string',
            format: 'date'
          }
        };
        setupVars();
      });
      it('should display the formatted date value', function() {
        expect(definition.textContent.trim()).toBe('1 January 2000');
      });
    });

    describe('when given a select field', function() {
      beforeEach(function() {
        $scope.model = {
          key: '2'
        };
        $scope.fields = {
          key: {
            title: 'Select label',
            type: 'string',
            control: 'select',
            values: [
              {
                'value': '1',
                'label': 'One'
              },
              {
                'value': '2',
                'label': 'Two'
              }
            ]
          }
        };
        setupVars();
      });
      it('should display the selected option value', function() {
        expect(definition.textContent.trim()).toBe('Two');
      });
    });

    describe('when given a radio field', function() {
      beforeEach(function() {
        $scope.model = {
          key: '2'
        };
        $scope.fields = {
          key: {
            title: 'Radio label',
            type: 'string',
            control: 'radio',
            values: [
              {
                'value': '1',
                'label': 'One'
              },
              {
                'value': '2',
                'label': 'Two'
              }
            ]
          }
        };
        setupVars();
      });
      it('should display the selected radio value', function() {
        expect(definition.textContent.trim()).toBe('Two');
      });
    });

    describe('when given a checkbox field', function() {
      beforeEach(function() {
        $scope.model = {
          key: true
        };
        $scope.fields = {
          key: {
            title: 'Checkbox label',
            type: 'boolean'
          }
        };
        setupVars();
      });
      it('should display the boolean', function() {
        expect(definition.textContent.trim()).toBe('true');
      });
    });

    describe('when given a password field', function() {
      beforeEach(function() {
        $scope.model = {
          key: '1234'
        };
        $scope.fields = {
          key: {
            title: 'Password label',
            type: 'string',
            control: 'password'
          }
        };
        setupVars();
      });
      it('should display the password masked', function() {
        expect(definition.textContent.trim()).toBe('****');
      });
    });

    describe('when given a justified layout', function() {
      beforeEach(function() {
        $scope.layout = 'justified';
        $scope.model = {
          key: 'ABCD'
        };
        $scope.fields = {
          key: {
            title: 'Text label',
            type: 'text',
            displayFormat: '** - **'
          }
        };
        setupVars();
      });
      it('should not have an element with col-sm-6 class', function() {
        var rowElements = $element.find('.col-sm-6');
        expect(rowElements.length).toBe(0);
      });
      it('should not have an element with row-equal-height class', function() {
        var rowElements = $element.find('.row-equal-height');
        expect(rowElements.length).toBe(0);
      });
      it('should add a dl-horizontal-item class to the dl element', function() {
        expect(listItem.classList.contains('dl-horizontal-item')).toBe(true);
      });
    });

    describe('when given a horizontal layout', function() {
      beforeEach(function() {
        $scope.layout = 'horizontal';
        $scope.model = {
          key: 'ABCD'
        };
        $scope.fields = {
          key: {
            title: 'Text label',
            type: 'text',
            displayFormat: '** - **'
          }
        };
        setupVars();
      });
      it('should not have an element with col-sm-6 class', function() {
        var rowElements = $element.find('.col-sm-6');
        expect(rowElements.length).toBe(0);
      });
      it('should not have an element with row-equal-height class', function() {
        var rowElements = $element.find('.row-equal-height');
        expect(rowElements.length).toBe(0);
      });
      it('should add a dl-horizontal class to the dl element', function() {
        expect(listItem.classList.contains('dl-horizontal')).toBe(true);
      });
    });

    describe('when given a vertical layout', function() {
      beforeEach(function() {
        $scope.layout = 'vertical';
        $scope.model = {
          key: 'ABCD'
        };
        $scope.fields = {
          key: {
            title: 'Text label',
            type: 'text',
            displayFormat: '** - **'
          }
        };
        setupVars();
      });
      it('should have an element with col-sm-6 class', function() {
        var rowElements = $element.find('.col-sm-6');
        expect(rowElements.length).toBe(1);
      });
      it('should have an element with row-equal-height class', function() {
        var rowElements = $element.find('.row-equal-height');
        expect(rowElements.length).toBe(1);
      });
      it('should not add a dl-horizontal-item nor dl-horizontal class to the dl element', function() {
        expect(listItem.classList.contains('dl-horizontal-item')).toBe(false);
        expect(listItem.classList.contains('dl-horizontal')).toBe(false);
      });
    });
  });

  function setupVars() {
    $element = getCompiledDirectiveElement();
    element = $element[0];
    term = element.getElementsByTagName('dt')[0];
    definition = element.getElementsByTagName('dd')[0];
    listItem = element.getElementsByTagName('dl')[0];
  }

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-definition-list \
        layout='layout' \
        model='model' \
        fields='fields' \
        locale='locale'> \
      </tw-definition-list>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement;
  }

  function isNumberLocaleSupported() {
    var num = 1234;
    var numString = num.toLocaleString('en-GB');
    return numString === '1,234';
  }
});
