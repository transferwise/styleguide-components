class TelephoneController {
  constructor() {
    this.prefixes = [];
  }

  $onChanges(changes) {
    if (changes.countries && changes.countries.currentValue) {
      this.formatCountriesToPrefixes();
      this.explodeNumberModel(this.ngModel);
    }

    if (changes.ngModel && changes.ngModel.currentValue) {
      if (validNumber(this.ngModel)) {
        this.explodeNumberModel(this.ngModel);
      }
    }
  }

  sendNewNumberToCallback(newNumber) {
    this.ngChange({ newNumber });
  }

  explodeNumberModel(number) {
    this.prefix = findPrefixByNumber(number, this.countries);
    if (this.prefix) {
      this.localNumber = number.substring(this.prefix.callingCode.length + 1);
    } else {
      this.setDefaultPrefix();
    }
  }

  updatePrefix(prefix) {
    this.ngModel = buildCompleteNumber(prefix.callingCode, this.localNumber);
    this.sendNewNumberToCallback(this.ngModel);
  }

  updateLocalNumber(localNumber) {
    this.ngModel = buildCompleteNumber(this.prefix.callingCode, localNumber);
    this.sendNewNumberToCallback(this.ngModel);
  }

  setDefaultPrefix() {
    this.prefix = findPrefixByNumber('+44', this.countries);
    this.sendNewNumberToCallback(this.ngModel);
  }

  formatCountriesToPrefixes() {
    this.prefixes = [];
    this.countries.forEach((country) => {
      this.prefixes.push({
        value: country,
        label: `+${country.callingCode}`,
        note: country.name,
      });
    });
  }
}

function validNumber(number) {
  return typeof number === 'string'
    && number.length > 4
    && number.substring(0, 1) === '+';
}

function buildCompleteNumber(prefix, localNumber) {
  if (localNumber) {
    return `+${prefix}${localNumber}`;
  }
  return `+${prefix}`;
}

function findPrefixByNumber(number, countries) {
  if (countries && countries.length && number && number.length > 2) {
    return countries.filter(country => number.substring(1).indexOf(country.callingCode) === 0)[0];
  }
  return undefined;
}

TelephoneController.$inject = [
];

export default TelephoneController;
