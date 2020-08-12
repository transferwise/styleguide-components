describe('given an upload component', () => {
  let $q;
  let $compile;
  let $rootScope;
  let $scope;
  let $timeout;
  let directiveElement;
  let AsyncFileReader;
  let AsyncFileSaver;

  const base64url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCA'
   + 'IAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcMEQwbn8bvgwAAAB1pV'
   + 'Fh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAADElEQVQI12P4//8/AAX+'
   + 'Av7czFnnAAAAAElFTkSuQmCC';

  beforeEach(() => {
    angular.mock.module('tw.styleguide.forms.upload');

    angular.mock.inject(($injector) => {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      AsyncFileReader = $injector.get('AsyncFileReader');
      AsyncFileSaver = $injector.get('AsyncFileSaver');
    });
  });

  it('initially starts an interval to check for state changes', () => {
    const template = " \
    <tw-upload \
      too-large-message='File is too large' \
      processing-text='processing' \
      success-text='success'\
      failure-text='failure' \
      on-start='onStart' \
      on-success='onSuccess' \
      on-failure='onFailure' \
      on-cancel='onCancel' \
      max-size='10'> \
    </tw-upload>";  

    directiveElement = getCompiledDirectiveElement($scope, template);
    const processingElement = angular.element(directiveElement.querySelector('tw-process'));

    expect(processingElement.isolateScope().$ctrl.interval).not.toEqual(null);
  });

  describe('when a file is dropped', () => {
    let dropTarget;
    let deferred;

    beforeEach(() => {
      const template = " \
        <tw-upload \
          too-large-message='File is too large' \
          processing-text='processing' \
          success-text='success'\
          failure-text='failure' \
          on-start='onStart' \
          on-success='onSuccess' \
          on-failure='onFailure' \
          on-cancel='onCancel' \
          max-size='10'> \
        </tw-upload>";

      // Create spies for callbacks
      $scope.onStart = jest.fn();
      $scope.onSuccess = jest.fn();
      $scope.onFailure = jest.fn();
      $scope.onCancel = jest.fn();

      deferred = $q.defer();
      jest.spyOn(AsyncFileReader, 'read').mockReturnValue(deferred.promise);

      directiveElement = getCompiledDirectiveElement($scope, template);

      dropTarget = directiveElement.querySelector('.droppable');

      const fakeDropEvent = new CustomEvent('drop'); // file drop can be mocked
      fakeDropEvent.dataTransfer = { files: [{ size: 2 }] };
      dropTarget.dispatchEvent(fakeDropEvent);
    });

    it('should trigger to the onStart handler', () => {
      expect($scope.onStart).toHaveBeenCalled();
    });

    it('should not trigger the other handlers', () => {
      expect($scope.onSuccess).not.toHaveBeenCalled();
      expect($scope.onFailure).not.toHaveBeenCalled();
      expect($scope.onCancel).not.toHaveBeenCalled();
    });

    it('should move to the processing screen', () => {
      expect(dropTarget.classList).toContain('droppable-processing');
    });

    it('should show the processing message', () => {
      const processingMessage = directiveElement.querySelector('.upload-processing-message');
      expect(processingMessage).toBeTruthy();
      expect(processingMessage.textContent.trim()).toBe('processing');
    });

    it('should not show an error message', () => {
      expect(directiveElement.querySelector('.upload-failure-message')).toBeFalsy();
    });

    describe('after three seconds', () => {
      beforeEach(() => {
        deferred.resolve(base64url);
        $timeout.flush(3800);
      });

      it('should not show the processing message', () => {
        expect(directiveElement.querySelector('.upload-processing-message')).toBeFalsy();
      });

      it('should not show the failure message', () => {
        expect(directiveElement.querySelector('.upload-failure-message')).toBeFalsy();
      });

      describe('after an additional 1.1 seconds', () => {
        beforeEach(() => {
          $timeout.flush(1100);
        });

        it('should not show the processing screen', () => {
          expect(dropTarget.classList).not.toContain('droppable-processing');
        });

        it('should show the success screen', () => {
          expect(dropTarget.classList).toContain('droppable-complete');
        });

        it('should use the supplied success message', () => {
          const successMessage = directiveElement.querySelector('.upload-success-message');
          expect(successMessage).toBeTruthy();
          expect(successMessage.textContent.trim()).toBe('success');
        });

        it('should trigger the onSuccess handler', () => {
          expect($scope.onSuccess).toHaveBeenCalled();
        });
      });
    });
  });

  /*
   * NOTE: We temporarily want to ignore httpOptions until a full solution is implemented
   * Currently httpOptions.url is a relative path, but needs to know its baseUrl
   * As this call will return a 404, stopping a user from continuing the flow.=
   */

  describe('when a file is dropped and we have http-options', function() {
    var deferred, mockFile, droppable;

    beforeEach(function() {
      var template = " \
        <tw-upload \
          name='myFile' \
          ng-model='ngModel' \
          on-success='onSuccess' \
          on-failure='onFailure' \
          processing-text='processing' \
          success-text='success'\
          failure-text='failure' \
          http-options='httpOptions'> \
        </tw-upload>";

      $scope.httpOptions = {
        idProperty: 'id',
        url: 'https://www.google.com',
        method: 'POST',
        param: 'myFile',
        headers: {}
      };

      $scope.ngModel = null;
      $scope.onSuccess = jest.fn();
      $scope.onFailure = jest.fn();

      deferred = $q.defer();
      jest.spyOn(AsyncFileSaver, 'save').mockReturnValue(deferred.promise);
      jest.spyOn(AsyncFileReader, 'read').mockReturnValue($q.when(base64url));

      directiveElement = getCompiledDirectiveElement($scope, template);
      droppable = directiveElement.querySelector('.droppable');

      mockFile = { size: 2 };

      var fakeDropEvent = new CustomEvent('drop');
      fakeDropEvent.dataTransfer = { files : [ mockFile ] };
      droppable.dispatchEvent(fakeDropEvent);
    });

    it('should send the file to the asyncFileSaver', function() {
      expect(AsyncFileSaver.save).toHaveBeenCalledWith(
        'myFile', mockFile, $scope.httpOptions, base64url
      );
    });

    it('should show the processing screen', function() {
      expect(droppable.classList).toContain('droppable-processing');
    });

    describe('when the timer has elapsed, but the API has not responded', function() {
      beforeEach(function() {
        $timeout.flush(4100);
      });

      it('should continue to show the processing screen', function() {
        expect(droppable.classList).toContain('droppable-processing');
      });

      it('should not call the onSuccess message', function() {
        expect($scope.onSuccess).not.toHaveBeenCalled();
      });
    });

    describe('when the timer has elapsed and the request was resolved', function() {
      beforeEach(function() {
        var asyncResponse = { data: { id: 1234 } };
        deferred.resolve(asyncResponse);
        $timeout.flush(4100);
      });

      it('should not show the processing screen', function() {
        expect(droppable.classList).not.toContain('droppable-processing');
      });

      it('should show the complete screen', function() {
        expect(droppable.classList).toContain('droppable-complete');
      });

      it('should show the success message', function() {
        expect(directiveElement.querySelector('.upload-success-message')).toBeTruthy();
      });

      it('should extract the id from the response and bind to the model', function() {
        expect($scope.ngModel).toBe(1234);
      });

      it('should call the onSuccess handler', function() {
        expect($scope.onSuccess).toHaveBeenCalled();
      });
    });

    describe('when the timer has elapsed and the request failed', function() {
      beforeEach(function() {
        deferred.reject({ status:500 });
        $timeout.flush(4200);
      });

      it('should not remain on the processing screen', function() {
        expect(droppable.classList).toContain('droppable-processing');
      });

      it('should not show the complete screen', function() {
        expect(droppable.classList).not.toContain('droppable-complete');
      });

      it('should show the failure message', function() {
        expect(directiveElement.querySelector('.upload-failure-message')).toBeTruthy();
      });

      it('should NOT bind base64url to the model', function() {
        expect($scope.ngModel).not.toBe(base64url);
      });

      it('should NOT call the onSuccess handler', function() {
        expect($scope.onSuccess).not.toHaveBeenCalled();
      });

      it('should call the onFailure handler', function() {
        expect($scope.onFailure).toHaveBeenCalled();
      });
    });
  });

  describe('when the dropped file is too large', () => {
    beforeEach(() => {
      const template = " \
        <tw-upload \
          too-large-message='File is too large' \
          on-failure='onFailure' \
          max-size='1'> \
        </tw-upload>";

      $scope.onFailure = jest.fn();

      directiveElement = getCompiledDirectiveElement($scope, template);
      const droppable = directiveElement.querySelector('.droppable');

      const fakeDropEvent = new CustomEvent('drop'); // file drop can be mocked
      fakeDropEvent.dataTransfer = { files: [{ size: 2 }] };
      droppable.dispatchEvent(fakeDropEvent);

      // after 4.1s the flow is finished
      $timeout.flush(4100);
    });

    it('should show an error message', () => {
      const errorCard = directiveElement.querySelector('.droppable-processing-card');
      expect(errorCard.textContent.trim()).toBe('File is too large');
    });

    it('should trigger the onFailure handler', () => {
      expect($scope.onFailure).toHaveBeenCalled();
    });
  });

  function getCompiledDirectiveElement($scope, template) {
    if (!template) {
      template = " \
        <tw-upload \
          title='Drag and drop here' \
          button-text='or click here' \
          placeholder='please choose' \
          on-upload='uploadFunction' \
          ng-accept='csv'> \
        </tw-upload>";
    }
    const element = angular.element(template);
    // append to document so we can test document.activeElement
    angular.element(document.body).append(element);
    const compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
