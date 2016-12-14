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
			controller: ['$timeout', '$element', '$http', TwUploadDroppableController],
			controllerAs: '$ctrl',
			replace: false,
			transclude: true,
			restrict: 'E',
			scope: {
				defaultText: '@',
				processingText: '@',
				completeText: '@',
				errorText: '@',
				buttonText: '@',
				size: '@',
				accept: '@',
				onDrop: '=',
				onSuccess: '=',
				onFailure: '=',
				postUrl: '@',
				controlName: '@',

				getImageUrlFrom: '&',
				image: '=',
				showTranscluded: '='

			},
			link: TwUploadDroppableLink,
			template:
			'<div class="droppable" ng-class="{ \
					\'droppable-sm\': $ctrl.size === \'sm\', \
					\'droppable-md\': $ctrl.size === \'md\' || !$ctrl.size, \
					\'droppable-lg\': $ctrl.size === \'lg\', \
					\'droppable-active\': $ctrl.isDroppable || $ctrl.isProcessing || $ctrl.isDone || $ctrl.isError, \
					\'droppable-dropping\': $ctrl.isDroppable \
				}"> \
				<div class="m-b-2"> \
					<i class="icon icon-upload icon-xxl"></i> \
				</div> \
				<p class="m-b-2">{{$ctrl.defaultText}}</p> \
				<button class="btn btn-primary">{{$ctrl.buttonText}}</button> \
				<input tw-file-select type="file" \
					accept={{$ctrl.accept}} class="tw-droppable-input hidden" name="file-upload" \
					on-user-input="$ctrl.onManualUpload"/> \
				<div class="droppable-active-cover" ng-class="{\'slide-out-to-left\': $ctrl.showTranscluded}"> \
					<div ng-if="$ctrl.isDroppable"> \
						<h4 class="m-b-2">Drop file to start upload</h4> \
						<div class="circle circle-sm"> \
							<i class="icon icon-add"></i> \
						</div> \
						<p class="m-t-2 m-b-0"></p> \
					</div> \
					<div ng-if="!$ctrl.isDroppable && ($ctrl.isProcessing || $ctrl.isDone || $ctrl.isError)"> \
						<h4 class="m-b-2"> \
							<span ng-if="$ctrl.isProcessing">{{$ctrl.processingText}}</span> \
							<span ng-if="$ctrl.isDone">{{$ctrl.completeText}}</span> \
							<span ng-if="$ctrl.isError">{{$ctrl.errorText}}</span> \
						</h4> \
						<tw-process size="sm" state="$ctrl.processingState" ng-if="!$ctrl.image"></tw-process> \
						<!-- <p class="m-t-2 m-b-0"> \
							<a ng-show="$ctrl.isDone" href="" ng-click="$ctrl.clear()">Cancel</a> \
						</p> --> \
					</div> \
				</div> \
				<div class="droppable-transcluded slide-in-from-right" ng-if="$ctrl.showTranscluded"> \
					<div ng-transclude></div> \
				</div> \
			</div>'
		};
	}

	function TwUploadDroppableController($timeout, $element, $http) {
		var $ctrl = this;
		var asyncPromise;

		$ctrl.dragCounter = 0;
		$ctrl.isProcessing = false;

		$ctrl.processingState = 0;

		$ctrl.onManualUpload = function() {
			if ($ctrl.onSuccess &&
					typeof $ctrl.onSuccess === 'function') {

				var file = angular.element(
					$element[0].querySelector('.tw-droppable-input')
				)[0].files[0];

				$ctrl.onSuccess(file);
			}
		};

		$ctrl.fileDropped = function(file) {
			// TODO validate size, validate file type

			if ($ctrl.onDrop &&
				typeof $ctrl.onDrop === 'function') {
				$ctrl.onDrop(file);
			}

			$ctrl.isProcessing = true;
			$ctrl.isDroppable = false;
			$ctrl.dropCounter = 0;
			$ctrl.processingState = 0;

			var postAsync = true;

			if (postAsync) {
				// Post file now
				asyncPromise = asyncPost(file);
				asyncPromise.then(asyncSuccess).catch(asyncFailure);
			} else {
				// Wait until form submit
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
			$ctrl.isDroppable = false;
			$ctrl.isProcessing = false;
			$ctrl.isDone = false;
			$ctrl.isError = false;
			$ctrl.dragCounter = 0;
			// TODO empty file upload.
		};

		function asyncPost(file) {
			// TODO remove hard coding
			var postUrl = $ctrl.postUrl ? $ctrl.postUrl : 'partials/image-upload.json';
			var inputName = $ctrl.controlName ? $ctrl.controlName : 'file';
			var formData = new FormData();
			formData.append(inputName, file);

			console.log(postUrl);

			return $http.post(postUrl, formData, {
				headers: { 'Content-Type': undefined },
				transformRequest: angular.identity
			});
		}

		function asyncSuccess(response) {
			// Start changing process indicator immediately
			$ctrl.processingState = 1;

			// Wait before updating text and triggering external change handler
			$timeout(function() {
				$ctrl.isProcessing = false;
				$ctrl.isDone = true;
			}, 3000);

			$timeout(function() {
				if ($ctrl.onSuccess &&
					typeof $ctrl.onSuccess === 'function') {
					asyncPromise.then(function() {
						$ctrl.onSuccess(response);
					});
				}
			}, 3500);

			return response;
		}

		function asyncFailure(error) {
			// Start changing process indicator immediately
			$ctrl.processingState = -1;

			// Wait before updating text and triggering external change handler
			$timeout(function() {
				$ctrl.isProcessing = false;
				$ctrl.isError = true;
			}, 3000);

			$timeout(function() {
				if ($ctrl.onFailure &&
					typeof $ctrl.onFailure === 'function') {
					asyncPromise.catch($ctrl.onFailure);
				}
			}, 3500);

			return error;
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

	/**/
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
	/**/

})(window.angular);
