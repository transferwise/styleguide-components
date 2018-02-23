import angular from 'angular';
import template from './cards.demo.html';

export default angular
  .module('tw.styleguide.demo.layout.cards', [])
  .component('twCardsDocs', {
    controller() {
      this.imageUrl = 'https://static1.squarespace.com/static/' +
        '58775efdd482e90f8535f34f/t/58d97b69ebbd1a5c0c1d9473/1498213976117/?format=750w';
    },
    template
  })
  .component('formExample', {
    template: `
    <div class="row ">
      <div class="col-sm-6 col-lg-4">
        <div class="form-group m-b-0">
          <label class="control-label">Send</label>
          <div class="input-group">
            <span class="input-group-addon ">£</span>
            <input class="form-control text-xs-right p-r-0" type="text">
            <span class="input-group-addon p-l-1 ">USD</span>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4 m-b-0">
        <div class="form-group m-b-0">
          <label class="control-label">Receive about </label>
          <div class="input-group">
            <span class="input-group-addon ">£</span>
            <input class="form-control text-xs-right p-r-0" type="text">
            <span class="input-group-addon p-l-1 ">USD</span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4 p-t-3 m-b-0">
        <button class="btn btn-success btn-block">Repeat transfer</button>
      </div>
    </div>`
  })
  .component('expandExample', {
    transclude: {
      expandedHead: 'heading',
      expandedBody: '?middle',
      expandedButtons: 'buttons'
    },
    template: `
    <div>
      <div class="m-t-1 m-b-3 visible-xs-block visible-sm-block" ng-transclude="expandedHead"></div>
      <div ng-transclude="expandedBody"></div>
      <hr class="hidden-xs hidden-sm hidden-md">
      <div class="m-t-2 btn-toolbar" ng-transclude="expandedButtons"></div>
    </div>`
  })
  .component('collapseExample', {
    transclude: {
      collapseBody: '?middle',
      collapseRight: 'right'
    },
    template: `
    <div class="media">
      <div class="media-body" ng-transclude="collapseBody"></div>
      <div class="media-right text-xs-right" ng-transclude="collapseRight"></div>
    </div>`
  }).name;
