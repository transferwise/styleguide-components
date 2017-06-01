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
				label: '@',
				placeholder: '@',
				description: '@', // DEPRECATED
				instructions: '@', // DEPRECATED
				buttonText: '@',
				cancelText: '@',
				processingText: '@',
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
				maxSize: '=',
				multiple: '='
			},
			link: twUploadLink,
			template:
			'<div class="droppable" ng-class="{ \
					\'droppable-sm\': $ctrl.size === \'sm\', \
					\'droppable-md\': $ctrl.size === \'md\' || !$ctrl.size, \
					\'droppable-lg\': $ctrl.size === \'lg\', \
					\'droppable-dropping\': $ctrl.isDroppable, \
					\'droppable-processing\': !$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError), \
					\'droppable-complete\': $ctrl.isDone \
				}"> \
				<div class="droppable-default-card" aria-hidden="{{$ctrl.isDone}}"> \
					<div class="droppable-card-content"> \
						<div class="m-b-2"> \
							<i class="icon icon-{{$ctrl.viewIcon}} icon-xxl"></i> \
						</div> \
						<h4 class="m-b-1" ng-if="$ctrl.label || $ctrl.description"> \
							{{$ctrl.label || $ctrl.description}} \
						</h4> \
						<p class="m-b-2">{{$ctrl.placeholder || $ctrl.instructions}}</p> \
						<label class="btn btn-primary">{{$ctrl.buttonText}} \
							<input tw-file-select type="file" \
								accept="{{$ctrl.accept}}"" class="tw-droppable-input hidden" name="file-upload" \
								on-user-input="$ctrl.onManualUpload" ng-model="$ctrl.inputFile"/> \
						</label> \
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
							ng-if="!$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"></tw-process> \
					</div> \
				</div> \
				<div class="droppable-complete-card droppable-card" \
					aria-hidden="{{!$ctrl.isDone}}"> \
					<div class="droppable-card-content">	\
						<div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError"> \
							<h4 class="m-b-2" ng-if="$ctrl.completeText"> \
								{{$ctrl.completeText}} \
							</h4> \
							<div ng-if="$ctrl.file"> \
								<img ng-src="{{$ctrl.file.dataUrl}}" ng-if="$ctrl.file.isImage" class="thumbnail m-b-3" /> \
								<i class="icon icon-pdf icon-xxl" ng-if="!$ctrl.file.isImage"></i> \
								<p class="text-ellipsis m-b-2" style="max-width: 200px;"> \
									<a href="" class="text-no-decoration" ng-if="!$ctrl.file.posted" \
										ng-click="$ctrl.removeFile($ctrl.fileIndex)"> \
										<i class="icon icon-trash"></i> \
									</a> \
									{{$ctrl.file.name}} \
								</p> \
							</div> \
							<div ng-if="$ctrl.files.length > 1" style="overflow-x: auto; white-space: nowrap; vertical-align: middle;"> \
								<div ng-repeat="file in $ctrl.files track by $index" \
									ng-click="$ctrl.file = file; $ctrl.fileIndex = $index;" \
									ng-class="{\'bg-primary\': file.name === $ctrl.file.name}" \
									style="display: inline-block; border-radius: 3px;"> \
									<img ng-src="{{file.dataUrl}}" ng-if="file.isImage" \
										class="thumbnail m-a-1" \
										style="max-width: 40px; max-height: 40xp; /> \
									<i class="icon icon-pdf icon-xxl" ng-if="!file.isImage"></i> \
								</div> \
							</div> \
						</div> \
						<div ng-if="!$ctrl.hasTranscluded && $ctrl.isError"> \
							<h4 class="m-b-2" ng-if="$ctrl.isTooLarge">{{$ctrl.tooLargeMessage}}</h4> \
							<h4 class="m-b-2" ng-if="$ctrl.isWrongType">{{$ctrl.wrongTypeText}}</h4> \
							<h4 class="m-b-2" ng-if="!$ctrl.isTooLarge && $ctrl.errorMessage">{{$ctrl.errorMessage}}</h4> \
							<i class="icon icon-alert icon-xxl text-danger m-b-1"></i> \
						</div> \
						<div ng-if="$ctrl.hasTranscluded" ng-transclude></div> \
						<p ng-if="(!$ctrl.multiple || $ctrl.isError) && $ctrl.cancelText" class="m-t-2 m-b-0"> \
							<a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a> \
						</p> \
						\
						<label ng-if="$ctrl.multiple && !$ctrl.isError" class="btn btn-primary">{{$ctrl.buttonText}} \
							<input tw-file-select type="file" \
								accept="{{$ctrl.accept}}"" class="tw-droppable-input hidden" name="file-upload" \
								on-user-input="$ctrl.onManualUpload" ng-model="$ctrl.inputFile"/> \
						</label> \
						\
					</div> \
				</div> \
				<div class="droppable-dropping-card droppable-card"> \
					<div class="droppable-card-content"> \
						<h4 class="m-b-2">Drop file to start upload</h4> \
						<div class="circle circle-sm"> \
							<i class="icon icon-add"></i> \
						</div> \
						<p class="m-t-2 m-b-0"></p> \
					</div> \
				</div> \
			</div><pre>{{$ctrl.files | json}}<br />{{$ctrl.ngModel | json}}</pre>'
		};
	}
/*

<div class="" style="overflow-x: auto; white-space: nowrap;"> \
	<div ng-repeat="file in $ctrl.files track by $index" style="display: inline-block;"> \
		<a href="" ng-if="!file.posted" ng-click="$ctrl.removeFile($index)" class="close pull-xs-right">&times;</a> \
		<img ng-src="{{file.dataUrl}}" ng-if="file.isImage" class="thumbnail m-b-3" /> \
		<i class="icon icon-pdf icon-xxl" ng-if="!file.isImage"></i> \
		<p class="text-ellipsis m-b-2" style="max-width: 200px;">{{file.name}}</p> \
	</div> \
</div> \
*/

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
		//var isImage = false;

		$ctrl.files = [];

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

		$ctrl.onManualUpload = function(event) {
			var file = event.target.files[0];
			$ctrl.fileDropped(file, event);
		};

		$ctrl.fileDropped = function(file, event) {
			resetView();
			if (!$ctrl.multiple) {
				resetModel();
			}

			var fileObject = {
				isImage: (file.type && file.type.indexOf('image') > -1),
				name: file.name,
				type: file.type,
				posted: $ctrl.httpOptions ? true : false
			};

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
						showDataImage(response[1], fileObject);
						return response[0];
					})
					.then(asyncSuccess)
					.catch(asyncFailure);
			} else {
				// Post on form submit
				asyncFileRead(file)
					.then(function(dataUrl) {
						showDataImage(dataUrl, fileObject);
					})
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
			resetView();
			resetModel();
			triggerHandler($ctrl.onCancel);
		};

		$ctrl.removeFile = function(index) {
			console.log("remove: " + index);
			$ctrl.files = removeIndexFromList($ctrl.files, index);
			$ctrl.ngModel = removeIndexFromList($ctrl.ngModel, index);

			if ($ctrl.files.length === 0) {
				resetView();
				resetModel();
				$ctrl.file = false;
				$ctrl.fileIndex = false;
			} else {
				$ctrl.file = $ctrl.files[$ctrl.files.length];
				$ctrl.fileIndex = $ctrl.files.length;
			}
		};

		function removeIndexFromList(list, index) {
			return list.slice(0,index).concat(list.slice(index+1));
		}

		function resetView() {
			$ctrl.isDroppable = false;
			$ctrl.isProcessing = false;
			$ctrl.isSuccess = false;
			$ctrl.isError = false;
			$ctrl.dragCounter = 0;
			$ctrl.isDone = false;
			$ctrl.isTooLarge = false;
			$ctrl.isWrongType = false;
			$element[0].querySelector('input').value = null;
		}

		function resetModel() {
			if ($ctrl.multiple) {
				setNgModel([]);
			} else {
				setNgModel(null);
			}
		}

		function setNgModel(value) {
			// If ngModel not assignable, we don't want to error.
			if (typeof $attrs.ngModel !== 'undefined') {
				var $ngModel = $element.controller('ngModel');
				if (!$ngModel.$setViewValue) {
					return;
				}

				if ($ctrl.multiple) {
					var newValue = $ctrl.ngModel;
					if (!angular.isArray(newValue)) {
						newValue = [];
					}
					newValue.push(value);
					$ngModel.$setViewValue(newValue);
				} else {
					$ngModel.$setViewValue(value);
				}
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

		function showDataImage(dataUrl, fileObject) {
			// TODO validate it's not already in the collection
			setNgModel(dataUrl);
			fileObject.dataUrl = dataUrl;
			// TODO Ideally we would do this after we've animated out the view.
			$ctrl.file = fileObject;
			$ctrl.files.push(fileObject);
			$ctrl.fileIndex = $ctrl.files.length;
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
			scope.$ctrl.fileDropped(event.dataTransfer.files[0], event);
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
		element.on('change', function (event) {
			if (scope.$ctrl.onUserInput &&
					typeof scope.$ctrl.onUserInput === 'function') {
				scope.$ctrl.onUserInput(event);
			}
		});
	}
})(window.angular);
