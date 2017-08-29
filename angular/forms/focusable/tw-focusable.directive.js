
/* TODO deprecate in V1, opt-in through tw-focusable */
angular
  .module('tw.styleguide.styling.default-focus', [])
  .directive('formControl', TwFormControlStyling);

function TwFormControlStyling() {
  return {
    restrict: 'C',
    link: FocusableLink
  };
}


function TwFocusable() {
  return {
    restrict: 'A',
    link: FocusableLink
  };
}

function FocusableLink(scope, element) {
  var formGroup = $(element).closest('.form-group');

  $(element)
    .on('focus', function() {
      formGroup.addClass('focus');
    })
    .on('blur', function() {
      formGroup.removeClass('focus');
    });
}

export default angular
  .module('tw.styleguide.forms.focusable', [])
  .directive('twFocusable', TwFocusable).name;
