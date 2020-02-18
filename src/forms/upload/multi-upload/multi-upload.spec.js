fdescribe('multi-upload', () => {
    let $q;
    let $compile;
    let $rootScope;
    let $scope;
    let $timeout;
    let directiveElement;
    let AsyncFileReader;
    let AsyncFileSaver;
    let AsyncTasksConfig;
    let FileValidationService;

    const base64url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCA'
    + 'IAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcMEQwbn8bvgwAAAB1pV'
    + 'Fh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAADElEQVQI12P4//8/AAX+'
    + 'Av7czFnnAAAAAElFTkSuQmCC';

    beforeEach(() => {
        angular.mock.module('tw.styleguide.forms.upload.multi');
    
        angular.mock.inject(($injector) => {
          $rootScope = $injector.get('$rootScope');
          $compile = $injector.get('$compile');
          $scope = $rootScope.$new();
          $timeout = $injector.get('$timeout');
          $q = $injector.get('$q');
          AsyncFileReader = $injector.get('AsyncFileReader');
          // AsyncFileSaver = $injector.get('AsyncFileSaver');
          // AsyncTasksConfig = $injector.get('AsyncTasksConfig');
          // FileValidationService = $injector.get('FileValidationService');
        });
    });


    describe('initial state', () => {
        let dropTarget;
        let deferred;
    
        beforeEach(() => {
          const template = " \
            <tw-multi-upload \
                ng-model='ngModel' \
                on-start='onStart' \
                on-finish='onFinish' \
                processing-text='processing' \
                success-text='success'\
                failure-text='failure' \
                max-size='10'> \
            </tw-multi-upload>";
    
          $scope.ngModel = null;
          $scope.onStart = jasmine.createSpy('onStart');
          $scope.onFinish = jasmine.createSpy('onFinish');
    
          deferred = $q.defer();
          spyOn(AsyncFileReader, 'read').and.returnValue(deferred.promise);
    
          directiveElement = getCompiledDirectiveElement($scope, template);
        });

        it('should render the default screen', () => {
          expect(directiveElement.querySelector('#empty-processing-list')).toBeTruthy();
          expect(directiveElement.querySelector('#processing-list')).toBeFalsy();
        });

        describe('on addition of new files', () => {
          describe('processing', () => {
            beforeEach(() => {
              dropTarget = directiveElement.querySelector('.droppable');
    
              const fakeDropEvent = new CustomEvent('drop');
              fakeDropEvent.dataTransfer = { files: [{ size: 2 }, {size: 3}] };
              dropTarget.dispatchEvent(fakeDropEvent);
            })

            it('renders the list of processing files', () => {
              expect(directiveElement.querySelector('#empty-processing-list')).toBeFalsy();
              expect(directiveElement.querySelectorAll('.processing-item').length).toBe(2);
            });

            it('calls onStart', () => {
                expect($scope.onStart).toHaveBeenCalled();
            });
          });

          describe('success', () => {
            beforeEach(() => {
              dropTarget = directiveElement.querySelector('.droppable');
    
              const fakeDropEvent = new CustomEvent('drop');
              fakeDropEvent.dataTransfer = { files: [{ name: 'one.jpg', size: 2 }, {name: 'two.png', size: 5}] };
              dropTarget.dispatchEvent(fakeDropEvent);

              deferred.resolve(base64url);
              $timeout.flush(3800);
            });

            it('returns the model with data urls', () => {
              expect($scope.ngModel).toEqual([base64url, base64url]);
            });

            it('user can remove a file', () => {
              const firstFileRemoveButton = directiveElement.querySelectorAll('.processing-item .close')[0];

              firstFileRemoveButton.dispatchEvent(new CustomEvent('click'));
              
              expect(directiveElement.querySelectorAll('.processing-item').length).toBe(1);
              expect(directiveElement.querySelector('.processing-item h5').innerText).toBe('two.png');
              expect($scope.ngModel).toEqual([base64url]);
            });

            it('user can remove all files and return to the landing screen', () => {
              const removeButtons = directiveElement.querySelectorAll('.processing-item .close');

              removeButtons[0].dispatchEvent(new CustomEvent('click'));
              removeButtons[1].dispatchEvent(new CustomEvent('click'));

              expect($scope.ngModel).toEqual([]);
              expect(directiveElement.querySelector('#empty-processing-list')).toBeTruthy();
              expect(directiveElement.querySelector('#processing-list')).toBeFalsy();
            });

            it('calls onFinish', () => {
              expect($scope.onFinish).toHaveBeenCalled();
            });
          });

          describe('fail', () => {
            beforeEach(() => {
              dropTarget = directiveElement.querySelector('.droppable');
    
              const fakeDropEvent = new CustomEvent('drop');
              fakeDropEvent.dataTransfer = { files: [{ size: 2 }, {size: 5}] };
              dropTarget.dispatchEvent(fakeDropEvent);
            });

            it('returns a model with NO data urls or IDs', () => {
              deferred.reject({status: 422, data: {message: "Sorry unreadable", errors: ["Too blurry"]}});
              $timeout.flush(4500);

              expect($scope.ngModel).toBeNull;
            });

            it('calls onFinish', () => {
              deferred.reject({status: 422, data: {message: "Sorry unreadable", errors: ["Too blurry"]}});
              $timeout.flush(4500);

              expect($scope.onFinish).toHaveBeenCalled();
            });
          });
        });
    });

    describe('user already has processed files', () => {
      let dropTarget;
      let deferred;
      let asyncFileReaderSpy;

      beforeEach(() => {
        const template = " \
        <tw-multi-upload \
            ng-model='ngModel' \
            on-start='onStart' \
            on-success='onSuccess' \
            on-finish='onFinish' \
            processing-text='processing' \
            success-text='success'\
            failure-text='failure' \
            max-size='10'> \
        </tw-multi-upload>";

        $scope.ngModel = null;
        $scope.onStart = jasmine.createSpy('onStart');
        $scope.onFinish = jasmine.createSpy('onFinish');

        deferred = $q.defer();
        asyncFileReaderSpy = spyOn(AsyncFileReader, 'read').and.returnValue(deferred.promise);

        directiveElement = getCompiledDirectiveElement($scope, template);

        dropTarget = directiveElement.querySelector('.droppable');
    
        const fakeDropEvent = new CustomEvent('drop');
        fakeDropEvent.dataTransfer = { files: [{ size: 2 }, {size: 5}, {size: 1}] };
        dropTarget.dispatchEvent(fakeDropEvent);
        deferred.resolve(base64url);

        $timeout.flush(3800);
      });

      it('should be in the processing screen', () => {
        expect(directiveElement.querySelector('#empty-processing-list')).toBeFalsy();
        expect(directiveElement.querySelectorAll('.processing-item').length).toBe(3);
        expect($scope.ngModel).toEqual([base64url, base64url, base64url]);
      });

      describe('on addition of new files', () => {
          describe('processing', () => {
            beforeEach(() => {
              const fakeDropEvent = new CustomEvent('drop');
              fakeDropEvent.dataTransfer = { files: [{size: 1}, {size: 1}] };
              
              dropTarget.dispatchEvent(fakeDropEvent);
            });

            it('does NOT return the processing items in the model', () => {
                expect($scope.ngModel).toEqual([base64url, base64url, base64url]);
              });

              fit('calls onStart', () => {
                expect($scope.onStart.calls.count()).toBe(2);
              });
          });

          describe('success', () => {
              beforeEach(() => {
                const fakeDropEvent = new CustomEvent('drop');
                fakeDropEvent.dataTransfer = { files: [{size: 1}, {size: 1}] };
                
                dropTarget.dispatchEvent(fakeDropEvent);

                $timeout.flush(3800);
              });

              it('returns the recently processed items in the model', () => {
                expect($scope.ngModel).toEqual([base64url, base64url, base64url, base64url, base64url]);
              });

              it('calls onFinish', () => {
                expect($scope.onFinish.calls.count()).toBe(2);
              });

              it('calls onSuccess with the index of the successful file', () => {});
          });

          describe('failure', () => {
            beforeEach(() => {
              const rejectedDeferred = $q.defer();
              asyncFileReaderSpy.and.returnValue(rejectedDeferred.promise);
              rejectedDeferred.reject({error: 'an error'});
              const fakeDropEvent = new CustomEvent('drop');
              fakeDropEvent.dataTransfer = { files: [{size: 1}, {size: 1}] };
              
              dropTarget.dispatchEvent(fakeDropEvent);
              $timeout.flush(4500);
            });

            // fit('renders the failed items with an error message', () => {
            //   $scope.$digest();
            //   const files = directiveElement.querySelectorAll('.processing-item');
            //   const thirdItem = files[2];
            //   const fourthItem = files[3];
            //   const thirdMessage = thirdItem.querySelector('p').innerText;
            //   const fourthMessage = fourthItem.querySelector('p').innerText;

            //   expect(thirdMessage).toBe('failure');
            //   expect(fourthMessage).toBe('failure');
            // });

            it('returns a model with the data urls from the first successful upload', () => {
              expect($scope.ngModel).toEqual([base64url, base64url, base64url]);
            });

            it('calls onFinish', () => {
              expect($scope.onFinish.calls.count()).toBe(2);
            });

            it('calls onFailure with the index of the rejected file', () => {});
          });
      });
    });

    describe('httpOptions set to true', () => {
    });

    function getCompiledDirectiveElement($scope, template) {
      const element = angular.element(template);
      // append to document so we can test document.activeElement
      angular.element(document.body).append(element);
      const compiledElement = $compile(element)($scope);
  
      $scope.$digest();
      return compiledElement[0];
    }
});