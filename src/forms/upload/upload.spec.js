
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
      AsyncTasksConfig = $injector.get('AsyncTasksConfig');
    });
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
      $scope.onStart = jasmine.createSpy('onStart');
      $scope.onSuccess = jasmine.createSpy('onSuccess');
      $scope.onFailure = jasmine.createSpy('onFailure');
      $scope.onCancel = jasmine.createSpy('onCancel');

      deferred = $q.defer();
      spyOn(AsyncFileReader, 'read').and.returnValue(deferred.promise);

      directiveElement = getCompiledDirectiveElement($scope, template);

      const fakeDropEvent = new CustomEvent('drop'); // file drop can be mocked
      fakeDropEvent.dataTransfer = { files: [{ size: 2 }] };
      directiveElement.dispatchEvent(fakeDropEvent);

      dropTarget = directiveElement.querySelector('.droppable');
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
      expect(processingMessage.innerText.trim()).toBe('processing');
    });

    it('should not show the other messages', () => {
      expect(directiveElement.querySelector('.upload-success-message')).toBeFalsy();
      expect(directiveElement.querySelector('.upload-failure-message')).toBeFalsy();
    });

    describe('after three seconds', () => {
      beforeEach(() => {
        deferred.resolve(base64url);
        $timeout.flush(3000);
      });

      it('should display the success message', () => {
        const successMessage = directiveElement.querySelector('.upload-success-message');
        expect(successMessage).toBeTruthy();
        expect(successMessage.innerText.trim()).toBe('success');
      });

      it('should use the supplied success message', () => {
        const successMessage = directiveElement.querySelector('.upload-success-message');
        expect(successMessage.innerText.trim()).toBe('success');
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

        it('should trigger the onSuccess handler', () => {
          expect($scope.onSuccess).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when a file is dropped and we have uploadingText', () => {
    let dropTarget;
    let deferred;
    let template;

    beforeEach(() => {
      template = `
        <tw-upload
          too-large-message='File is too large'
          uploading-text='uploading'
          on-start='onStart'
          on-success='onSuccess'
          on-failure='onFailure'
          on-cancel='onCancel'
          max-size='10'>
        </tw-upload>`;

      // Create spies for callbacks
      $scope.onStart = jasmine.createSpy('onStart');
      $scope.onSuccess = jasmine.createSpy('onSuccess');
      $scope.onFailure = jasmine.createSpy('onFailure');
      $scope.onCancel = jasmine.createSpy('onCancel');

      deferred = $q.defer();
      spyOn(AsyncFileReader, 'read').and.returnValue(deferred.promise);

      directiveElement = getCompiledDirectiveElement($scope, template);

      const fakeDropEvent = new CustomEvent('drop'); // file drop can be mocked
      fakeDropEvent.dataTransfer = { files: [{ size: 2 }] };
      directiveElement.dispatchEvent(fakeDropEvent);

      dropTarget = directiveElement.querySelector('.droppable');
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

    it('should show the uploading message', () => {
      const uploadingMessage = directiveElement.querySelector('.uploading-message');
      expect(uploadingMessage).toBeTruthy();
      expect(uploadingMessage.innerText.trim()).toBe('uploading');
    });

    describe('after three seconds', () => {
      beforeEach(() => {
        deferred.resolve(base64url);
        $timeout.flush(3000);
      });

      it('should still display the uploading message', () => {
        const uploadingMessage = directiveElement.querySelector('.uploading-message');
        expect(uploadingMessage).toBeTruthy();
        expect(uploadingMessage.innerText.trim()).toBe('uploading');
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
        headers: {}
      };

      $scope.ngModel = null;
      $scope.onSuccess = jasmine.createSpy('onSuccess');
      $scope.onFailure = jasmine.createSpy('onFailure');

      deferred = $q.defer();
      spyOn(AsyncFileSaver, 'save').and.returnValue(deferred.promise);
      spyOn(AsyncFileReader, 'read').and.returnValue($q.when(base64url));

      directiveElement = getCompiledDirectiveElement($scope, template);

      mockFile = { size: 2 };

      var fakeDropEvent = new CustomEvent('drop');
      fakeDropEvent.dataTransfer = { files : [ mockFile ] };
      directiveElement.dispatchEvent(fakeDropEvent);

      droppable = directiveElement.querySelector('.droppable');
    });

    it('should send the file to the asyncFileSaver', function() {
      expect(AsyncFileSaver.save).toHaveBeenCalledWith(
        'myFile', mockFile, $scope.httpOptions
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
        $timeout.flush(4100);
      });

      it('should not show the processing screen', function() {
        expect(droppable.classList).not.toContain('droppable-processing');
      });

      it('should show the complete screen', function() {
        expect(droppable.classList).toContain('droppable-complete');
      });

      it('should not show the failure message', function() {
        expect(directiveElement.querySelector('.upload-failure-message')).toBeFalsy();
      });

      it('should bind base64url to the model', function() {
        expect($scope.ngModel).toBe(base64url);
      });

      it('should call the onSuccess handler', function() {
        expect($scope.onSuccess).toHaveBeenCalled();
      });

      it('should call not the onFailure handler', function() {
        expect($scope.onFailure).not.toHaveBeenCalled();
      });
    });

    describe('when the timer has elapsed and the request returns 422', function() {
      beforeEach(function() {
        deferred.reject({
          status: 422,
          data: { message: "Sorry, unreadable", errors: ["Too blurry"] }
        });
        $timeout.flush(4100);
      });

      it('should not show the processing screen', function() {
        expect(droppable.classList).not.toContain('droppable-processing');
      });

      it('should show the complete screen', function() {
        expect(droppable.classList).toContain('droppable-complete');
      });

      it('should show the failure message', function() {
        expect(directiveElement.querySelector('.upload-failure-message')).toBeTruthy();
      });

      it('should not bind anything to the model', function() {
        expect($scope.ngModel).toBe(null);
      });

      it('should not call the onSuccess handler', function() {
        expect($scope.onSuccess).not.toHaveBeenCalled();
      });

      it('should call the onFailure handler', function() {
        expect($scope.onFailure).toHaveBeenCalled();
      });
    });
  });

  describe('when a transcluded success screen is supplied', () => {
    beforeEach(() => {
      $scope.onUpload = function () {};
      const template = " \
        <tw-upload \
          title='Drag and drop here' \
          button-text='or click here' \
          placeholder='please choose' \
          on-upload='onUpload' \
          ng-accept='csv'> \
          <a class='transcluded-content'></a> \
        </tw-upload>";
      directiveElement = getCompiledDirectiveElement($scope, template);
    });
    it('should render the transcluded content', () => {
      const transcluded = directiveElement.querySelector('.transcluded-content');
      expect(transcluded).toBeTruthy();
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

      $scope.onFailure = jasmine.createSpy('onFailure');

      directiveElement = getCompiledDirectiveElement($scope, template);

      const fakeDropEvent = new CustomEvent('drop'); // file drop can be mocked
      fakeDropEvent.dataTransfer = { files: [{ size: 2 }] };
      directiveElement.dispatchEvent(fakeDropEvent);

      // after 4.1s the flow is finished
      $timeout.flush(4100);
    });

    it('should show an error message', () => {
      const completeCard = directiveElement.querySelector('.droppable-complete-card');
      expect(completeCard.innerText.trim()).toBe('File is too large');
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
