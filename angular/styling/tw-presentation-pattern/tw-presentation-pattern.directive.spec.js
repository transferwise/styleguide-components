'use strict';

fdescribe('Directive: TwDateLookup, ', function() {
  var $compile,
      $rootScope,
      $scope,
      $element,
      element,
      TwDateService;

  beforeEach(module('tw.form-styling'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
  }));

  describe('Given there is a pattern', function() {
    describe('when typing first character', function() {
      describe('and pattern does not begin with a separator', function() {
        beforeEach(function () {
          $scope.pattern = "**-**-**";
          $scope.ngModel = null;
          $element = getCompiledDirectiveElement($scope);
          element = $element[0];
          $element.focus();
          typeCharacter($element, "1");
          $scope.$apply();
        });
        fit('should show the character', function () {
          expect($element.val()).toBe("1");
        });
        it('should bind the character to the model', function () {
          expect($scope.ngModel).toBe("1");
        });
        it('should position the cursor after the character', function () {
          expect(element.selectionStart).toBe(1);
        });
      });

      describe('and pattern begins with a single separator', function() {
        beforeEach(function () {
          $scope.pattern = "(**) **-**";
          $scope.ngModel = null;
          $element = getCompiledDirectiveElement($scope);
          element = $element[0];
          $element.focus();
          typeCharacter($element, "1");
          $scope.$apply();
        });
        it('should show the separator and the character', function () {
          expect($element.val()).toBe("(1");
        });
        it('should bind the character to the model', function () {
          expect($scope.ngModel).toBe("1");
        });
        it('should position the cursor after the separator and character', function () {
          expect(element.selectionStart).toBe(2);
        });
      });

      describe('and pattern begins with more than one separator', function() {
        beforeEach(function () {
          $scope.pattern = "(+**) **-**";
          $scope.ngModel = null;
          $element = getCompiledDirectiveElement($scope);
          element = $element[0];
          $element.focus();
          typeCharacter($element, "1");
        });
        it('should show the separators and the character', function () {
          expect($element.val()).toBe("(+1");
        });
        it('should bind the character to the model', function () {
          expect($scope.ngModel).toBe("1");
        });
        it('should position the cursor after the separators and character', function () {
          expect(element.selectionStart).toBe(3);
        });
      });
    });

    describe('when cursor', function() {
      beforeEach(function () {
        $scope.pattern = "***/**///**";
        $scope.ngModel = "1234567";
        $element = getCompiledDirectiveElement($scope);
        element = $element[0];

        $scope.$apply();
      });
      describe('follows a character', function() {
        beforeEach(function() {
          element.setSelectionRange(1, 1);
        });
        describe('and type a character', function() {
          beforeEach(function() {
            typeCharacter($element, "8");
          });
          it('should position the typed character after the cursor', function() {
            expect($element.val()).toBe("182/34///567");
            expect($scope.ngModel).toBe("18234567")
          });
          it('should position the cursor after the types character', function() {
            expect(element.selectionStart).toBe(2)
          });
        });
        describe('and press backspace', function() {

        });
      });

      describe('follows a single separator', function() {
        beforeEach(function() {
          element.setSelectionRange(4, 4);
        });
        describe('and type a character', function() {
          beforeEach(function() {
            typeCharacter($element, "8");
          });
          it('should position the typed character after the cursor', function() {
            expect($element.val()).toBe("123/84///567");
            expect($scope.ngModel).toBe("12384567")
          });
          it('should position the cursor after the types character', function() {
            expect(element.selectionStart).toBe(5)
          });
        });
        describe('and press backspace', function() {

        });
      });
      describe('precedes a single separator', function() {
        beforeEach(function() {
          element.setSelectionRange(3, 3);
        });
        describe('and type a character', function() {
          beforeEach(function() {
            typeCharacter($element, "8");
          });
          it('should position the typed character after the cursor', function() {
            expect($element.val()).toBe("123/84///567");
            expect($scope.ngModel).toBe("12384567")
          });
          it('should position the cursor after the types character', function() {
            expect(element.selectionStart).toBe(5)
          });
        });
        describe('and press backspace', function() {

        });
      });

      describe('follows a longer separator', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });
      describe('precedes a longer separator', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });

      describe('is inside a longer separator', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });
    });

    describe('when cursor selection', function() {
      describe('follows a character', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });
      describe('follows a single separator', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });
      describe('precedes a single separator', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });
      describe('follows a longer separator', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });
      describe('precedes a longer separator', function() {
        describe('and type a character', function() {

        });
        describe('and press backspace', function() {

        });
      });
    });
  });

  function typeCharacter(element, character) {
    var keyCode = character.charCodeAt(0);
    var cursorPosition = element.selectionStart;
    var originalValue = element.value || '';
    element.trigger(getKeyEvent('keydown'), keyCode);
    element.trigger(getKeyEvent('keypress'), keyCode);
    element.value =
      originalValue.substring(0, cursorPosition) +
      character +
      originalValue.substring(cursorPosition, originalValue.length);
    element.trigger(getKeyEvent('keyup'), keyCode);
  }

  function getKeyEvent(eventType, keyCode) {
    var keyboardEvent = angular.element.Event(eventType);
    keyboardEvent.which = keyCode;
    keyboardEvent.keyCode = keyCode;
    return keyboardEvent;
  }

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <input type='text' \
          tw-presentation-pattern='' \
          ng-model='ngModel' \
          ng-required='ngRequired' \
          ng-minlength='ngMinlength' \
          ng-maxlength='ngMaxlength' />";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
