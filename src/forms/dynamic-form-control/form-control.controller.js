
class FormControlController {
  constructor($element) {
    this.$element = $element;
    this.element = $element[0];
  }

  $onInit() {
    const $ngModel = this.$element.controller('ngModel');
    console.log(this.type);
    console.log(this.element.querySelector('[ng-model]'));
    console.log(this.element.querySelector('input'));

    $ngModel.$validators.minlength = (modelValue, viewValue) => {
      const value = modelValue || viewValue;
      if (this.type !== 'string' || !this.ngMinlength) {
        return true;
      }
      return !value || value.length >= this.ngMinlength;
    };

    $ngModel.$validators.maxlength = (modelValue, viewValue) => {
      const value = modelValue || viewValue;
      if (this.type !== 'string' || !this.ngMaxlength) {
        return true;
      }
      return !value || value.length <= this.ngMaxlength;
    };

    // Min and max do not work on custom elements, add manual validators
    $ngModel.$validators.min = (modelValue, viewValue) => {
      const value = modelValue || viewValue;
      if (typeof this.ngMin === 'undefined') {
        return true;
      }
      if (typeof value === 'number' &&
        typeof this.ngMin === 'number' &&
        value < this.ngMin) {
        return false;
      }
      if (value &&
        value.getUTCDate &&
        this.ngMin.getUTCDate &&
        value < this.ngMin) {
        return false;
      }
      return true;
    };

    $ngModel.$validators.max = (modelValue, viewValue) => {
      const value = modelValue || viewValue;
      if (typeof this.ngMax === 'undefined') {
        return true;
      }
      if (typeof value === 'number' &&
        typeof this.ngMax === 'number' &&
        value > this.ngMax) {
        return false;
      }
      if (value &&
        viewValue.getUTCDate &&
        this.ngMax.getUTCDate &&
        value > this.ngMax) {
        return false;
      }
      return true;
    };

    if (this.validationAsync) {
      // TODO add to ngModel async validators
      // TODO create data package
      // $http({
      //   method: this.validationAsync.method || 'POST',
      //   url: this.validationAsync.url
      // });
    }
  }

  change(value) {
    console.log(this.$ngModel.$valid);
    this.$ngModel.$setDirty();
    if (this.ngChange) {
      // don't fire change for the radio button becoming false
      if (this.type === 'radio' && this.ngModel !== value) {
        return;
      }
      this.ngChange({ newValue: value });
    }
  }

  focus() {
    this.element.dispatchEvent(new CustomEvent('focus'));
  }

  blur() {
    this.$ngModel.$setTouched();
    this.element.dispatchEvent(new CustomEvent('blur'));
  }
}

FormControlController.$inject = ['$element'];

export default FormControlController;
