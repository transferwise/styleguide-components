(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twFileInput', TwFileInputDirective)
		.controller('twUploadController', TwUploadController)
		.directive('twUpload', TwUploadDirective);

	function TwUploadDirective() {
		return {
			bindToController: true,
			controller: [
				'$timeout',
				'$element',
				'$http',
				'$scope',
				'$transclude',
				'$q',
				'$attrs',
				TwUploadController
			],
			controllerAs: '$ctrl',
			replace: false,
			transclude: true,
			restrict: 'E',
			scope: {
				ngModel: '=',
				name: '@',
				icon: '@',
				description: '@',
				instructions: '@',
				buttonText: '@',
				cancelText: '@',
				droppingText: '@',
				processingText: '@',
				successText: '@',
				failureText: '@',
				completeText: '@',
				errorMessage: '@',
				tooLargeMessage: '@',
				//wrongTypeText: '@',
				size: '@',
				accept: '@',
				httpOptions: '=',
				onStart: '=',
				onSuccess: '=',
				onFailure: '=',
				onCancel: '=',
				maxSize: '='
			},
			link: twUploadLink,
			template:
			'<div class="droppable" ng-class="{ \
					\'droppable-sm\': $ctrl.size === \'sm\', \
					\'droppable-md\': $ctrl.size === \'md\' || !$ctrl.size, \
					\'droppable-lg\': $ctrl.size === \'lg\', \
					\'droppable-default\': !$ctrl.isDone && !$ctrl.isCapture && !$ctrl.isProcessing && !$ctrl.isSuccess && !$ctrl.isError, \
					\'droppable-dropping\': $ctrl.isDroppable, \
					\'droppable-capture\': $ctrl.isCapture, \
					\'droppable-capture-preview\': $ctrl.isCapturePreview, \
					\'droppable-processing\': !$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError), \
					\'droppable-complete\': $ctrl.isDone \
				}"> \
				<div class="droppable-content"> \
					<div class="droppable-default-card droppable-card" aria-hidden="{{$ctrl.isDone}}"> \
						<div class="droppable-card-content"> \
							<div class="m-b-2 m-t-3"> \
								<i class="icon icon-{{$ctrl.viewIcon}} icon-xxl"></i> \
							</div> \
							<h4 class="m-b-1" ng-if="$ctrl.description">{{$ctrl.description}}</h4> \
							<p class="m-b-2">{{$ctrl.instructions}}</p> \
							<div class="btn-group m-b-3"> \
								<label class="btn btn-primary m-b-2"> \
									<i class="icon icon-pdf"></i>{{$ctrl.buttonText}} \
									<input tw-file-select type="file" capture="camera" \
										accept="{{$ctrl.accept}}"" class="tw-droppable-input hidden" name="file-upload" \
										on-user-input="$ctrl.onManualUpload" ng-model="$ctrl.inputFile"/> \
								</label> \
								<button type="button" class="btn btn-primary" \
									ng-click="$ctrl.beginCapture()" \
									ng-if="$ctrl.isWebcamSupported"> \
									<i class="icon icon-camera m-r-0"></i> \
								</button> \
							</div> \
						</div> \
					</div> \
					<div class="droppable-capture-card droppable-card" \
						aria-hidden="{{$ctrl.isCapture}}"> \
						<div class="droppable-card-content" ng-if="$ctrl.webcamActivated"> \
							<div class="tw-dropppable-responsive-video"> \
								<div class="embed-responsive embed-responsive-4by3"> \
								<webcam channel="$ctrl.webcamChannel" \
									on-streaming="$ctrl.onWebcamSuccess()" \
									on-error="$ctrl.onWebcamError(error)" \
									on-stream="$ctrl.onStream(stream)"></webcam> \
								</div> \
							</div> \
							<button class="btn btn-primary m-t-2" type="button" ng-click="$ctrl.captureWebcam()"> \
								<i class="icon icon-camera m-r-0"></i> \
							</button> \
							<canvas class="tw-droppable-preview hidden" width="800" height="600"></canvas> \
						</div> \
					</div> \
					<div class="droppable-processing-card droppable-card" \
						aria-hidden="{{$ctrl.isDone}}"> \
						<div class="droppable-card-content"> \
							<h4 class="m-b-2"> \
								<span ng-if="$ctrl.isProcessing && $ctrl.processingText">{{$ctrl.processingText}}</span> \
								<span ng-if="$ctrl.isSuccess && $ctrl.successText">{{$ctrl.successText}}</span> \
								<span ng-if="$ctrl.isError && $ctrl.failureText">{{$ctrl.failureText}}</span> \
							</h4> \
							<tw-process size="sm" state="$ctrl.processingState" \
								ng-if="($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"></tw-process> \
							<div class="circle circle-sm m-b-1" \
								ng-if="!($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"></div> \
						</div> \
					</div> \
					<div class="droppable-complete-card droppable-card" \
						aria-hidden="{{!$ctrl.isDone}}"> \
						<div class="droppable-card-content">	\
							<div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError"> \
								<h4 class="m-b-2" ng-if="$ctrl.completeText">{{$ctrl.completeText}}</h4> \
								<img ng-src="{{$ctrl.image}}" ng-if="$ctrl.isImage" class="thumbnail m-b-3" /> \
								<i class="icon icon-pdf icon-xxl" ng-if="!$ctrl.isImage"></i> \
								<p class="text-ellipsis m-b-2" ng-if="$ctrl.fileName">{{$ctrl.fileName}}</p> \
							</div> \
							<div ng-if="!$ctrl.hasTranscluded && $ctrl.isError"> \
								<h4 class="m-b-2" ng-if="$ctrl.isTooLarge">{{$ctrl.tooLargeMessage}}</h4> \
								<h4 class="m-b-2" ng-if="$ctrl.isWrongType">{{$ctrl.wrongTypeText}}</h4> \
								<h4 class="m-b-2" ng-if="!$ctrl.isTooLarge && $ctrl.errorMessage">{{$ctrl.errorMessage}}</h4> \
								<i class="icon icon-alert icon-xxl text-danger m-b-1"></i> \
							</div> \
							<div ng-if="$ctrl.hasTranscluded" ng-transclude></div> \
							<p ng-if="$ctrl.cancelText" class="m-t-2 m-b-0"> \
								<a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a> \
							</p> \
						</div> \
					</div> \
				</div> \
				<div class="droppable-dropping-card droppable-card"> \
					<div class="droppable-card-content"> \
						<h4 class="m-b-2" ng-if="$ctrl.droppingText">{{$ctrl.droppingText}}</h4> \
						<div class="circle circle-sm m-b-0"> \
							<i class="icon icon-add"></i> \
						</div> \
					</div> \
				</div> \
			</div>'
		};
	}

	function TwUploadController(
		$timeout,
		$element,
		$http,
		$scope,
		$transclude,
		$q,
		$attrs)
	{
		var $ctrl = this;
		var asyncPromise;
		var isImage = false;

		$ctrl.webcamActivated = false;
		$ctrl.dragCounter = 0;
		$ctrl.isProcessing = false;

		$ctrl.processingState = null;
		$ctrl.isWebcamSupported = isWebcamSupported();

		checkForTranscludedContent($transclude, $ctrl);

		$scope.$watch('$ctrl.icon', function() {
			$ctrl.viewIcon = $ctrl.icon ? $ctrl.icon : 'upload';
		});

		if (($ctrl.droppingText || $ctrl.processingText || $ctrl.successText || $ctrl.failureText) &&
				(!$ctrl.droppingText || !$ctrl.processingText || !$ctrl.successText || !$ctrl.failureText)) {
			throw new Error('Supply all of drop, processing, success, and failure text, or supply none.');
		}

		$ctrl.onManualUpload = function() {
			var file = angular.element(
				$element[0].querySelector('.tw-droppable-input')
			)[0].files[0];

			$ctrl.fileDropped(file);
		};

		$ctrl.fileDropped = function(file) {
			console.log(file);
			reset();

			isImage = (file.type && file.type.indexOf('image') > -1);
			$ctrl.fileName = file.name;

			$ctrl.isProcessing = true;
			$ctrl.processingState = null;

			triggerHandler($ctrl.onStart, file);

			if (!isSizeValid(file, $ctrl.maxSize)) {
				$ctrl.isTooLarge = true;
				asyncFailure({
					status: 413,
					statusText: 'Request Entity Too Large'
				});
				return;
			}

			if (!isTypeValid(file, $ctrl.accept)) {
				$ctrl.isWrongType = true;
				asyncFailure({
					status: 415,
					statusText: 'Unsupported Media Type'
				});
				return;
			}

			if ($ctrl.httpOptions) {
				// Post file now
				$q.all([
						asyncPost(file),
						asyncFileRead(file)
					])
					.then(function(response) {
						showDataImage(response[1]);
					})
					.then(asyncSuccess)
					.catch(asyncFailure);
			} else {
				// Post on form submit
				asyncFileRead(file)
					.then(showDataImage)
					.then(asyncSuccess)
					.catch(asyncFailure);
			}
		};

		$ctrl.onDragChange = function(enter) {
			if (enter) {
				$ctrl.dragCounter++;
				if ($ctrl.dragCounter >= 1) {
					$ctrl.isDroppable = true;
				}
			} else {
				$ctrl.dragCounter--;
				if ($ctrl.dragCounter <= 0) {
					$ctrl.isDroppable = false;
				}
			}
		};

		$ctrl.beginCapture = function() {
			reset();
			$ctrl.isCapture = true;
			$ctrl.webcamActivated = true;
		};

		$ctrl.captureWebcam = function() {
			reset();
			$ctrl.isImage = true;
			$ctrl.image = getImageData(videoObject);
			//$ctrl.isCapturePreview = true;
			$ctrl.isProcessing = true;
			$ctrl.processingState = null;

			// TODO client side validation. Perhaps refactor repetition
			if ($ctrl.httpOptions) {
				// TODO this sends as base64, perhaps we should send as binary?
				asyncPost($ctrl.image)
					.then(asyncSuccess)
					.catch(asyncFailure);
			} else {
				asyncSuccess();
			}
		};

		$ctrl.clear = function() {
			reset();
			triggerHandler($ctrl.onCancel);
		};

		function isWebcamSupported() {
			return navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia;
		}

		function reset() {
			$ctrl.isDroppable = false;
			$ctrl.isProcessing = false;
			$ctrl.isSuccess = false;
			$ctrl.isError = false;
			$ctrl.isCapture = false;
			$ctrl.isCapturePreview = false;
			$ctrl.dragCounter = 0;
			$ctrl.isDone = false;
			$ctrl.isTooLarge = false;
			$ctrl.isWrongType = false;
			$element[0].querySelector('input').value = null;
			setNgModel(null);
		}

		function setNgModel(value) {
			// If ngModel not assignable, we don't want to error.
			if (typeof $attrs.ngModel !== 'undefined') {
				var $ngModel = $element.controller('ngModel');
				if (!$ngModel.$setViewValue) {
					return;
				}
				$ngModel.$setViewValue(value);
			}
		}

		function asyncPost(file) {
			var formData = new FormData();
			formData.append($ctrl.name, file);

			var $httpOptions = prepareHttpOptions(angular.copy($ctrl.httpOptions));
			return $http.post($httpOptions.url, formData, $httpOptions);
		}

		function prepareHttpOptions($httpOptions) {
			if (!$httpOptions.url) {
				throw new Error('You must supply a URL to post image data asynchronously');
			}
			if (!$httpOptions.headers) {
				$httpOptions.headers = {};
			}
			if ($httpOptions.method) {
				delete $httpOptions.method;
			}

			$httpOptions.headers['Content-Type'] = undefined;
			$httpOptions.transformRequest = angular.identity;

			return $httpOptions;
		}

		function asyncFileRead(file) {
			var reader = new FileReader();
			var deferred = $q.defer();

			// When the reader finishes loading resolve the promise
			reader.onload = function(event) {
				deferred.resolve(event.target.result);
			};
			reader.onerror = function(event) {
				deferred.reject(event);
			};

			// Load the file
			reader.readAsDataURL(file);
			return deferred.promise;
		}

		function showDataImage(dataUrl) {
			setNgModel(dataUrl);
			// Only set isImage at this point to avoid trying to show another file type
			$ctrl.isImage = isImage;
			if (isImage) {
				$ctrl.image = dataUrl;
			}
		}

		function asyncSuccess(response) {
			// Start changing process indicator immediately
			$ctrl.processingState = 1;

			// Wait before updating text
			$timeout(function() {
				$ctrl.isProcessing = false;
				$ctrl.isSuccess = true;
			}, 3000);

			// Allow a small amount of extra time before notifying external handlers
			$timeout(function() {
				triggerHandler($ctrl.onSuccess, response);
				$ctrl.isDone = true;
			}, 3800);

			return response;
		}

		function asyncFailure(error) {
			// Start changing process indicator immediately
			$ctrl.processingState = -1;

			// Wait before updating text
			$timeout(function() {
				$ctrl.isProcessing = false;
				$ctrl.isError = true;
			}, 3000);

			// Allow a small amount of extra time before notifying external handlers
			$timeout(function() {
				triggerHandler($ctrl.onFailure, error);
				$ctrl.isDone = true;
			}, 4100);  //3500); TODO for some reason more time is needed

			return error;
		}

		function isSizeValid(file, maxSize) {
			return !(angular.isNumber(maxSize) && file.size > maxSize);
		}

		function isTypeValid(file, accept) {
			return true;
			// TODO validate file type
			// $ctrl.isWrongType = true;
		}


		var videoObject = null;

		$ctrl.videoSize = {x: 0, y: 0, width: 25, height: 25};

		// Setup a channel to receive a video property
		// with a reference to the video element
		// See the HTML binding in main.html
		$ctrl.webcamChannel = {};

		$ctrl.webcamError = false;

		$ctrl.onWebcamError = function(error) {
			console.log('error');
			$scope.$apply(
				function() {
				  $ctrl.webcamError = error;
				}
			);
		};

		$ctrl.onWebcamSuccess = function () {
			// The video element contains the captured camera data
			videoObject = $ctrl.webcamChannel.video;
			$scope.$apply(function() {
					$ctrl.videoSize.width = videoObject.width;
					$ctrl.videoSize.height = videoObject.height;
			});
		};

		$ctrl.onStream = function (stream) {
		// You could do something manually with the stream.
		};

		$ctrl.makeSnapshot = function() {
			$ctrl.image = getImageData(videoObject);
		};

		function getImageData(videoObject) {
			if (!videoObject) {
				return false;
			}
			var captureCanvas = document.querySelector('.tw-droppable-preview');
			if (!captureCanvas) {
				return;
			}

			captureCanvas.width = videoObject.width;
			captureCanvas.height = videoObject.height;
			var canvasContext = captureCanvas.getContext('2d');

			var imageData = getVideoData(
				$ctrl.videoSize.x, $ctrl.videoSize.y,
				$ctrl.videoSize.width, $ctrl.videoSize.height
			);
			canvasContext.putImageData(imageData, 0, 0);

			return captureCanvas.toDataURL();
		}

		var getVideoData = function getVideoData(x, y, width, height) {
			var hiddenCanvas = document.createElement('canvas');
			hiddenCanvas.width = videoObject.width;
			hiddenCanvas.height = videoObject.height;
			var canvasContext = hiddenCanvas.getContext('2d');
			canvasContext.drawImage(videoObject, 0, 0, videoObject.width, videoObject.height);
			return canvasContext.getImageData(x, y, width, height);
		};

		/**
		* This function could be used to send the image data
		* to a backend server that expects base64 encoded images.
		*
		* In this example, we simply store it in the scope for display.
		*/
		function sendSnapshotToServer(imgBase64) {
			$scope.snapshotData = imgBase64;
		}
	}

	function twUploadLink(scope, element, attr) {
		element[0].addEventListener('dragenter', function(event) {
			event.preventDefault();
			scope.$ctrl.onDragChange(true);
			scope.$apply();
		}, false);

		element[0].addEventListener('dragover', function(event) {
			event.preventDefault();
		}, false);

		element[0].addEventListener('dragleave', function(event) {
			event.preventDefault();
			scope.$ctrl.onDragChange(false);
			scope.$apply();
		}, false);

		element[0].addEventListener('drop', function(event) {
			event.preventDefault();
			scope.$ctrl.fileDropped(event.dataTransfer.files[0]);
			scope.$apply();
		}, false);
	}

	function triggerHandler(method, argument) {
		if (method && typeof method === 'function') {
			method(argument);
		}
	}

	function checkForTranscludedContent($transclude, $ctrl) {
		$transclude(function(clone) {
			if (clone.length > 1 || clone.text().trim() !== '') {
				$ctrl.hasTranscluded = true;
			}
		});
	}

	function TwFileInputDirective() {
		return {
			bindToController: true,
			controller: function() {},
			controllerAs: '$ctrl',
			replace: false,
			restrict: 'A',
			scope: {
				onUserInput: '='
			},
			link: TwFileInputLink
		};
	}

	function TwFileInputLink(scope, element) {
		element.on('change', function () {
			if (scope.$ctrl.onUserInput &&
					typeof scope.$ctrl.onUserInput === 'function') {
				scope.$ctrl.onUserInput();
			}
		});
	}
})(window.angular);
