(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twFileSelect', TwFileSelectDirective)
		.controller('TwUploadDroppableController', TwUploadDroppableController)
		.directive('twUploadDroppable', TwUploadDroppableDirective);

	function TwUploadDroppableDirective() {
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
				TwUploadDroppableController
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
			link: TwUploadDroppableLink,
			template:
			'<div class="droppable" ng-class="{ \
					\'droppable-sm\': $ctrl.size === \'sm\', \
					\'droppable-md\': $ctrl.size === \'md\' || !$ctrl.size, \
					\'droppable-lg\': $ctrl.size === \'lg\', \
					\'droppable-active\': $ctrl.isDroppable || $ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError, \
					\'droppable-dropping\': $ctrl.isDroppable \
				}"> \
				<div class="droppable-default" aria-hidden="{{$ctrl.isDone}}"> \
					<div class="m-b-2"> \
						<i class="icon icon-{{$ctrl.viewIcon}} icon-xxl"></i> \
					</div> \
					<h4 class="m-b-1" ng-if="$ctrl.description">{{$ctrl.description}}</h4> \
					<p class="m-b-2">{{$ctrl.instructions}}</p> \
					<label class="btn btn-primary">{{$ctrl.buttonText}} \
						<input tw-file-select type="file" \
							accept="{{$ctrl.accept}}"" class="tw-droppable-input hidden" name="file-upload" \
							on-user-input="$ctrl.onManualUpload" ng-model="$ctrl.inputFile"/> \
					</label> \
				</div> \
				<div class="droppable-active-cover" ng-class="{\'slide-out-to-left\': $ctrl.isDone}" aria-hidden="{{$ctrl.isDone}}"> \
					<div ng-if="$ctrl.isDroppable" ar> \
						<h4 class="m-b-2">Drop file to start upload</h4> \
						<div class="circle circle-sm"> \
							<i class="icon icon-add"></i> \
						</div> \
						<p class="m-t-2 m-b-0"></p> \
					</div> \
					<div ng-if="!$ctrl.isDroppable && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"> \
						<h4 class="m-b-2"> \
							<span ng-if="$ctrl.isProcessing && $ctrl.processingText">{{$ctrl.processingText}}</span> \
							<span ng-if="$ctrl.isSuccess && $ctrl.successText">{{$ctrl.successText}}</span> \
							<span ng-if="$ctrl.isError && $ctrl.failureText">{{$ctrl.failureText}}</span> \
						</h4> \
						<tw-process size="sm" state="$ctrl.processingState"></tw-process> \
					</div> \
				</div> \
				<div class="droppable-complete slide-in-from-right" ng-if="$ctrl.isDone" aria-hidden="{{!$ctrl.isDone}}" ng-class="{\'in\': $ctrl.isDone}"> \
					<div class="droppable-complete-content">	\
						<div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError"> \
							<h4 class="m-b-2" ng-if="$ctrl.completeText">{{$ctrl.completeText}}</h4> \
							<img ng-src="{{$ctrl.image}}" ng-if="$ctrl.isImage" class="thumbnail fade-in m-b-3" /> \
							<i class="icon icon-pdf icon-xxl" ng-if="!$ctrl.isImage"></i> \
							<p class="text-ellipsis m-b-2">{{$ctrl.fileName}}</p> \
						</div> \
						<div ng-if="!$ctrl.hasTranscluded && $ctrl.isError"> \
							<h4 class="m-b-2" ng-if="$ctrl.isTooLarge">{{$ctrl.tooLargeMessage}}</h4> \
							<h4 class="m-b-2" ng-if="$ctrl.isWrongType">{{$ctrl.wrongTypeText}}</h4> \
							<h4 class="m-b-2" ng-if="!$ctrl.isTooLarge && $ctrl.errorMessage">{{$ctrl.errorMessage}}</h4> \
							<i class="icon icon-alert icon-xxl text-danger m-b-1"></i> \
						</div> \
						<div ng-if="$ctrl.hasTranscluded" ng-transclude></div> \
						<p ng-if="$ctrl.cancelText" class="m-t-2 m-b-0 fade-in"> \
							<a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a> \
						</p> \
					</div> \
				</div> \
			</div>'
		};
	}

	function TwUploadDroppableController(
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

		$ctrl.dragCounter = 0;
		$ctrl.isProcessing = false;

		$ctrl.processingState = null;

		checkForTranscludedContent($transclude, $ctrl);

		$scope.$watch('$ctrl.icon', function() {
			$ctrl.viewIcon = $ctrl.icon ? $ctrl.icon : 'upload';
		});

		if (($ctrl.processingText || $ctrl.successText || $ctrl.failureText) &&
				(!$ctrl.processingText || !$ctrl.successText || !$ctrl.failureText)) {
			throw new Error('Supply all of processing, success, and failure text, or supply none.');
		}

		$ctrl.onManualUpload = function() {
			var file = angular.element(
				$element[0].querySelector('.tw-droppable-input')
			)[0].files[0];

			$ctrl.fileDropped(file);
		};

		$ctrl.fileDropped = function(file) {
			reset();

			$ctrl.isImage = (file.type && file.type.indexOf('image') > -1);
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

		$ctrl.clear = function() {
			reset();
			triggerHandler($ctrl.onCancel);
		};

		function reset() {
			$ctrl.isDroppable = false;
			$ctrl.isProcessing = false;
			$ctrl.isSuccess = false;
			$ctrl.isError = false;
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
				$ctrl.ngModel = value;
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
			$ctrl.image = dataUrl;
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
			}, 3500);

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
			}, 4000);  //3500); TODO for some reason more time is needed

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
	}

	function TwUploadDroppableLink(scope, element, attr) {
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

	function TwFileSelectDirective() {
		return {
			bindToController: true,
			controller: function() {},
			controllerAs: '$ctrl',
			replace: false,
			restrict: 'A',
			scope: {
				onUserInput: '='
			},
			link: TwFileSelectLink
		};
	}

	function TwFileSelectLink(scope, element) {
		element.on('change', function () {
			if (scope.$ctrl.onUserInput &&
					typeof scope.$ctrl.onUserInput === 'function') {
				scope.$ctrl.onUserInput();
			}
		});
	}
})(window.angular);
