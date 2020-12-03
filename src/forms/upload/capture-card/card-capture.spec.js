import screenfull from 'screenfull';

describe('given a Card Capture component', () => {
  let $scope, $compile, $component, $window, element, $q, component, controller, MediaApiService;

  const template = `
    <tw-upload-capture
      label="label"
      button-text="buttonText"
      placeholder="placeholder"
      is-live-camera-upload="isLiveCameraUpload"
      on-file-capture="onFileCapture(file)"
    ></tw-upload-capture>`;

  beforeEach(function () {
    angular.mock.module('tw.styleguide.forms.upload');

    inject(($injector) => {
      $compile = $injector.get('$compile');
      $window = $injector.get('$window');
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      MediaApiService = $injector.get('MediaApiService');
    })
  })

  describe('when initialised', () => {
    beforeEach(() => {
      $scope.onFileCapture = jest.fn();
      $scope.label = 'Front of your ID document';
      $scope.placeholder = 'files hould be less than 10MB';
      $scope.buttonText = 'Choose a file';

      jest.spyOn(MediaApiService, 'hasMediaUploadSupport').mockReturnValue(false);

      compileComponent();
    })

    it('should render an icon', () => {
      expect(component.querySelector('tw-icon')).toBeTruthy();
    });

    it('should render the label', () => {
      const label = compileTemplate(template).querySelector('h4.m-b-1');
      expect(label.textContent.trim()).toContain($scope.label);
    });

    it('should render the placeholder', () => {
      const placeholder = compileTemplate(template).querySelector('p.m-b-2');
      expect(placeholder.textContent.trim()).toContain($scope.placeholder);
    });

    it('should render an upload button', () => {
      expect(component.querySelector('tw-upload-button')).toBeTruthy();
    });

    it('should check for media upload support', () => {
      expect(MediaApiService.hasMediaUploadSupport).toHaveBeenCalled();
    })
  })

  describe('when isLiveCameraUpload is true and media upload is not supported', () => {
    beforeEach(() => {
      $scope.isLiveCameraUpload = true;

      $window.navigator.mediaDevices = {
        getUserMedia: jest.fn(() => $q.resolve({
          getTracks: jest.fn(() => [])
        })),
      }

      screenfull.request.mockImplementation(() => $q.resolve());
      HTMLMediaElement.prototype.play = jest.fn(() => $q.resolve());

      compileComponent();
    })

    it('should render a camera button', () => {
      expect(findCameraButton()).toBeTruthy();
    })

    it('should render camera capture when camera button is clicked', () => {
      findCameraButton().click();
      expect(component.querySelector('tw-camera-capture')).toBeTruthy();
    })
  })

  describe('when media upload is supported', () => {
    describe('when microapps is in window', () => {
      let deferred;

      beforeEach(() => {
        deferred = $q.defer();

        jest.spyOn(MediaApiService, 'hasMediaUploadSupport').mockReturnValue(true);
        jest.spyOn(MediaApiService, 'captureFromMedia').mockReturnValue(deferred.promise);
      })

      it('should render a camera button', () => {
        expect(findCameraButton()).toBeTruthy();
      })

      describe('when isLiveCameraUpload is true and camera button is clicked', () => {
        beforeEach(() => {
          $scope.isLiveCameraUpload = true;
          compileComponent();
          findCameraButton().click();
        })

        it('should call captureFromMedia from MediaApiService with true', () => {
          expect(MediaApiService.captureFromMedia).toHaveBeenCalledWith(true);
        })
      })

      describe('when isLiveCameraUpload is false and camera button is clicked', () => {
        beforeEach(() => {
          $scope.isLiveCameraUpload = false;
          compileComponent();
          findCameraButton().click();
        })

        it('should call captureFromMedia from MediaApiService with false', () => {
          expect(MediaApiService.captureFromMedia).toHaveBeenCalledWith(false);
        })
      })

      describe('when camera button is clicked', () => {
        beforeEach(() => {
          $scope.onFileCapture = jest.fn();

          compileComponent();
          findCameraButton().click();
        })

        describe('when captureFromMedia is successful', () => {
          const file = { size: 124, type: 'image/jpeg'};

          beforeEach(() => {
            deferred.resolve(file);
            $scope.$apply();
          })

          it('should call onFileCapture with resolved file', () => {
            expect($scope.onFileCapture).toHaveBeenCalledWith(file);
          })
        })

        describe('when captureFromMedia fails', () => {
          beforeEach(() => {
            deferred.reject({error: 'CANCELLED'});
            $scope.$apply();
          })

          it('should not call onFileCapture', () => {
            expect($scope.onFileCapture).not.toHaveBeenCalled();
          })
        })
      })
    })

    describe('when microapps is not in window', () => {
      it('should throw an error when calling captureFromMedia', () => {
        expect(() => MediaApiService.captureFromMedia(false)).toThrow('microapps must be available in window to use Spot Platform Media API');
      })
    })
  })

  function compileComponent() {
    element = angular.element(template);
    $component = $compile(element)($scope);
    $scope.$digest();
    controller = $component.controller('twUploadCapture');
    component = $component[0];
  }

  function compileTemplate(template) {
    return compileElement(angular.element(template))[0];
  }

  function compileElement(element) {
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }

  function findCameraButton() {
    return component.querySelector('tw-camera-button label');
  }
})
