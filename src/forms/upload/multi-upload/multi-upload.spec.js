describe("multi-upload", () => {
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

  const base64url =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCA" +
    "IAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcMEQwbn8bvgwAAAB1pV" +
    "Fh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAADElEQVQI12P4//8/AAX+" +
    "Av7czFnnAAAAAElFTkSuQmCC";

  beforeEach(() => {
    angular.mock.module("tw.styleguide.forms.upload.multi");

    angular.mock.inject($injector => {
      $rootScope = $injector.get("$rootScope");
      $compile = $injector.get("$compile");
      $scope = $rootScope.$new();
      $timeout = $injector.get("$timeout");
      $q = $injector.get("$q");
      AsyncFileReader = $injector.get("AsyncFileReader");
      AsyncFileSaver = $injector.get("AsyncFileSaver");
      FileValidationService = $injector.get("FileValidationService");
    });
  });

  describe("Given in initial state", () => {
    let dropTarget;
    let deferred;

    beforeEach(() => {
      const template =
        " \
            <tw-multi-upload \
                ng-change='ngChange()' \
                ng-model='ngModel' \
                on-start='onStart()' \
                on-finish='onFinish()' \
                on-failure='onFailure(error)'\
                response-error-extractor='responseErrorExtractor(error)'\
                processing-text='processing' \
                success-text='success'\
                failure-text='failure' \
                too-large-message='TOO LARGE!' \
                max-size='10'> \
            </tw-multi-upload>";

      $scope.ngModel = null;
      $scope.ngChange = jest.fn();
      $scope.onStart = jest.fn();
      $scope.onFinish = jest.fn();
      $scope.onFailure = jest.fn();
      $scope.responseErrorExtractor = jest.fn();

      deferred = $q.defer();
      jest.spyOn(AsyncFileReader, "read").mockReturnValue(deferred.promise);

      directiveElement = getCompiledDirectiveElement($scope, template);
    });

    it("should render the default screen", () => {
      expect(
        directiveElement.querySelector(".empty-processing-list")
      ).toBeTruthy();
      expect(directiveElement.querySelector(".processing-list")).toBeFalsy();
    });

    describe("On addition of new files", () => {
      describe("When file is processing", () => {
        beforeEach(() => {
          dropTarget = directiveElement.querySelector(".droppable");

          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 2 }, { size: 3 }] };
          dropTarget.dispatchEvent(fakeDropEvent);
        });

        it("renders the list of processing files", () => {
          expect(
            directiveElement.querySelector(".empty-processing-list")
          ).toBeFalsy();
          expect(
            directiveElement.querySelectorAll(".processing-item").length
          ).toBe(2);
        });

        it("calls onStart", () => {
          expect($scope.onStart).toHaveBeenCalled();
        });
      });

      describe("When it succeeds", () => {
        beforeEach(() => {
          dropTarget = directiveElement.querySelector(".droppable");

          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = {
            files: [
              { name: "one.jpg", size: 2 },
              { name: "two.png", size: 5 }
            ]
          };
          dropTarget.dispatchEvent(fakeDropEvent);

          deferred.resolve(base64url);
          $timeout.flush(3800);
        });

        it("returns the model with data urls", () => {
          expect($scope.ngModel).toEqual([base64url, base64url]);
        });

        it('triggers an ngChange for each addition to the model', () => {
          expect($scope.ngChange.mock.calls.length).toBe(2);
        });

        it("user can remove a file", () => {
          const firstFileRemoveButton = directiveElement.querySelectorAll(
            ".processing-item .close"
          )[0];

          firstFileRemoveButton.dispatchEvent(new CustomEvent("click"));

          expect(
            directiveElement.querySelectorAll(".processing-item").length
          ).toBe(1);
          expect(
            directiveElement.querySelector(".processing-item .file-name")
              .textContent
          ).toBe("two.png");
          expect($scope.ngModel).toEqual([base64url]);
          expect($scope.ngChange.mock.calls.length).toBe(3);
        });

        it("user can remove all files and return to the landing screen", () => {
          const removeButtons = directiveElement.querySelectorAll(
            ".processing-item .close"
          );

          removeButtons[0].dispatchEvent(new CustomEvent("click"));
          removeButtons[1].dispatchEvent(new CustomEvent("click"));

          expect($scope.ngModel).toEqual([]);
          expect(
            directiveElement.querySelector(".empty-processing-list")
          ).toBeTruthy();
          expect(
            directiveElement.querySelector(".processing-list")
          ).toBeFalsy();
        });

        it("calls onFinish", () => {
          expect($scope.onFinish).toHaveBeenCalled();
        });
      });

      describe("When it fails", () => {
        beforeEach(() => {
          dropTarget = directiveElement.querySelector(".droppable");

          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 2 }, { size: 5 }] };
          dropTarget.dispatchEvent(fakeDropEvent);
        });

        it("returns a model with NO data urls or IDs", () => {
          deferred.reject({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          });
          $timeout.flush(4500);

          expect($scope.ngModel).toBeNull;
        });

        it("calls onFinish", () => {
          deferred.reject({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          });
          $timeout.flush(4500);

          expect($scope.onFinish).toHaveBeenCalled();
        });

        it('calls onFailure', () => {
          deferred.reject({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          });
          $timeout.flush(4500);    

          expect($scope.onFailure).toHaveBeenCalledWith({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          })
        });

        it('calls responseErrorExtractor', () => {
          deferred.reject({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          });
          $timeout.flush(4500);    

          expect($scope.responseErrorExtractor).toHaveBeenCalledWith({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          })
        });

        it('displays the error message extracted by the responseErrorExtractor', () => {
          $scope.responseErrorExtractor.mockReturnValue('a random error');

          deferred.reject({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          });
          $timeout.flush(4500);

          const errorMessage = directiveElement.querySelector('.processing-item .media-body .tiny').textContent.trim();
          expect(errorMessage).toBe('a random error');
        });

        it('displays the failureText provided if a falsy value is returned from the responseErrorExtractor', () => {
          $scope.responseErrorExtractor.mockReturnValue(null);

          deferred.reject({
            status: 422,
            data: { message: "Sorry unreadable", errors: ["Too blurry"] }
          });
          $timeout.flush(4500);

          const errorMessage = directiveElement.querySelector('.processing-item .media-body .tiny').textContent.trim();
          expect(errorMessage).toBe('failure');
        });
      });

      describe('When it fails due to file being too large', () => {
        beforeEach(() => {
          $scope.responseErrorExtractor = (error) => {
            return error.data.message;
          };
          jest.spyOn(FileValidationService, 'isSmallerThanMaxSize').mockReturnValue(false);

          dropTarget = directiveElement.querySelector(".droppable");

          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 2 }, { size: 5 }] };
          dropTarget.dispatchEvent(fakeDropEvent);
        });

        it('displays the too large message', () => {
          deferred.reject({
            status: 500,
            data: {}
          });

          $timeout.flush(4500);

          const errorMessage = directiveElement.querySelector('.processing-item .media-body .tiny').textContent.trim();

          expect(errorMessage).toBe('TOO LARGE!');
        });
      });
    });
  });

  describe("When user has files being processed", () => {
    let dropTarget;
    let deferred;
    let asyncFileReaderSpy;

    beforeEach(() => {
      const template =
        " \
        <tw-multi-upload \
            ng-model='ngModel' \
            on-start='onStart()' \
            on-finish='onFinish()' \
            processing-text='processing' \
            success-text='success'\
            failure-text='failure' \
            max-size='10'> \
        </tw-multi-upload>";

      $scope.ngModel = null;
      $scope.onStart = jest.fn();
      $scope.onFinish = jest.fn();

      deferred = $q.defer();
      asyncFileReaderSpy = jest.spyOn(AsyncFileReader, "read").mockReturnValue(
        deferred.promise
      );

      directiveElement = getCompiledDirectiveElement($scope, template);

      dropTarget = directiveElement.querySelector(".droppable");

      const fakeDropEvent = new CustomEvent("drop");
      fakeDropEvent.dataTransfer = {
        files: [{ size: 2 }, { size: 5 }, { size: 1 }]
      };
      dropTarget.dispatchEvent(fakeDropEvent);
      deferred.resolve(base64url);

      $timeout.flush(2000);
    });

    it("shows processing items in the list", () => {
      expect(
        directiveElement.querySelector(".empty-processing-list")
      ).toBeFalsy();
      expect(directiveElement.querySelectorAll(".processing-item").length).toBe(
        3
      );
    });

    it("calls onStart", () => {
      expect($scope.onStart).toHaveBeenCalled();
    });

    it("returns an empty model", () => {
      expect($scope.ngModel).toEqual(null);
    });

    describe("on addition of new files", () => {
      describe("processing", () => {
        beforeEach(() => {
          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 1 }, { size: 1 }] };

          dropTarget.dispatchEvent(fakeDropEvent);
        });

        it("does NOT call onStart again", () => {
          expect($scope.onStart.mock.calls.length).toBe(1);
        });
      });

      describe("success for first batch", () => {
        beforeEach(() => {
          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 1 }, { size: 1 }] };

          dropTarget.dispatchEvent(fakeDropEvent);

          $timeout.flush(3000);
        });

        it("does NOT call onFinish", () => {
          expect($scope.onFinish).not.toHaveBeenCalled();
        });

        it("returns a model with only the data urls from the first batch", () => {
          expect($scope.ngModel).toEqual([base64url, base64url, base64url]);
        });
      });

      describe("success on all files", () => {
        beforeEach(() => {
          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 1 }, { size: 1 }] };

          dropTarget.dispatchEvent(fakeDropEvent);

          $timeout.flush(5000);
        });

        it("calls onFinish", () => {
          expect($scope.onFinish).toHaveBeenCalled();
        });

        it("returns a model with all data urls", () => {
          expect($scope.ngModel).toEqual([
            base64url,
            base64url,
            base64url,
            base64url,
            base64url
          ]);
        });

        describe('when the user clicks cancel on file browser', () => {
          beforeEach(() => {
            const fakeDropEvent = new CustomEvent("drop");

            // simulate cancel
            fakeDropEvent.dataTransfer = { files: [] };
  
            dropTarget.dispatchEvent(fakeDropEvent);
  
            $timeout.flush(5000);      
          });

          it('calls onStart once from previous drop event ONLY', () => {
            expect($scope.onStart.mock.calls.length).toBe(1);
          });
        });
      });
    });
  });

  describe("user already has processed files", () => {
    let dropTarget;
    let deferred;
    let asyncFileReaderSpy;

    beforeEach(() => {
      const template =
        " \
        <tw-multi-upload \
            ng-model='ngModel' \
            on-start='onStart()' \
            on-finish='onFinish()' \
            processing-text='processing' \
            success-text='success'\
            failure-text='failure' \
            max-size='10'> \
        </tw-multi-upload>";

      $scope.ngModel = null;
      $scope.onStart = jest.fn();
      $scope.onFinish = jest.fn();

      deferred = $q.defer();
      asyncFileReaderSpy = jest.spyOn(AsyncFileReader, "read").mockReturnValue(
        deferred.promise
      );

      directiveElement = getCompiledDirectiveElement($scope, template);

      dropTarget = directiveElement.querySelector(".droppable");

      const fakeDropEvent = new CustomEvent("drop");
      fakeDropEvent.dataTransfer = {
        files: [{ size: 2 }, { size: 5 }, { size: 1 }]
      };
      dropTarget.dispatchEvent(fakeDropEvent);
      deferred.resolve(base64url);

      $timeout.flush(3800);
    });

    it("should be in the processing screen", () => {
      expect(
        directiveElement.querySelector(".empty-processing-list")
      ).toBeFalsy();
      expect(directiveElement.querySelectorAll(".processing-item").length).toBe(
        3
      );
      expect($scope.ngModel).toEqual([base64url, base64url, base64url]);
    });

    describe("on addition of new files", () => {
      describe("When files are processing", () => {
        beforeEach(() => {
          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 1 }, { size: 1 }] };

          dropTarget.dispatchEvent(fakeDropEvent);
        });

        it("does NOT return the processing items in the model", () => {
          expect($scope.ngModel).toEqual([base64url, base64url, base64url]);
        });

        it("calls onStart", () => {
          expect($scope.onStart.mock.calls.length).toBe(2);
        });
      });

      describe("When it succeeds", () => {
        beforeEach(() => {
          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 1 }, { size: 1 }] };

          dropTarget.dispatchEvent(fakeDropEvent);

          $timeout.flush(3800);
        });

        it("returns the recently processed items in the model", () => {
          expect($scope.ngModel).toEqual([
            base64url,
            base64url,
            base64url,
            base64url,
            base64url
          ]);
        });

        it("calls onFinish", () => {
          expect($scope.onFinish.mock.calls.length).toBe(2);
        });
      });

      describe("When it fails", () => {
        beforeEach(() => {
          const rejectedDeferred = $q.defer();
          asyncFileReaderSpy.mockReturnValue(rejectedDeferred.promise);
          rejectedDeferred.reject({ error: "an error" });
          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [{ size: 1 }, { size: 1 }] };

          dropTarget.dispatchEvent(fakeDropEvent);
          $timeout.flush(4500);
        });

        it("returns a model with the data urls from the first successful upload", () => {
          expect($scope.ngModel).toEqual([base64url, base64url, base64url]);
        });

        it("calls onFinish", () => {
          expect($scope.onFinish.mock.calls.length).toBe(2);
        });
      });
    });
  });

  describe("httpOptions set to true", () => {
    let dropTarget;
    let deferred;

    beforeEach(() => {
      const template =
        " \
            <tw-multi-upload \
                ng-model='ngModel' \
                on-start='onStart()' \
                on-finish='onFinish()' \
                processing-text='processing' \
                success-text='success'\
                failure-text='failure' \
                http-options='httpOptions' \
                max-size='10'> \
            </tw-multi-upload>";

      $scope.httpOptions = {
        idProperty: "id",
        url: "https://www.google.com",
        method: "POST",
        param: "myFile",
        headers: {}
      };

      $scope.ngModel = null;
      $scope.onStart = jest.fn();
      $scope.onFinish = jest.fn();

      deferred = $q.defer();
      jest.spyOn(AsyncFileSaver, "save").mockReturnValue(deferred.promise);
      jest.spyOn(AsyncFileReader, "read").mockReturnValue($q.when(base64url));

      directiveElement = getCompiledDirectiveElement($scope, template);
    });

    describe("on addition of new files", () => {
      const fileA = { name: "a.png", size: 2 };
      const fileB = { name: "b.pdf", size: 3 };

      describe("When it succeeds", () => {
        beforeEach(() => {
          const asyncResponse = { data: { id: 1234 } };
          deferred.resolve(asyncResponse);

          dropTarget = directiveElement.querySelector(".droppable");

          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [fileA, fileB] };
          dropTarget.dispatchEvent(fakeDropEvent);

          $timeout.flush(3800);
        });

        it("makes requests to save against the provided httpOptions", () => {
          expect(AsyncFileSaver.save).toHaveBeenCalledWith(
            "myFile",
            fileA,
            $scope.httpOptions,
            "file.png"
          );
          expect(AsyncFileSaver.save).toHaveBeenCalledWith(
            "myFile",
            fileB,
            $scope.httpOptions,
            "file.png"
          );
        });

        it("returns a model with the IDs returned from the response", () => {
          expect($scope.ngModel).toEqual([1234, 1234]);
        });
      });

      describe("When it fails", () => {
        beforeEach(function() {
          deferred.reject({ status: 500 });
          dropTarget = directiveElement.querySelector(".droppable");

          const fakeDropEvent = new CustomEvent("drop");
          fakeDropEvent.dataTransfer = { files: [fileA, fileB] };
          dropTarget.dispatchEvent(fakeDropEvent);

          $timeout.flush(4100);
        });

        it("makes requests to save against the provided httpOptions", () => {
          expect(AsyncFileSaver.save).toHaveBeenCalledWith(
            "myFile",
            fileA,
            $scope.httpOptions,
            "file.png"
          );
          expect(AsyncFileSaver.save).toHaveBeenCalledWith(
            "myFile",
            fileB,
            $scope.httpOptions,
            "file.png"
          );
        });

        it("returns a model with NO IDs", () => {
          expect($scope.ngModel).toEqual(null);
        });
      });
    });
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
