
	function TwUploadDroppableDirective() {
		return {
			bindToController: true,
			controller: [TwUploadDroppableController],
			controllerAs: '$ctrl',
			replace: false,
			transclude: true,
			restrict: 'E',
			scope: {
				title: '@',
				cta: '@',
				onUpload: '=',
				accept: '='
			},
			link: TwUploadDroppableLink,
			template:
			'<div class="text-center tw-upload-droppable-box" ng-class="{\'active\': $ctrl.isActive}"> \
				<i class="icon icon-upload tw-upload-droppable-icon"></i>\
				<h4 class="m-t-2" ng-if="$ctrl.title">{{$ctrl.title}}</h4>\
				<div class="row">\
					<div class="col-xs-12 col-sm-6 col-sm-offset-3 m-t-1">\
					<ng-transclude></ng-transclude>\
					<label class="link" for="file-upload">{{$ctrl.cta}}</label>\
					<input tw-file-select id="file-upload" type="file" accept={{$ctrl.accept}} class="hidden" on-user-input="$ctrl.onManualUpload"/>\
					</div>\
				</div>\
			</div>'
		};
	}


	function TwUploadDroppableController() {
		var $ctrl = this;

		$ctrl.dragCounter = 0;
		$ctrl.isActive = false;

		$ctrl.onManualUpload = function(event) {
			if ($ctrl.onUpload && typeof $ctrl.onUpload === 'function') {
				$ctrl.onUpload(angular.element(document.querySelector('#file-upload'))[0].files[0], event);
			}
		};

		$ctrl.onDrop = function(file, event) {
			if ($ctrl.onUpload && typeof $ctrl.onUpload === 'function') {
				$ctrl.onUpload(file, event);
			}
			$ctrl.isActive = false;
			$ctrl.dropCounter = 0;
		};

		$ctrl.onDragChange = function(enter) {
			if (enter) {
				$ctrl.dragCounter++;
				if ($ctrl.dragCounter === 1) {
					$ctrl.isActive = true;
				}
			} else {
				$ctrl.dragCounter--;
				if ($ctrl.dragCounter === 0) {
					$ctrl.isActive = false;
				}
			}
		};

	}

	function TwUploadDroppableLink(scope, element, attr) {
		element[0].addEventListener('dragenter', function (event) {
			event.preventDefault();
			scope.$ctrl.onDragChange(true);
			scope.$apply();
		}, false);

		element[0].addEventListener('dragover', function (event) {
			event.preventDefault();
		},false);

		element[0].addEventListener('dragleave', function (event) {
			event.preventDefault();
			scope.$ctrl.onDragChange(false);
			scope.$apply();
		}, false);

		element[0].addEventListener('drop', function (event) {
			event.preventDefault();
			scope.$ctrl.onDrop(event.dataTransfer.files[0]);
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
		element.on('change', function (event) {
			if (scope.$ctrl.onUserInput && typeof scope.$ctrl.onUserInput === 'function') {
				scope.$ctrl.onUserInput(event);
			}
		});
	}

	export default angular
		.module('tw.styleguide.forms.upload-droppable', [])
		.directive('twFileSelect', TwFileSelectDirective)
		.directive('twUploadDroppable', TwUploadDroppableDirective).name;
