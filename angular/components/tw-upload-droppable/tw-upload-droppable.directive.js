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
			controller: ['$element', '$scope', '$transclude', '$timeout', TwUploadDroppableController],
			controllerAs: '$ctrl',
			replace: false,
			transclude: true,
			restrict: 'E',
			scope: {
				title: '@',
				buttonText: '@',
				onUpload: '=',
				ngAccept: '='
			},
			link: TwUploadDroppableLink,
			template:
			'<div class="text-center tw-upload-droppable-box" ng-class="{\'active\': $ctrl.isActive}"> \
				<div class="row">\
					<i class="icon icon-upload tw-upload-droppable-icon"></i>\
				</div>\
					<h4 class="m-t-2">{{$ctrl.title}}</h4>\
				<div class="row">\
					<div class="col-xs-12 col-sm-6 col-sm-offset-3 m-t-1">\
					<ng-transclude></ng-transclude>\
					<label class="btn-link"for="file-upload">{{$ctrl.buttonText}}</label>\
					<input tw-file-select id="file-upload" type="file" accept={{$ctrl.ngAccept}} class="hidden" on-user-input="$ctrl.onManualUpload"/>\
					</div>\
				</div>\
			</div>'
		};
	}

	TwUploadDroppableController.$inject = ['$element', '$log', '$scope'];

	function TwUploadDroppableController($element, $log, $scope) {
		var vm = this;

		vm.dragCounter = 0;
		vm.isActive = false;

		vm.onManualUpload = function() {
			if (vm.onUpload && typeof vm.onUpload === 'function') {
				vm.onUpload(angular.element(document.querySelector('#file-upload'))[0].files[0]);
			}
		};

		vm.onDrop = function(file) {
			if (vm.onUpload && typeof vm.onUpload === 'function') {
				vm.onUpload(file);
			}
			vm.isActive = false;
			vm.dropCounter = 0;
		};

		vm.onDragChange = function(enter) {
			if (enter) {
				vm.dragCounter++;
				if (vm.dragCounter === 1) {
					vm.isActive = true;
				}
			} else {
				vm.dragCounter--;
				if (vm.dragCounter === 0) {
					vm.isActive = false;
				}
			}
		};

	}

	function TwUploadDroppableLink(scope, element, attr) {
		element[0].addEventListener('dragenter', function (evt) {
			evt.preventDefault();
			scope.$ctrl.onDragChange(true);
			scope.$apply();
		}, false);

		element[0].addEventListener('dragover', function (evt) {
			evt.preventDefault();
		},false);

		element[0].addEventListener('dragleave', function (evt) {
			evt.preventDefault();
			scope.$ctrl.onDragChange(false);
			scope.$apply();
		}, false);

		element[0].addEventListener('drop', function (evt) {
			evt.preventDefault();
			scope.$ctrl.onDrop(evt.dataTransfer.files[0]);
			scope.$apply();
		}, false);
	}

	function TwFileSelectDirective() {
		return {
			bindToController: true,
			controller: function(){},
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
			if (scope.$ctrl.onUserInput && typeof scope.$ctrl.onUserInput === 'function') {
				scope.$ctrl.onUserInput();
			}
		});
	}


})(window.angular);
