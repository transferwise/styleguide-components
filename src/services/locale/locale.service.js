function LocaleService() {
  this.locale = 'en-GB';
  this.regex = /^[a-z]{2}(-[A-Z][A-Z])?$/;
  this.lowerCaseCountry = /^[a-z]{2}(-[a-z][a-z])?$/;

  this.get = () => this.locale;

  this.set = (newLocale) => {
    if (this.isValid(newLocale)) {
      this.locale = newLocale;
      return this.locale;
    }

    if (this.lowerCaseCountry.test(newLocale)) {
      this.locale = changeCountryToUpperCase(newLocale);
      return this.locale;
    }

    throw new Error('Invalid locale');
  };

  this.isValid = testLocale => this.regex.test(testLocale);

  function changeCountryToUpperCase(lowerCaseLocale) {
    return lowerCaseLocale.slice(0, 3) + lowerCaseLocale.slice(3, 5).toUpperCase();
  }
}

export default LocaleService;
