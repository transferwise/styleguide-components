import TwDateLookupController from './tw-date-lookup.controller.js';

const TwDateLookup = {
  require: 'ngModel',
  controller: TwDateLookupController,
  bindings: {
    ngModel: '=',
    ngChange: '&',
    ngMin: '=',
    ngMax: '=',
    ngRequired: '=',
    ngDisabled: '=',
    placeholder: '@',
    size: '@',
    locale: '@',
    label: '@',
    shortDate: '<'
  },
  template: ' \
  <div class="btn-group btn-block dropdown" \
    ng-keydown="$ctrl.keyHandler($event)"> \
    <button class="btn btn-input dropdown-toggle tw-date-lookup-button" data-toggle="dropdown" \
      ng-disabled="$ctrl.ngDisabled" \
      ng-click="$ctrl.openLookup()" \
      ng-focus="$ctrl.buttonFocus()" \
      ng-class="{ \
        \'btn-sm\': $ctrl.size === \'sm\', \
        \'btn-lg\': $ctrl.size === \'lg\' \
      }"> \
      <span ng-if="!$ctrl.ngModel" \
        class="form-control-placeholder tw-date-lookup-placeholder"> \
        {{$ctrl.placeholder}} \
      </span> \
      <span ng-if="$ctrl.label && $ctrl.ngModel" \
        class="control-label small m-r-1" style="font-size: 14px;" \
        >{{$ctrl.label}}</span \
      ><span ng-if="$ctrl.ngModel" class="tw-date-lookup-selected">\
        {{$ctrl.selectedDateFormatted}}\
      </span> \
      <span class="caret"></span> \
    </button> \
    <div class="dropdown-menu" style="min-width: 300px;"> \
      \
      <div ng-if="$ctrl.mode === \'year\'" class="tw-date-lookup-years"> \
        <div class="text-xs-center p-t-1 p-b-2"> \
          <div class="pull-xs-left p-b-2"> \
            <a href="" ng-click="$ctrl.setYearOffset($event, -20)" \
              class="text-no-decoration tw-date-lookup-previous-years"> \
              <i class="icon icon-left icon-lg"></i> \
            </a> \
          </div> \
          <div class="pull-xs-right p-b-2"> \
            <a href="" ng-click="$ctrl.setYearOffset($event, 20)" \
              class="text-no-decoration tw-date-lookup-next-years"> \
              <i class="icon icon-right icon-lg"></i> \
            </a> \
          </div> \
        </div> \
        <table class="table table-condensed table-bordered table-calendar m-b-0"> \
          <tbody> \
            <tr ng-repeat="row in [0,4,8,12,16]"> \
              <td ng-repeat="col in [0,1,2,3]"> \
                <a href="" \
                  ng-click="$ctrl.selectYear($event, $ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)" \
                  ng-disabled="$ctrl.isYearDisabled($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)" \
                  ng-class="{\'active\': $ctrl.selectedYear === ($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)}" \
                  class="tw-date-lookup-year-option"> \
                  {{$ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset}} \
                </a> \
              </td> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
      \
      <div ng-if="$ctrl.mode === \'month\'" class="tw-date-lookup-months"> \
        <div class="text-xs-center p-t-1 p-b-2"> \
          <div class="pull-xs-left"> \
            <a href="" ng-click="$ctrl.yearBefore($event)" class="text-no-decoration"> \
              <i class="icon icon-left icon-lg"></i> \
            </a> \
          </div> \
          <a href="" ng-click="$ctrl.switchToYears($event)" \
            class="tw-date-lookup-year-label"> \
            {{$ctrl.year}} \
          </a> \
          <div class="pull-xs-right"> \
            <a href="" ng-click="$ctrl.yearAfter($event)" class="text-no-decoration"> \
              <i class="icon icon-right icon-lg"></i> \
            </a> \
          </div> \
        </div> \
        <table class="table table-condensed table-bordered table-calendar m-b-0"> \
          <tbody> \
            <tr ng-repeat="row in [0,4,8]"> \
              <td ng-repeat="col in [0,1,2,3]"> \
                <a href="" \
                  ng-click="$ctrl.selectMonth($event, row+col, $ctrl.year)" \
                  ng-disabled="$ctrl.isMonthDisabled(row + col, $ctrl.year)" \
                  ng-class="{\'active\': $ctrl.selectedMonth === (row + col) && $ctrl.selectedYear === $ctrl.year}" \
                  class="tw-date-lookup-month-option"> \
                  {{$ctrl.shortMonthsOfYear[row+col] | limitTo:5}} \
                </a> \
              </td> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
      \
      <div ng-if="$ctrl.mode === \'day\'" class="tw-date-lookup-days"> \
        <div class="text-xs-center p-t-1 p-b-2"> \
          <div class="pull-xs-left"> \
            <a href="" ng-click="$ctrl.monthBefore($event)" \
              class="text-no-decoration tw-date-lookup-previous-month"> \
              <i class="icon icon-left icon-lg"></i> \
            </a> \
          </div> \
          <a href="" ng-click="$ctrl.switchToYears($event)" \
            class="tw-date-lookup-month-label"> \
            {{$ctrl.yearMonthFormatted}} \
          </a> \
          <div class="pull-xs-right"> \
            <a href="" ng-click="$ctrl.monthAfter($event)" \
              class="text-no-decoration tw-date-lookup-next-month"> \
              <i class="icon icon-right icon-lg"></i> \
            </a> \
          </div> \
        </div> \
        <table class="table table-condensed table-bordered table-calendar m-b-0"> \
          <thead> \
            <tr> \
              <th ng-repeat="day in $ctrl.daysOfWeek track by $index"> \
                <span class="hidden-xs">{{day | limitTo : 3}}</span> \
                <span class="visible-xs-inline-block">{{$ctrl.shortDaysOfWeek[$index] | limitTo : 2}}</span> \
              </th> \
            </tr> \
          </thead> \
          <tbody> \
            <tr ng-repeat="week in $ctrl.weeks"> \
              <td ng-repeat="day in week track by $index" \
                ng-class="{ \
                  \'default\': $index > 4 \
                }"> \
                <a href="" title="{{day}} {{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}}" \
                  ng-if="day" \
                  ng-click="$ctrl.selectDay($event, day, $ctrl.month, $ctrl.year)" \
                  ng-disabled="$ctrl.isDayDisabled(day, $ctrl.month, $ctrl.year)" \
                  ng-class="{ \
                    \'active\': $ctrl.isCurrentlySelected(day, $ctrl.month, $ctrl.year) \
                  }" \
                  class="tw-date-lookup-day-option" tabindex="0"> \
                  {{day}} \
                </a> \
              </td> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
    </div> \
  </div>'
};

export default TwDateLookup;
