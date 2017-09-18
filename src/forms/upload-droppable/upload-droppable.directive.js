/* DEPRECATED in favour of upload */
import angular from 'angular';

import template from './upload-droppable.html';

function TwUploadDroppableDirective() {
  return {
    bindToController: true,
    controller: TwUploadDroppableController,
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
    template
  };
}


function TwUploadDroppableController() {
  const $ctrl = this;

  $ctrl.dragCounter = 0;
  $ctrl.isActive = false;

  $ctrl.onManualUpload = (event) => {
    if ($ctrl.onUpload && typeof $ctrl.onUpload === 'function') {
      $ctrl.onUpload(angular.element(document.querySelector('#file-upload'))[0].files[0], event);
    }
  };

  $ctrl.onDrop = (file, event) => {
    if ($ctrl.onUpload && typeof $ctrl.onUpload === 'function') {
      $ctrl.onUpload(file, event);
    }
    $ctrl.isActive = false;
    $ctrl.dropCounter = 0;
  };

  $ctrl.onDragChange = (enter) => {
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

function TwUploadDroppableLink(scope, element) {
  element[0].addEventListener('dragenter', (event) => {
    event.preventDefault();
    scope.$ctrl.onDragChange(true);
    scope.$apply();
  }, false);

  element[0].addEventListener('dragover', (event) => {
    event.preventDefault();
  }, false);

  element[0].addEventListener('dragleave', (event) => {
    event.preventDefault();
    scope.$ctrl.onDragChange(false);
    scope.$apply();
  }, false);

  element[0].addEventListener('drop', (event) => {
    event.preventDefault();
    scope.$ctrl.onDrop(event.dataTransfer.files[0]);
    scope.$apply();
  }, false);
}

export default TwUploadDroppableDirective;
