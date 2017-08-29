import TwSelectController from './tw-select.controller.js';

const TwSelect = {
  require: 'ngModel',
  controller: TwSelectController,
  transclude: true,
  bindings: {
    ngModel: '=',
    ngRequired: '=',
    ngDisabled: '=',
    options: '=',
    name: '@',
    placeholder: '@',
    filter: '@',
    size: '@',
    dropdownRight: '@',
    dropdownUp: '@',
    dropdownWidth: '@',
    inverse: '=',
    hideNote: '@',
    hideSecondary: '@',
    hideIcon: '@',
    hideCurrency: '@',
    hideCircle: '@',
    hideLabel: '@'
  },
  template: " \
    <div class='btn-group btn-block tw-select' ng-class='{ dropdown: !$ctrl.dropdownUp, dropup: $ctrl.dropdownUp }' aria-hidden='false'> \
      <button type='button' class='btn btn-input dropdown-toggle' \
        ng-class='{ \
          \"btn-input-inverse\": $ctrl.inverse, \
          \"btn-addon\": $ctrl.inverse, \
          \"btn-sm\": $ctrl.size === \"sm\", \
          \"btn-lg\": $ctrl.size === \"lg\" \
        }' \
        data-toggle='dropdown' aria-expanded='false' \
        ng-disabled='$ctrl.ngDisabled' \
        ng-focus='$ctrl.buttonFocus()' \
        tw-focusable> \
        <span class='tw-select-selected' ng-if='$ctrl.selected'> \
          <span class='circle circle-inverse pull-xs-left circle-sm' \
            ng-if='$ctrl.selected && $ctrl.selected.icon && $ctrl.selected.secondary'>\
            <i class='icon {{$ctrl.selected.icon}}'></i> \
          </span> \
          <span class='circle circle-inverse pull-xs-left'  \
            ng-class='$ctrl.circleClasses($ctrl.hideCircle)' \
            ng-if='($ctrl.selected.circleText || $ctrl.selected.circleImage || $ctrl.selected.circleIcon)'> \
            <span ng-if='$ctrl.selected.circleText'>{{$ctrl.selected.circleText}}</span> \
            <img ng-if='$ctrl.selected.circleImage' \
              ng-src='{{$ctrl.selected.circleImage}}' /> \
            <i ng-if='$ctrl.selected.circleIcon' class='icon {{$ctrl.selected.circleIcon}}'></i> \
          </span> \
          <span class='text-ellipsis'> \
            <i class='currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}' \
              ng-if='$ctrl.selected && $ctrl.selected.currency' \
              ng-class='$ctrl.responsiveClasses($ctrl.hideCurrency)' \
            ></i> \
            <i class='icon {{$ctrl.selected.icon}}' \
              ng-if='$ctrl.selected && $ctrl.selected.icon && !$ctrl.selected.secondary' \
              ng-class='$ctrl.responsiveClasses($ctrl.hideIcon)' \
            ></i> \
            <span class='tw-select-label' ng-class='$ctrl.responsiveClasses($ctrl.hideLabel)'> \
              {{$ctrl.selected.label}} \
            </span> \
            <span \
              ng-if='$ctrl.selected.note' \
              ng-class='$ctrl.responsiveClasses($ctrl.hideNote)' \
              class='tw-select-note small m-l-1'> \
              {{$ctrl.selected.note}} \
            </span> \
            <span \
              ng-if='$ctrl.selected.secondary' \
              ng-class='$ctrl.responsiveClasses($ctrl.hideSecondary)' \
              class='tw-select-secondary small secondary text-ellipsis'> \
              {{$ctrl.selected.secondary}} \
            </span> \
          </span> \
        </span> \
        <span class='form-control-placeholder' ng-if='!$ctrl.selected'>{{$ctrl.placeholder}}</span> \
        <span class='caret'></span> \
      </button> \
      <ul class='dropdown-menu' role='menu' ng-class='{ \
          \"dropdown-menu-xs-right\": $ctrl.dropdownRight === \"xs\", \
          \"dropdown-menu-sm-right\": $ctrl.dropdownRight === \"sm\", \
          \"dropdown-menu-md-right\": $ctrl.dropdownRight === \"md\", \
          \"dropdown-menu-lg-right\": $ctrl.dropdownRight === \"lg\", \
          \"dropdown-menu-xl-right\": $ctrl.dropdownRight === \"xl\", \
          \"dropdown-menu-sm\": $ctrl.dropdownWidth === \"sm\", \
          \"dropdown-menu-md\": $ctrl.dropdownWidth === \"md\", \
          \"dropdown-menu-lg\": $ctrl.dropdownWidth === \"lg\" \
        }'> \
        <li ng-if='$ctrl.filter'> \
          <a href='' class='tw-select-filter-link p-a-0' tabindex='-1' \
            ng-focus='$ctrl.filterFocus()'> \
            <div class='input-group'> \
              <span class='input-group-addon'><i class='icon icon-search'></i></span> \
              <input type='text' class='form-control tw-select-filter' placeholder='{{$ctrl.filter}}' \
                ng-model='$ctrl.filterString' \
                ng-change='$ctrl.filterChange()' \
                ng-keydown='$ctrl.filterKeydown($event)' /> \
            </div> \
          </a> \
        </li> \
        <li ng-class='{active: !$ctrl.selected}' \
          ng-if='$ctrl.placeholder && !$ctrl.ngRequired && !$ctrl.filter'> \
          <a href='' tabindex='-1' \
            ng-click='$ctrl.placeholderClick()' \
            ng-focus='$ctrl.placeholderFocus()' \
            class='tw-select-placeholder' tw-focusable> \
            {{$ctrl.placeholder}} \
          </a> \
        </li> \
        <li ng-if='($ctrl.placeholder && !$ctrl.ngRequired) || $ctrl.filter' class='divider'></li> \
        <li \
          ng-repeat='option in $ctrl.filteredOptions' \
          ng-class='{ \
            active: $ctrl.ngModel === option.value, \
            disabled: option.disabled, \
            \"dropdown-header\": option.header, \
            \"tw-select-option\": !option.header && !option.disabled \
          }'> \
          <span ng-if='option.header' class='text-ellipsis'>{{option.header}}</span> \
          <a href='' \
            ng-if='!option.header' \
            ng-click='$ctrl.optionClick(option, $event)' \
            ng-focus='$ctrl.optionFocus(option)' \
            ng-class='{\"tw-select-option-link\": !option.disabled}' \
            index='{{$index}}' \
            tabindex='-1' \
            tw-focusable > \
            <div class='circle circle-inverse pull-xs-left circle-sm' ng-if='option.icon && option.secondary'>\
              <i class='icon {{option.icon}}'></i>\
            </div>\
            <i class='icon {{option.icon}} pull-xs-left' ng-if='option.icon && !option.secondary'></i> \
            <i class='currency-flag currency-flag-{{option.currency | lowercase}} pull-xs-left' ng-if='option.currency'> \
            </i><span class='circle circle-inverse pull-xs-left' ng-class='{\"circle-sm\": option.secondary, \"circle-xs\": !option.secondary}' \
              ng-if='option.circleText || option.circleImage || option.circleIcon'> \
              <span class='tw-select-circle-text' ng-if='option.circleText'>{{option.circleText}}</span> \
              <img ng-if='option.circleImage' ng-src='{{option.circleImage}}' /> \
              <i ng-if='option.circleIcon' class='icon {{option.circleIcon}}'></i> \
            </span>{{option.label}}<span \
            ng-if='option.note' class='tw-select-note small m-l-1'>{{option.note}}</span><span \
            ng-if='option.secondary' class='tw-select-secondary small text-ellipsis'>{{option.secondary}}</span> \
          </a> \
        </li> \
        <li ng-if='$ctrl.hasTranscluded' class='divider'></li> \
        <li ng-transclude ng-if='$ctrl.hasTranscluded' class='tw-select-transcluded'></li> \
      </ul> \
    </div> \
    <input type='hidden' class='tw-select-hidden' \
      name='{{$ctrl.name}}' \
      value='{{$ctrl.ngModel}}' \
      ng-disabled='$ctrl.ngDisabled' />"
};

/*
// TODO may be better for accessibility to have hidden select?
<select name='{{$ctrl.name}}' class='sr-only tw-select-hidden' \
  ng-model='$ctrl.ngModel' \
  ng-options='option.value as option.label for option in $ctrl.options' \
  ng-disabled='$ctrl.ngDisabled' \
  ng-required='$ctrl.ngRequired'> \
</select>"
*/

export default TwSelect;
