(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twSelect', TwSelectDirective);

	function TwSelectDirective() {
		return {
			require: 'ngModel',
			bindToController: true,
			controller: ['$element', '$scope', '$transclude', '$timeout', TwSelectController],
			controllerAs: '$ctrl',
			replace: false,
			transclude: true,
			restrict: 'EA',
			scope: {
				ngModel: '=',
				ngRequired: '=',
				ngDisabled: '=',
				options: '=',
				name: '@',
				placeholder: '@',
				filter: '@',
				size: '@',
				dropdownRight: '@',
				dropdownWidth: '@',
				inverse: '=',
				hideNote: '@',
				hideSecondary: '@',
				hideIcon: '@',
				hideCurrency: '@',
				hideCircle: '@'
			},
			template: " \
				<div class='btn-group btn-block dropdown tw-select' aria-hidden='false'> \
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
							</span><span class='text-ellipsis'> \
								<i class='currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}' \
									ng-if='$ctrl.selected && $ctrl.selected.currency' \
									ng-class='$ctrl.responsiveClasses($ctrl.hideCurrency)' \
									></i><i class='icon {{$ctrl.selected.icon}}' \
									ng-if='$ctrl.selected && $ctrl.selected.icon && !$ctrl.selected.secondary' \
									ng-class='$ctrl.responsiveClasses($ctrl.hideIcon)' \
									></i><span class='tw-select-label'>{{$ctrl.selected.label}}</span><span \
									ng-if='$ctrl.selected.note' \
									ng-class='$ctrl.responsiveClasses($ctrl.hideNote)' \
									class='tw-select-note small m-l-1'>{{$ctrl.selected.note}}</span><span \
									ng-if='$ctrl.selected.secondary' \
									ng-class='$ctrl.responsiveClasses($ctrl.hideSecondary)' \
									class='tw-select-secondary small secondary text-ellipsis'>{{$ctrl.selected.secondary}}</span> \
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
							<span ng-if='option.header'>{{option.header}}</span> \
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
	}
	/*
	// TODO may be better for accessibility to have hidden select?
	<select name='{{$ctrl.name}}' class='sr-only tw-select-hidden' \
		ng-model='$ctrl.ngModel' \
		ng-options='option.value as option.label for option in $ctrl.options' \
		ng-disabled='$ctrl.ngDisabled' \
		ng-required='$ctrl.ngRequired'> \
	</select>"
	*/

	function TwSelectController($element, $scope, $transclude, $timeout) {
		var $ctrl = this,
			$ngModel = $element.controller('ngModel');

		$ctrl.search = "";

		preSelectModelValue($ngModel, $ctrl, $ctrl.options);
		setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl);

		addWatchers($ctrl, $scope, $ngModel, $element);
		addEventHandlers($ctrl, $element, $ngModel, $ctrl.options, $timeout);

		checkForTranscludedContent($transclude, $ctrl);

		$ctrl.buttonFocus = buttonFocus;
		$ctrl.optionClick = optionClick;
		$ctrl.optionFocus = optionFocus;
		$ctrl.optionKeypress = optionKeypress;
		$ctrl.placeholderFocus = placeholderFocus;
		$ctrl.placeholderClick = placeholderClick;
		$ctrl.filterFocus = filterFocus;
		$ctrl.filterChange = filterChange;
		$ctrl.filterKeydown = filterKeydown;

		$ctrl.responsiveClasses = responsiveClasses;
		$ctrl.circleClasses = circleClasses;

		$ctrl.getFilteredOptions = getFilteredOptions;

		$ctrl.filterString = "";
		$ctrl.filteredOptions = $ctrl.getFilteredOptions();

		function responsiveClasses(value) {
			var classes = '',
				validBreakpoints = {xs:true, sm:true, md:true, lg:true, xl:true},
				breakpoints = [];

			if (typeof value === 'boolean' && value) {
				return 'hidden';
			}

			if (value && value.toLowerCase && value.toLowerCase() === 'true') {
				return 'hidden';
			}

			if (value) {
				breakpoints = value.split(',');
			}
				
			breakpoints.forEach(function(breakpoint) {
				if (validBreakpoints[breakpoint]) {
					classes += 'hidden-' + breakpoint + ' ';
				}
			});

			return classes;
		}

		function circleClasses(responsiveOption) {
			var classes = $ctrl.responsiveClasses(responsiveOption);
			var secondaryClasses = $ctrl.responsiveClasses($ctrl.hideSecondary);
			// If secondary text line, and it won't be hidden at some point, use larger circle
			if ($ctrl.selected.secondary && secondaryClasses.length === 0) {
				classes += " circle-sm";
			} else {
				classes += " circle-xs";
			}
			return classes;
		}

		function buttonFocus() {
			$element.triggerHandler('focus');
		}
		function optionClick(option, $event) {
			if (option.disabled) {
				$event.stopPropagation();
				return;
			}
			selectOption($ngModel, $ctrl, option);
			$element.find('.btn').focus();
		}
		function optionFocus(option) {
			selectOption($ngModel, $ctrl, option);
		}
		function optionKeypress(event) {
			// If we're in the filter don't allow normal behaviour
			if ($(event.target).hasClass('tw-select-filter')) {
				return;
			}

			// Prevent delete taking us back
			var characterCode = getCharacterCodeFromKeypress(event);
			if (characterCode === 8) {
				event.preventDefault();
				return false;
			}

			// Search for option based on character
			var character = getCharacterFromKeypress(event);
			continueSearchAndSelectMatch(
				$ngModel, $ctrl, $ctrl.options, character
			);
			$element.find('.active a').focus();
		}

		function placeholderClick(option) {
			resetOption($ngModel, $ctrl);
			$element.find('.btn').focus();
		}
		function placeholderFocus() {
			resetOption($ngModel, $ctrl);
		}

		function getFilteredOptions() {
			if (!$ctrl.options || !$ctrl.options.filter) {
				return [];
			}

			var filteredLabels = [];
			return $ctrl.options.filter(function (option) {
				var filterStringLower =
					$ctrl.filterString && escapeRegExp($ctrl.filterString.toLowerCase());

				if (!filterStringLower) {
					return true;
				}

				var duplicate = false;
				if (filteredLabels.indexOf(option.label) > -1) {
					duplicate = true;
				}

				var addOption = ((option.label && option.label.toLowerCase().search(filterStringLower) >= 0) ||
					(option.note && option.note.toLowerCase().search(filterStringLower) >= 0) ||
					(option.secondary && option.secondary.toLowerCase().search(filterStringLower) >= 0) ||
					(option.searchable && option.searchable.toLowerCase().search(filterStringLower) >= 0)) &&
					!duplicate;

				if (addOption) {
					filteredLabels.push(option.label);
				}
				return addOption;
			});
		}

		function escapeRegExp(str) {
			return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		}
		function filterFocus() {
			$element.find('.tw-select-filter').focus();
		}
		function filterChange() {
			$ctrl.filteredOptions = $ctrl.getFilteredOptions();
			var selectedOption = findSelected($ctrl.filteredOptions, $ctrl.selected);

			// Choose a new selected value if the old one was hidden
			if (!selectedOption && $ctrl.filteredOptions.length) {
				selectOption($ngModel, $ctrl, $ctrl.filteredOptions[0]);
			}
		}
		function findSelected(options, selected) {
			// Prefer forEach over find for browser support
			var selectedOption;
			options.forEach(function(option) {
				if (selected && angular.equals(selected.value, option.value)) {
					selectedOption = selected;
				}
			});
			return selectedOption;
		}

		// Keydown as keypress did not work in chrome/safari
		function filterKeydown(event) {
			var characterCode = event.which || event.charCode || event.keyCode,
				activeOption = $element.find('.active'),
				activeLink = activeOption.find('a'),
				optionLinks = $element.find(".tw-select-option-link");

			if (characterCode === 40) { // Down arrow key
				moveDownOneOption(activeOption, activeLink, optionLinks);
				event.preventDefault(); // Prevent cursor jumping around in input
			} else if (characterCode === 38) { // Up arrow key
				moveUpOneOption(activeOption, activeLink, optionLinks);
				event.preventDefault(); // Prevent cursor jumping in input
			} else if (characterCode === 13) { // Return key
				activeOption.click();
				$element.find('.btn').focus();
				event.preventDefault(); // Prevent form action as input active
			}
			return true;
		}

		function selectOptionUsingLink(link) {
			var option = $ctrl.filteredOptions[link.attr('index')];
			selectOption($ngModel, $ctrl, option);
		}

		function moveUpOneOption(activeOption, activeLink, optionLinks) {
			// If none active, select last
			if (!activeOption.length && optionLinks.length) {
				selectOptionUsingLink($(optionLinks[optionLinks.length - 1]));
				return;
			}
			// If active option not first, move up
			if (activeLink[0] !== optionLinks[0]) {
				// TODO prevAll is ineffeccient for longer lists
				var previousOptions = activeOption.prevAll('.tw-select-option');
				selectOptionUsingLink($(previousOptions[0]).find('a'));
				return;
			}
		}
		function moveDownOneOption(activeOption, activeLink, optionLinks) {
			// If none active, select first
			if (!activeOption.length && optionLinks.length) {
				selectOptionUsingLink($(optionLinks[0]));
				return;
			}
			// If active option not last, move down
			if (activeLink[0] !== optionLinks[optionLinks.length - 1]) {
				// TODO nextAll is ineffeccient for longer lists
				var nextOptions = activeOption.nextAll('.tw-select-option');
				selectOptionUsingLink($(nextOptions[0]).find('a'));
				return;
			}
			// If active is last and custom action, focus on it
			var transcludedOption = $('.tw-select-transcluded');
			if (transcludedOption.length) {
				transcludedOption.find('a').focus();
				return;
			}
		}
	}

	function addWatchers($ctrl, $scope, $ngModel, $element) {
		$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
			if ((newValue || oldValue) && newValue !== oldValue) {
				$ngModel.$setDirty();
			}

			modelChange(newValue, oldValue, $ctrl);
		});

		$scope.$watch('$ctrl.options', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				// Reinitialise selected valus
				preSelectModelValue($ngModel, $ctrl, $ctrl.options);
				setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl);

				$ctrl.filteredOptions = $ctrl.getFilteredOptions();
			}
		});
	}

	function addEventHandlers($ctrl, $element, $ngModel, options, $timeout) {
		$element.find('.btn, .dropdown-menu').on('focusout', function() {
			$timeout(function() {
				// If button isn't focused and dropdown not open, blur
				if ($element.find('.btn:focus').length === 0 &&
					!$element.find('.btn-group').hasClass('open')) {
					$element.trigger('blur');
				}
			}, 150); 	// need timeout because using dropdown.js,
		});

		$element.on('blur', function(event) {
			$ngModel.$setTouched();
		});

		$element.find('.btn').on('keypress', function(event) {
			$ctrl.optionKeypress(event);
		});

		$element.find('.btn').on('click', function() {
			// Once dropdown is open, focus on active/selected option for keyboard support
			$timeout(function() {
				if ($element.attr('filter')) {
					$element.find('.tw-select-filter').focus();
				} else {
					$element.find('.active a').focus();
				}
			});
		});

		$element.find('ul').on('keypress', 'a', function(event) {
			$ctrl.optionKeypress(event);
		});
	}

	function checkForTranscludedContent($transclude, $ctrl) {
		$transclude(function(clone) {
			if (clone.length > 1 || clone.text().trim() !== '') {
				$ctrl.hasTranscluded = true;
			}
		});
	}

	function getCharacterCodeFromKeypress(event) {
		return event.which || event.charCode || event.keyCode;
	}
	function getCharacterFromKeypress(event) {
		return String.fromCharCode(getCharacterCodeFromKeypress(event));
	}

	function preSelectModelValue($ngModel, $ctrl, options) {
		if (isValidModel($ctrl.ngModel)) {
			var option = findOptionFromValue($ctrl.options, $ctrl.ngModel);
			selectOption($ngModel, $ctrl, option);
		}
	}

	function modelChange(newVal, oldVal, $ctrl) {
		if (newVal === oldVal) {
			return;
		}

		var option = findOptionFromValue($ctrl.options, newVal);
		if (option) {
			$ctrl.selected = option;
		} else {
			$ctrl.selected = null;
		}
	}

	function findOptionFromValue(options, value) {
		var optionMatch = false;
		options.forEach(function(option) {
			if (angular.equals(option.value, value)) {
				optionMatch = option;
			}
		});
		return optionMatch;
	}

	function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
		// If required and model empty, select first option with value
		if (($ctrl.ngRequired || $attrs.required) && !isValidModel($ctrl.ngModel)) {
			for (var i = 0; i < $ctrl.options.length; i++) {
				if (isValidModel($ctrl.options[i].value)) {
					selectOption($ngModel, $ctrl, $ctrl.options[i]);
					break;
				}
			}
		}
	}

	function selectOption($ngModel, $ctrl, option) {
		if (option.disabled) {
			return;
		}
		$ngModel.$setViewValue(option.value);
		// Force commit so that ng-change always has new value
		$ngModel.$commitViewValue();
		$ctrl.selected = option;
	}

	function resetOption($ngModel, $ctrl) {
		$ngModel.$setViewValue(null);
		// Force commit so that ng-change always has new value
		$ngModel.$commitViewValue();
		$ctrl.selected = false;
	}

	function continueSearchAndSelectMatch($ngModel, $ctrl, options, letter) {
		var found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
		if (found) {
			$ctrl.search += letter;
		} else {
			$ctrl.search = letter;
			found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search);
		}
		return found;
	}

	function searchAndSelect($ngModel, $ctrl, options, term) {
		var found = false,
			searchTerm = term.toLowerCase();

		options.forEach(function(option) {
			if (found || !option.label) {
				return;
			}
			if (option.label.toLowerCase().indexOf(searchTerm) === 0 ||
				option.note && option.note.toLowerCase().indexOf(searchTerm) === 0 ||
				option.secondary && option.secondary.toLowerCase().indexOf(searchTerm) === 0||
				option.searchable && option.searchable.toLowerCase().indexOf(searchTerm) === 0) {
				selectOption($ngModel, $ctrl, option);
				found = true;
			}
		});
		return found;
	}

	function isValidModel(value) {
		return value || value === 0 || value === false;
	}
})(window.angular);
