angular.module("tw.form-styling", []);
!function(angular) {
    "use strict";
    function TwFormControlStyling() {
        return {
            restrict: "C",
            link: FocusableLink
        };
    }
    function TwFocusable() {
        return {
            restrict: "A",
            link: FocusableLink
        };
    }
    function FocusableLink(scope, element) {
        var formGroup = $(element).closest(".form-group");
        $(element).on("focus", function() {
            formGroup.addClass("focus");
        }).on("blur", function() {
            formGroup.removeClass("focus");
        });
    }
    angular.module("tw.form-styling").directive("formControl", TwFormControlStyling), 
    angular.module("tw.form-styling").directive("twFocusable", TwFocusable);
}(window.angular), function(angular) {
    function TwInputStyling() {
        function onFocus() {
            $(this).closest(".form-group").addClass("focus"), $(this).closest(labelSelector).addClass("focus");
        }
        function onBlur() {
            $(this).closest(".form-group").removeClass("focus"), $(this).closest(labelSelector).removeClass("focus");
        }
        function onClick(event) {
            fakeClick(this), event.stopPropagation();
        }
        function fakeClick(buttonReplacement) {
            var formControl = $(buttonReplacement).closest("label").find("input");
            "undefined" != typeof formControl[0] && (MouseEvent ? formControl[0].dispatchEvent(new MouseEvent("click", {
                view: window,
                bubbles: !0,
                cancelable: !0
            })) : formControl.click());
        }
        function onKeypress(event) {
            13 === (event.keyCode ? event.keyCode : event.which) && fakeClick(this);
        }
        function link(scope, element, attrs, ctrl) {
            if (attrs.type) {
                var type = attrs.type.toLowerCase();
                if (("radio" === type || "checkbox" === type) && 0 !== $(element).closest(labelSelector).length) {
                    var replacement;
                    replacement = "radio" === type ? $(radioTemplate) : $(checkboxTemplate), replacement.keypress(onKeypress).click(onClick).focus(onFocus).blur(onBlur), 
                    $(element).addClass("sr-only").after(replacement), replacement.after(disabledReplacement);
                }
            }
        }
        var labelSelector = ".checkbox > label, .radio > label", checkboxTemplate = "<button type='button' class='input-replacement'><span class='glyphicon glyphicon-ok'></span></button>", radioTemplate = "<button type='button' class='input-replacement'><span></span></button>", disabledReplacement = "<span class='disabled-replacement input-replacement'><span></span></span>";
        return {
            restrict: "EA",
            link: link
        };
    }
    angular.module("tw.form-styling").directive("twInput", TwInputStyling);
}(window.angular), function(angular) {
    "use strict";
    function TwSelectDirective() {
        return {
            require: "ngModel",
            bindToController: !0,
            controller: [ "$element", "$scope", "$transclude", TwSelectController ],
            controllerAs: "$ctrl",
            replace: !1,
            transclude: !0,
            restrict: "EA",
            scope: {
                ngModel: "=",
                ngRequired: "=",
                ngDisabled: "=",
                ngChange: "&",
                ngBlur: "&",
                options: "=",
                name: "@",
                disabled: "@",
                required: "@",
                placeholder: "@"
            },
            template: " 				<div class='btn-group btn-block tw-select' aria-hidden='true'> 					<button type='button' class='btn btn-input dropdown-toggle' 						data-toggle='dropdown' aria-expanded='false' 						ng-disabled='$ctrl.ngDisabled' 						tw-focusable> 						<span class='tw-select-selected' ng-if='$ctrl.ngModel != null'> 							<i class='icon {{$ctrl.selected.icon}}' ng-if='$ctrl.selected && $ctrl.selected.icon'> 							</i><i class='currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}' ng-if='$ctrl.selected && $ctrl.selected.currency'> 							</i><span class='selected-label'>{{$ctrl.selected.label}}</span> 						</span> 						<span class='form-control-placeholder' ng-if='$ctrl.ngModel == null'>{{$ctrl.placeholder}}</span> 						<span class='caret'></span> 					</button> 					<ul class='dropdown-menu' role='menu'> 						<li ng-class='{active: !$ctrl.ngModel}' 							ng-if='$ctrl.placeholder && !$ctrl.ngRequired'> 							<a href='' value='' class='tw-select-placeholder' tw-focusable> 								{{$ctrl.placeholder}} 							</a> 						</li> 						<li ng-if='$ctrl.placeholder && !$ctrl.ngRequired' class='divider'></li> 						<li 							ng-repeat='option in $ctrl.options' 							ng-class='{active: $ctrl.ngModel === option.value}'> 							<a href='' value='{{option.value}}' class='tw-select-option' tw-focusable> 								<i class='icon {{option.icon}}' ng-if='option.icon'> 								</i><i class='currency-flag currency-flag-{{option.currency | lowercase}}' ng-if='option.currency'> 								</i>{{option.label}} 							</a> 						</li> 						<li ng-if='$ctrl.hasTranscluded' class='divider'></li> 						<li ng-transclude ng-if='$ctrl.hasTranscluded' class='tw-select-transcluded'></li> 					</ul> 				</div> 				<input type='hidden' class='tw-select-hidden' 					name='{{$ctrl.name}}' 					value='{{$ctrl.ngModel}}' 					ng-disabled='$ctrl.ngDisabled' /> "
        };
    }
    function TwSelectController($element, $scope, $transclude) {
        var $ctrl = this, options = $ctrl.options, $ngModel = $element.controller("ngModel");
        $ctrl.search = "", preSelectModelValue($ngModel, $ctrl, options), setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl), 
        addWatchers($ctrl, $scope, $ngModel), addEventHandlers($ctrl, $element, $ngModel, options), 
        checkForTranscludedContent($transclude, $ctrl);
    }
    function addWatchers($ctrl, $scope, $ngModel) {
        $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            (newValue || oldValue) && newValue !== oldValue && $ngModel.$setDirty(), modelChange(newValue, oldValue, $ctrl);
        });
    }
    function addEventHandlers($ctrl, $element, $ngModel, options) {
        $element.find(".btn, .dropdown-menu").on("focusout", function() {
            setTimeout(function() {
                0 !== $element.find(".btn:focus").length || $element.find(".btn-group").hasClass("open") || $element.trigger("blur");
            }, 150);
        }), $element.on("blur", function(event) {
            $ngModel.$setTouched();
        }), $element.find(".btn").on("keypress", function(event) {
            var characterCode = getCharacterFromKeypress(event);
            continueSearchAndSelectMatch($ngModel, $ctrl, options, characterCode), $element.find(".active a").focus();
        }), $element.find(".btn").on("click", function() {
            setTimeout(function() {
                $element.find(".active a").focus();
            });
        }), $element.find("ul").on("click", "a", function(event) {
            $element.find(".btn").focus(), optionFocus(event, options, $ngModel, $ctrl, this);
        }), $element.find("ul").on("focus", "a", function(event) {
            optionFocus(event, options, $ngModel, $ctrl, this);
        }), $element.find("ul").on("keypress", "a", function(event) {
            var characterCode = getCharacterFromKeypress(event);
            continueSearchAndSelectMatch($ngModel, $ctrl, options, characterCode), $element.find(".active a").focus();
        });
    }
    function checkForTranscludedContent($transclude, $ctrl) {
        $transclude(function(clone) {
            (clone.length > 1 || "" !== clone.text().trim()) && ($ctrl.hasTranscluded = !0);
        });
    }
    function getCharacterFromKeypress(event) {
        return String.fromCharCode(event.which || event.charCode || event.keyCode);
    }
    function optionFocus(event, options, $ngModel, $ctrl, optionElement) {
        if ($(event.target).hasClass("tw-select-option")) {
            var option = findOptionFromValue(options, optionElement.getAttribute("value"));
            selectOption($ngModel, $ctrl, option);
        } else $(event.target).hasClass("tw-select-placeholder") && resetOption($ngModel, $ctrl);
    }
    function preSelectModelValue($ngModel, $ctrl, options) {
        if ($ctrl.ngModel) {
            var option = findOptionFromValue(options, $ctrl.ngModel);
            selectOption($ngModel, $ctrl, option);
        }
    }
    function modelChange(newVal, oldVal, $ctrl) {
        if (newVal !== oldVal) {
            var option = findOptionFromValue($ctrl.options, newVal);
            option ? $ctrl.selected = option : $ctrl.selected = null;
        }
    }
    function findOptionFromValue(options, value) {
        var optionMatch = !1;
        return options.forEach(function(option) {
            String(option.value) === String(value) && (optionMatch = option);
        }), optionMatch;
    }
    function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
        ($ctrl.ngRequired || $attrs.required) && !$ctrl.ngModel && $ctrl.options[0] && selectOption($ngModel, $ctrl, $ctrl.options[0]);
    }
    function selectOption($ngModel, $ctrl, option) {
        $ngModel.$setViewValue(option.value), $ctrl.selected = option;
    }
    function resetOption($ngModel, $ctrl) {
        $ngModel.$setViewValue(null), $ctrl.selected = !1;
    }
    function continueSearchAndSelectMatch($ngModel, $ctrl, options, letter) {
        var found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
        return found ? $ctrl.search += letter : ($ctrl.search = letter, found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search)), 
        found;
    }
    function searchAndSelect($ngModel, $ctrl, options, term) {
        var found = !1, searchTerm = term.toLowerCase();
        return options.forEach(function(option) {
            found || 0 === option.label.toLowerCase().indexOf(searchTerm) && (selectOption($ngModel, $ctrl, option), 
            found = !0);
        }), found;
    }
    angular.module("tw.form-components").directive("twSelect", TwSelectDirective);
}(window.angular);