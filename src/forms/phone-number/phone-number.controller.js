class PhoneNumberController {
  constructor() {
    this.prefixes = [];
  }

  $onInit() {
    this.prefix = findPrefixByNumber(this.ngModel, this.countries);
    if (this.prefix) {
      this.localNumber = this.ngModel.substring(this.prefix.callingCode.length + 1);
    } else {
      this.prefix = findPrefixByNumber('+44', this.countries);
    }
  }

  $onChanges(changes) {
    if (changes.countries && changes.countries.currentValue) {
      this.prefixes = [];
      this.countries.forEach((country) => {
        this.prefixes.push({
          value: country,
          label: `+${country.callingCode}`,
          note: country.name,
        });
      });
      this.prefix = findPrefixByNumber(this.ngModel, this.countries);
    }

    if (changes.ngModel && changes.ngModel.currentValue) {
      this.prefix = findPrefixByNumber(this.ngModel, this.countries);
      this.localNumber = this.ngModel.substring(this.prefix.callingCode.length + 1);
    }

    if (changes.ngModel && changes.ngModel.defaultCountry && !this.prefix) {
      this.prefix = this.defaultCountry;
    }
  }

  updatePrefix(prefix) {
    this.ngModel = buildCompleteNumber(prefix.callingCode, this.localNumber);
  }

  updateLocalNumber(localNumber) {
    this.ngModel = buildCompleteNumber(this.prefix.callingCode, localNumber);
  }
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

PhoneNumberController.$inject = [
];

export default PhoneNumberController;
