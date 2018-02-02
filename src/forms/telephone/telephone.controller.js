import countryList from './countries.json';

class TelephoneController {
  constructor($element, $timeout, LocaleService) {
    this.$ngModel = $element.controller('ngModel');
    this.$element = $element;
    this.$timeout = $timeout;
    this.LocaleService = LocaleService;
    this.countries = countryList;
  }

  $onInit() {
    this.callingCodes = codesToOptions(countryList);
    this.permittedCharacters = /^[0-9\s.-]*$/;

    // Once loaded add a parser to remove special characters
    this.$timeout(() => {
      const suffixModelController = this.$element.find('input[type=tel]').controller('ngModel');
      suffixModelController.$parsers.unshift(viewValue => viewValue.replace(/[\s.-]/g, ''));
    });
  }

  $onChanges(changes) {
    if (changes.ngModel) {
      if (changes.ngModel.currentValue && validNumber(this.ngModel)) {
        this.explodeNumberModel(this.ngModel);
      }
    }

    if (changes.locale && !this.ngModel) {
      this.setDefaultPrefix();
    }
  }

  explodeNumberModel(number) {
    const country = findCountryByPrefix(number, this.countries);
    if (country) {
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

  onSuffixChange(suffix) {
    this.onValueChange(this.prefix, suffix);
  }

  onValueChange(prefix, suffix) {
    const combined = buildCompleteNumber(prefix, suffix);
    this.$ngModel.$setViewValue(combined);
    this.ngChange({ newNumber: combined });
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

function validNumber(number) {
  return typeof number === 'string'
    && number.length > 4
    && number.substring(0, 1) === '+';
}

function buildCompleteNumber(prefix, suffix) {
  if (suffix) {
    return `${prefix}${suffix}`;
  }
  return `${prefix}`;
}

function findCountryByPrefix(number, countries) {
  if (countries && countries.length && number && number.length > 1) {
    // Find longest matching prefix
    return countries
      .filter(country => number.indexOf(country.phone) === 0)
      .reduce((a, b) => (a.phone.length > b.phone.length ? a : b));
  }
  return undefined;
}

function findCountryByCode(code, countries) {
  if (countries && countries.length && code && code.length === 2) {
    // Find longest matching prefix
    return countries
      .filter(country => code === country.iso2)
      .reduce((a, b) => (a.phone.length > b.phone.length ? a : b));
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
