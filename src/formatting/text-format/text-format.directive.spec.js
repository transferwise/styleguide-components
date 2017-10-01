'use strict';

describe('TextFormat directive, ', function() {
  var $compile,
      $rootScope,
      $scope,
      $element,
      $timeout,
      input;

  beforeEach(module('tw.styleguide.formatting'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $scope = $rootScope.$new();
  }));

  describe('Given there is a pattern', function() {
    describe('when typing first character', function() {
      describe('and pattern does not begin with a separator', function() {
        beforeEach(function() {
          $scope.pattern = '**-**-**';
          $scope.ngModel = null;
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
          input.focus();
          typeCharacter(input, '1');
          $timeout.flush(1000);
          $scope.$apply();
        });
        it('should show the character', function() {
          expect(input.value).toBe('1');
        });
        it('should bind the character to the model', function() {
          expect($scope.ngModel).toBe('1');
        });
        it('should position the cursor after the character', function() {
          if (supportsCursorPosition()) {
            expect(input.selectionStart).toBe(1);
          }
        });
      });

      describe('and pattern begins with a single separator', function() {
        beforeEach(function() {
          $scope.pattern = '(**) **-**';
          $scope.ngModel = null;
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
          input.focus();
          typeCharacter(input, '1');
          $timeout.flush();
          $scope.$apply();
        });
        it('should show the separator and the character', function() {
          expect(input.value).toBe('(1');
        });
        it('should bind the character to the model', function() {
          expect($scope.ngModel).toBe('1');
        });
        it('should position the cursor after the separator and character', function() {
          if (supportsCursorPosition()) {
            expect(input.selectionStart).toBe(2);
          }
        });
      });

      describe('and pattern begins with more than one separator', function() {
        beforeEach(function() {
          $scope.pattern = '(+**) **-**';
          $scope.ngModel = null;
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
          input.focus();
          typeCharacter(input, '1');
          $timeout.flush();
          $scope.$apply();
        });
        it('should show the separators and the character', function() {
          expect(input.value).toBe('(+1');
        });
        it('should bind the character to the model', function() {
          expect($scope.ngModel).toBe('1');
        });
        it('should position the cursor after the separators and character', function() {
          if (supportsCursorPosition()) {
            expect(input.selectionStart).toBe(3);
          }
        });
      });
    });

    if (supportsCursorPosition()) {
      describe('when cursor', function() {
        beforeEach(function() {
          $scope.pattern = '***/**/-/**';
          $scope.ngModel = '1234567';
        });
        describe('follows a character', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(1, 1);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should correctly insert the types value', function() {
              expect(input.value).toBe('182/34/-/567');
            });
            it('should correctly update the model', function() {
              expect($scope.ngModel).toBe('18234567');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(2);
            });
          });

          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character before the cursor', function() {
              expect(input.value).toBe('234/56/-/7');
              expect($scope.ngModel).toBe('234567');
            });
            it('should move the cursor position back', function() {
              expect(input.selectionStart).toBe(0);
            });
          });

          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the following character', function() {
              expect(input.value).toBe('134/56/-/7');
              expect($scope.ngModel).toBe('134567');
            });
            it('should not move the cursor position', function() {
              expect(input.selectionStart).toBe(1);
            });
          });
        });

        describe('follows a single separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(4, 4);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/84/-/567');
              expect($scope.ngModel).toBe('12384567');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character before the separator', function() {
              expect(input.value).toBe('124/56/-/7');
              expect($scope.ngModel).toBe('124567');
            });
            it('should move the cursor position back', function() {
              expect(input.selectionStart).toBe(2);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the following character', function() {
              expect(input.value).toBe('123/56/-/7');
              expect($scope.ngModel).toBe('123567');
            });
            it('should not move the cursor position ', function() {
              expect(input.selectionStart).toBe(4);
            });
          });
        });

        describe('precedes a single separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(3, 3);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/84/-/567');
              expect($scope.ngModel).toBe('12384567');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character before the cursor', function() {
              expect(input.value).toBe('124/56/-/7');
              expect($scope.ngModel).toBe('124567');
            });
            it('should move the cursor position back', function() {
              expect(input.selectionStart).toBe(2);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character after the separator', function() {
              expect(input.value).toBe('123/56/-/7');
              expect($scope.ngModel).toBe('123567');
            });
            it('should not move the cursor position', function() {
              expect(input.selectionStart).toBe(3);
            });
          });
        });

        describe('follows a longer separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(9, 9);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/45/-/867');
              expect($scope.ngModel).toBe('12345867');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(10);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character before the separators', function() {
              expect(input.value).toBe('123/46/-/7');
              expect($scope.ngModel).toBe('123467');
            });
            it('should move the cursor position back', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the following character', function() {
              expect(input.value).toBe('123/45/-/7');
              expect($scope.ngModel).toBe('123457');
            });
            it('should not move the cursor position', function() {
              expect(input.selectionStart).toBe(9);
            });
          });
        });

        describe('precedes a longer separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(6, 6);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/45/-/867');
              expect($scope.ngModel).toBe('12345867');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(10);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character before the cursor', function() {
              expect(input.value).toBe('123/46/-/7');
              expect($scope.ngModel).toBe('123467');
            });
            it('should move the cursor position back', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character following the separators', function() {
              expect(input.value).toBe('123/45/-/7');
              expect($scope.ngModel).toBe('123457');
            });
            it('should not move the cursor position', function() {
              expect(input.selectionStart).toBe(6);
            });
          });
        });

        describe('is inside a longer separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(7, 7);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/45/-/867');
              expect($scope.ngModel).toBe('12345867');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(10);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character before the separators', function() {
              expect(input.value).toBe('123/46/-/7');
              expect($scope.ngModel).toBe('123467');
            });
            it('should move the cursor position back', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the character following the separators', function() {
              expect(input.value).toBe('123/45/-/7');
              expect($scope.ngModel).toBe('123457');
            });
            it('should not move the cursor position', function() {
              expect(input.selectionStart).toBe(7);
            });
          });
        });
      });

      describe('when cursor selection range', function() {
        beforeEach(function() {
          $scope.pattern = '***/**/-/**';
          $scope.ngModel = '1234567';
        });

        /*
        // These test if the browser supports selection API in test
        it('supports selection ', function() {
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
          input.setSelectionRange(1,1);
          $timeout.flush();
          $scope.$apply();
          expect(input.selectionStart).toBe(1);
        });
        it('supports selection range start', function() {
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
          input.setSelectionRange(1,2);
          $timeout.flush();
          $scope.$apply();
          expect(input.selectionStart).toBe(1);
        });
        it('supports selection range end', function() {
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
          input.setSelectionRange(1,2);
          $timeout.flush();
          $scope.$apply();
          expect(input.selectionEnd).toBe(2);
        });
        */

        describe('follows a character', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(1, 2);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('183/45/-/67');
              expect($scope.ngModel).toBe('1834567');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(2);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('134/56/-/7');
              expect($scope.ngModel).toBe('134567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(1);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('134/56/-/7');
              expect($scope.ngModel).toBe('134567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(1);
            });
          });
        });

        describe('follows a single separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(4, 5);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/85/-/67');
              expect($scope.ngModel).toBe('1238567');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('123/56/-/7');
              expect($scope.ngModel).toBe('123567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(4);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('123/56/-/7');
              expect($scope.ngModel).toBe('123567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(4);
            });
          });
        });

        describe('precedes a single separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(2, 3);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('128/45/-/67');
              expect($scope.ngModel).toBe('1284567');
            });
            it('should position the cursor after the typed character and separator', function() {
              expect(input.selectionStart).toBe(3); // TODO should this be 4???
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('124/56/-/7');
              expect($scope.ngModel).toBe('124567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(2);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('124/56/-/7');
              expect($scope.ngModel).toBe('124567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(2);
            });
          });
        });

        describe('follows a longer separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(9, 10);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/45/-/87');
              expect($scope.ngModel).toBe('1234587');
            });
            it('should position the cursor after the typed character', function() {
              expect(input.selectionStart).toBe(10);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('123/45/-/7');
              expect($scope.ngModel).toBe('123457');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(9);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('123/45/-/7');
              expect($scope.ngModel).toBe('123457');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(9);
            });
          });
        });

        describe('precedes a longer separator', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(5, 6);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('123/48/-/67');
              expect($scope.ngModel).toBe('1234867');
            });
            it('should position the cursor after the typed character and separator', function() {
              expect(input.selectionStart).toBe(6); // TODO should this be 9???
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('123/46/-/7');
              expect($scope.ngModel).toBe('123467');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('123/46/-/7');
              expect($scope.ngModel).toBe('123467');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(5);
            });
          });
        });

        describe('contains separators', function() {
          beforeEach(function() {
            $element = getCompiledDirectiveElement($scope);
            input = $element[0];
            input.setSelectionRange(2, 5);
          });
          describe('and type a character', function() {
            beforeEach(function() {
              typeCharacter(input, '8');
              $timeout.flush();
              $scope.$apply();
            });
            it('should position the typed character after the cursor', function() {
              expect(input.value).toBe('128/56/-/7');
              expect($scope.ngModel).toBe('128567');
            });
            it('should position the cursor after the typed character and separator', function() {
              expect(input.selectionStart).toBe(3);
            });
          });
          describe('and press backspace', function() {
            beforeEach(function() {
              typeBackspace(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('125/67/-/');
              expect($scope.ngModel).toBe('12567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(2);
            });
          });
          describe('and press delete', function() {
            beforeEach(function() {
              typeDelete(input);
              $timeout.flush();
              $scope.$apply();
            });
            it('should delete the characters inside the range', function() {
              expect(input.value).toBe('125/67/-/');
              expect($scope.ngModel).toBe('12567');
            });
            it('should move the cursor position to selection start', function() {
              expect(input.selectionStart).toBe(2);
            });
          });
        });
      });
    }


    if (supportsCursorPosition()) {
      describe('when pasting ', function() {
        beforeEach(function() {
          $scope.pattern = '***/**/-/**';
          $scope.ngModel = '1234567';
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
        });

        describe('and cursor follows a character', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(1, 1);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('189/23/-/4567');
            expect($scope.ngModel).toBe('189234567');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(3);
          });
        });
        describe('and cursor before separator', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(3, 3);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('123/89/-/4567');
            expect($scope.ngModel).toBe('123894567');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(6);
          });
        });
        describe('and value after separator', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(4, 4);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('123/89/-/4567');
            expect($scope.ngModel).toBe('123894567');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(6);
          });
        });
        describe('and value will include a separator', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(2, 2);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('128/93/-/4567');
            expect($scope.ngModel).toBe('128934567');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(5);
          });
        });

        describe('over a selection without separators', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(0, 2);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('893/45/-/67');
            expect($scope.ngModel).toBe('8934567');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(2);
          });
        });
        describe('over a selection including a separator', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(2, 5);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('128/95/-/67');
            expect($scope.ngModel).toBe('1289567');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(5);
          });
        });
        describe('over a selection including multiple separators', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(5, 10);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('123/48/-/97');
            expect($scope.ngModel).toBe('1234897');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(10);
          });
        });
        describe('and will exceed pattern length', function() {
          beforeEach(function() {
            input.focus();
            input.setSelectionRange(10, 10);
            pasteString(input, '89');
            $timeout.flush();
            $scope.$apply();
          });
          it('should add the pasted characters', function() {
            expect(input.value).toBe('123/45/-/6897');
            expect($scope.ngModel).toBe('123456897');
          });
          it('should position the cursor after the pasted data', function() {
            expect(input.selectionStart).toBe(12);
          });
        });
      });

      describe('when using undo/redo ', function() {
        beforeEach(function() {
          $scope.pattern = '***/**/-/**';
          $scope.ngModel = '';
          $element = getCompiledDirectiveElement($scope);
          input = $element[0];
        });

        it('undo should go back to previous value', function() {
          typeCharacter(input, '1');
          $timeout.flush();
          typeCharacter(input, '2');
          $timeout.flush();
          typeUndo(input);
          $scope.$apply();

          expect(input.value).toBe('1');
          expect($scope.ngModel).toBe('1');
        });

        it('undo should only go back to first value', function() {
          typeCharacter(input, '1');
          $timeout.flush();
          typeCharacter(input, '2');
          $timeout.flush();
          typeUndo(input);
          typeUndo(input);
          typeUndo(input);
          $scope.$apply();

          expect(input.value).toBe('');
          expect($scope.ngModel).toBe('');
        });

        it('redo should go forwards to value before undo', function() {
          typeCharacter(input, '1');
          $timeout.flush();
          typeCharacter(input, '2');
          $timeout.flush();
          typeUndo(input);
          typeRedo(input);
          $scope.$apply();

          expect(input.value).toBe('12');
          expect($scope.ngModel).toBe('12');
        });

        it('repeated redo should not go beyond last value', function() {
          typeCharacter(input, '1');
          $timeout.flush();
          typeCharacter(input, '2');
          $timeout.flush();
          typeUndo(input);
          typeRedo(input);
          typeRedo(input);
          $scope.$apply();

          expect(input.value).toBe('12');
          expect($scope.ngModel).toBe('12');
        });

        it('typing new character after undo should cancel any redo', function() {
          typeCharacter(input, '1');
          $timeout.flush();
          typeCharacter(input, '2');
          $timeout.flush();
          typeUndo(input);
          typeCharacter(input, '3');
          $timeout.flush();
          typeRedo(input);
          $scope.$apply();

          expect(input.value).toBe('13');
          expect($scope.ngModel).toBe('13');
        });
      });
    }
  });

  describe('Given an OR pattern (**-**||***-**) is supplied', function() {
    beforeEach(function() {
      $scope.pattern = '**-**||***-**';
      $scope.ngModel = '123456';
      $element = getCompiledDirectiveElement($scope);
      input = $element[0];
    });
    it('should use the first option', function() {
      expect(input.value).toBe('12-3456');
    });
  });

  describe('when used with validation', function() {
    beforeEach(function() {
      $scope.ngModel = '123';
      $scope.pattern = '**-**';
    });
    describe('minlength', function() {
      beforeEach(function() {
        $scope.ngMinlength = 4;
        $element = getCompiledDirectiveElement($scope);
        input = $element[0];
        $timeout.flush(); // Make sure validator is replaced
      });
      it('should not count separators', function() {
        angular.element(input).trigger('input');
        expect(input.classList.contains('ng-valid')).toBe(false);
      });
      it('should validate correctly', function() {
        typeCharacter(input, '4');
        expect(input.classList.contains('ng-valid')).toBe(true);
      });
    });
    describe('maxlength', function() {
      beforeEach(function() {
        $scope.ngMaxlength = 4;
        $element = getCompiledDirectiveElement($scope);
        input = $element[0];
        $timeout.flush(); // Make sure validator is replaced
      });
      it('should not count separators', function() {
        typeCharacter(input, '4');
        expect(input.classList.contains('ng-valid')).toBe(true);
      });
      it('should validate correctly', function() {
        typeCharacter(input, '4');
        typeCharacter(input, '5');
        expect(input.classList.contains('ng-valid')).toBe(false);
      });
    });
    describe('pattern', function() {
      beforeEach(function() {
        $scope.ngPattern = new RegExp('^[0-9]*$');
        $element = getCompiledDirectiveElement($scope);
        input = $element[0];
        $timeout.flush(); // Make sure validator is replaced
      });
      it('should not validate separators', function() {
        typeCharacter(input, '4');
        expect(input.classList.contains('ng-valid')).toBe(true);
      });
      it('should validate correctly', function() {
        typeCharacter(input, 'A');
        expect(input.classList.contains('ng-valid')).toBe(false);
      });
    });
  });

  /**
   * Neither Firefox or Phantom correctly supports cursor position in tests
   * e.g. this fails:
   * it('should support setting selection range', function() {
   *   input.setSelectionRange(1,1);
   *   expect(input.selectionStart).toBe(1);
   * });
   */
  function supportsCursorPosition() {
    return !(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ||
      navigator.userAgent.toLowerCase().indexOf('phantom') > -1);
  }

  function typeCharacter(input, character) {
    var keyCode = character.charCodeAt(0);
    var selectionStart = input.selectionStart,
      selectionEnd = input.selectionEnd;
    var originalValue = input.value || '';

    input.dispatchEvent(getKeyEvent('keydown', keyCode));

    // Following works for range selections and nor range
    input.value =
      originalValue.substring(0, selectionStart) +
      character +
      originalValue.substring(selectionEnd, originalValue.length);

    input.setSelectionRange(selectionStart + 1, selectionStart + 1);

    input.dispatchEvent(getKeyEvent('keypress', keyCode));
    input.dispatchEvent(getKeyEvent('keyup', keyCode));
    angular.element(input).trigger('input');
  }

  function typeBackspace(input) {
    var selectionStart = input.selectionStart,
      selectionEnd = input.selectionEnd;
    var originalValue = input.value || '';
    var backspaceKey = 8;

    input.dispatchEvent(getKeyEvent('keydown', backspaceKey));

    if (selectionStart === selectionEnd) {
      input.value =
        originalValue.substring(0, selectionStart - 1) +
        originalValue.substring(selectionStart, originalValue.length);

      input.setSelectionRange(selectionStart - 1, selectionStart - 1);
    } else {
      input.value =
        originalValue.substring(0, selectionStart) +
        originalValue.substring(selectionEnd, originalValue.length);

      input.setSelectionRange(selectionStart, selectionStart);
    }

    input.dispatchEvent(getKeyEvent('keypress', backspaceKey));
    input.dispatchEvent(getKeyEvent('keyup', backspaceKey));
    angular.element(input).trigger('input');
  }

  function typeDelete(input) {
    var selectionStart = input.selectionStart,
      selectionEnd = input.selectionEnd;
    var originalValue = input.value || '';
    var deleteKey = 46;

    input.dispatchEvent(getKeyEvent('keydown', deleteKey));

    if (selectionStart === selectionEnd) {
      input.value =
        originalValue.substring(0, selectionStart) +
        originalValue.substring(selectionStart + 1, originalValue.length);
    } else {
      input.value =
        originalValue.substring(0, selectionStart) +
        originalValue.substring(selectionEnd, originalValue.length);
    }

    input.setSelectionRange(selectionStart, selectionStart);

    input.dispatchEvent(getKeyEvent('keypress', deleteKey));
    input.dispatchEvent(getKeyEvent('keyup', deleteKey));
    angular.element(input).trigger('input');
  }

  function typeUndo(input) {
    triggerMetaEvent(input, 90); // z
  }
  function typeRedo(input) {
    triggerMetaEvent(input, 89); // y
  }

  function triggerMetaEvent(input, keyCode) {
    var keydown = getKeyEvent('keydown', keyCode);
    var keypress = getKeyEvent('keypress', keyCode);
    var keyup = getKeyEvent('keyup', keyCode);

    //keydown.metaKey = true;
    //keypress.metaKey = true;
    //keyup.metaKey = true;

    keydown.ctrlKey = true;
    keypress.ctrlKey = true;
    keyup.ctrlKey = true;

    input.dispatchEvent(keydown);
    input.dispatchEvent(keypress);
    input.dispatchEvent(keyup);
    angular.element(input).trigger('input');
  }

  function getKeyEvent(eventType, keyCode) {
    var keyboardEvent = new Event(eventType);
    keyboardEvent.which = String.fromCharCode(keyCode);
    keyboardEvent.keyCode = keyCode;
    keyboardEvent.charCode = keyCode;
    return keyboardEvent;
  }

  function pasteString(input, pasteValue) {
    var pasteEvent = new Event('paste');
    window.clipboardData = {
      getData: function() {
        return pasteValue;
      }
    };
    input.dispatchEvent(pasteEvent);

    input.value =
      input.value.substring(0, input.selectionStart) +
      pasteValue +
      input.value.substring(input.selectionEnd, input.length);

    angular.element(input).trigger('input');
  }

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <input type='text' \
          tw-text-format='" + scope.pattern + "' \
          ng-model='ngModel' \
          ng-required='ngRequired' \
          ng-minlength='ngMinlength' \
          ng-maxlength='ngMaxlength' \
          ng-pattern='ngPattern' />";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
