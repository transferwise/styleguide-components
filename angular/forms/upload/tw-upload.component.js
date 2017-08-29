import TwUploadController from './tw-upload.controller.js';

const TwUpload = {
  controller: TwUploadController,
  transclude: true,
  bindings: {
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
    httpOptions: '<',
    onStart: '=',
    onSuccess: '=',
    onFailure: '=',
    onCancel: '=',
    maxSize: '<'
  },
  template: ' \
    <div class="droppable" ng-class="{ \
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
      <div class="droppable-card-content">  \
        <div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError"> \
          <h4 class="m-b-2" ng-if="$ctrl.completeText"> \
            {{$ctrl.completeText}} \
          </h4> \
          <img ng-src="{{$ctrl.image}}" ng-if="$ctrl.isImage" class="thumbnail m-b-3" /> \
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
        <p ng-if="$ctrl.cancelText" class="m-t-2 m-b-0"> \
          <a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a> \
        </p> \
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
  </div>'
};

export default TwUpload;
