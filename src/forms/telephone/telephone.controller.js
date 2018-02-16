import countryList from './countries.json';

class TelephoneController {
  constructor($element, $timeout, LocaleService) {
    this.$element = $element;
    this.$timeout = $timeout;
    this.LocaleService = LocaleService;
    this.countries = countryList;
  }

  $onInit() {
    this.$ngModel = this.$element.controller('ngModel');

    // Use formatters pipeline to split values passed in
    this.$ngModel.$formatters.unshift((modelValue) => {
      this.explodeNumberModel(modelValue);
      return modelValue;
    });

    this.callingCodes = codesToOptions(countryList);

    this.charactersPermitted = /^[0-9\s.-]*$/;
    this.charactersToRemove = /[\s.-]/g;

    // Once loaded add a parser to remove special characters from suffix
    this.$timeout(() => {
      this.suffixModelController =
        this.$element.find('input[type=tel]').controller('ngModel');
      this.suffixModelController.$parsers.unshift(viewValue => viewValue.replace(this.charactersToRemove, ''));
    });
  }

  $onChanges(changes) {
    if (changes.locale && !this.ngModel) {
      this.setDefaultPrefix();
    }
  }

  explodeNumberModel(number) {
    const country = findCountryByPrefix(number, this.countries);
    if (country && isValidPhoneNumber(number)) {
      this.prefix = country.phone;
      this.suffix = number.substring(country.phone.length);
      this.format = country.phoneFormat || '';
    } else {
      this.setDefaultPrefix();
    }
  }

  onPrefixChange(prefix) {
    const country = findCountryByPrefix(prefix, this.countries);
    if (country) {
      this.format = country.phoneFormat || '';
    }
    this.onValueChange(prefix, this.suffix);
  }

  onSuffixChange() {
    this.onValueChange(
      this.prefix,
      // This shouldn't be necessary as $parser did it already, but otherwise test fails...
      this.suffix && this.suffix.replace(this.charactersToRemove, '')
    );
  }

  onValueChange(prefix, suffix) {
    let combined;
    // TODO safer to rely on validity in case we change to allowInvalid
    if (suffix) {
      combined = `${prefix}${suffix}`;
    } else {
      combined = null;
    }

    this.$ngModel.$setViewValue(combined);
  }

  setDefaultPrefix() {
    const localeCountry = this.LocaleService.getCountryFromLocale(this.locale);
    const country = findCountryByCode(localeCountry, this.countries);

    if (country) {
      this.prefix = country.phone;
      this.format = country.phoneFormat || '';
    } else {
      this.prefix = '+44';
    }
  }

  onFocus() {
    this.$element[0].dispatchEvent(new CustomEvent('focus'));
  }
  onBlur() {
    this.$element[0].dispatchEvent(new CustomEvent('blur'));
  }
}

function isValidPhoneNumber(phoneNumber) {
  return typeof phoneNumber === 'string'
    && phoneNumber.length > 4
    && phoneNumber.substring(0, 1) === '+';
}

function findCountryByPrefix(number, countries) {
  if (countries && countries.length && number && number.length > 1) {
    // Find longest matching prefix
    const matchingCodes = countries.filter(country => number.indexOf(country.phone) === 0);

    if (matchingCodes && matchingCodes.length) {
      return matchingCodes.reduce((a, b) => (a.phone.length > b.phone.length ? a : b));
    }
  }
  return undefined;
}

function findCountryByCode(code, countries) {
  if (countries && countries.length && code && code.length === 2) {
    // Find longest matching prefix
    const matchingCodes = countries.filter(country => code === country.iso2);

    if (matchingCodes && matchingCodes.length) {
      return matchingCodes.reduce((a, b) => (a.phone.length > b.phone.length ? a : b));
    }
  }
  return undefined;
}

function generatePrefixMap(countries) {
  const diallingCodeMap = {};

  countries.forEach((country) => {
    if (!diallingCodeMap[country.phone]) {
      diallingCodeMap[country.phone] = {
        code: country.phone,
        iso3: [],
        names: []
      };
    }
    diallingCodeMap[country.phone].iso3.push(country.iso3);
    diallingCodeMap[country.phone].names.push(country.name);
  });

  return diallingCodeMap;
}

function codesToOptions(countries) {
  const diallingCodeMap = generatePrefixMap(countries);

  return Object.keys(diallingCodeMap)
    .sort((a, b) => (parseInt(a.substring(1), 10) < parseInt(b.substring(1), 10) ? -1 : 1))
    .map(phone => ({
      value: phone,
      label: phone,
      note: diallingCodeMap[phone].iso3.join(', '),
      searchable: diallingCodeMap[phone].names.join(', ')
    }));
}

TelephoneController.$inject = [
  '$element',
  '$timeout',
  'TwLocaleService'
];

export default TelephoneController;
