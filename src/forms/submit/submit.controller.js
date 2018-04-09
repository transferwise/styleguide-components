class SubmitController {
  constructor($q, $timeout, $element, DomService) {
    this.$timeout = $timeout;
    this.$q = $q;
    this.element = $element[0];
    this.dom = DomService;
  }

  $onInit() {
    this.state = 0;
    this.colour = 'blue';

    this.form = this.dom.getClosestParentByTagName(this.element, 'form');

    this.form.addEventListener('submit', () => {
      this.onSubmit();
      return true;
    });
  }

  $onChanges(changes) {
    if (changes.promise && changes.promise.currentValue) {
      this.onNewPromise();
    }
  }

  onNewPromise() {
    this.state = 0;
    this.promise
      .then(response => this.onPromiseSuccess(response))
      .catch(error => this.onPromiseFailure(error));
  }

  onSubmit() {
    this.isSpinnerVisible = true;
    this.isButtonDisabled = true;
    this.colour = 'blue';
    this.submitCallback();
    return true;
  }

  onPromiseSuccess(response) {
    this.state = 1;
    this.$timeout(() => {
      this.isButtonDisabled = false;
      if (this.successCallback) {
        this.successCallback();
      }
    }, 1500);
    return response;
  }

  onPromiseFailure(error) {
    this.state = -1;
    this.$timeout(() => {
      this.colour = 'red';
      this.isButtonDisabled = false;

      this.failureCallback();
    }, 1500);
    return error;
  }
}

SubmitController.$inject = ['$q', '$timeout', '$element', 'TwDomService'];

export default SubmitController;
