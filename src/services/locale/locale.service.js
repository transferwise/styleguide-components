function LocaleService() {
  this.locale = 'en-GB';
  this.regex = /^[a-z]{2}(-[A-Z][A-Z])?$/;
  this.lowerCaseCountry = /^[a-z]{2}(-[a-z][a-z])?$/;

  this.getCurrent = () => this.locale;

  this.setCurrent = (newLocale) => {
    if (this.isValid(newLocale)) {
      this.locale = newLocale;
      return this.locale;
    }

    if (this.lowerCaseCountry.test(newLocale)) {
      this.locale = changeCountryToUpperCase(newLocale);
      return this.locale;
    }

    if (console && console.warn) { // eslint-disable-line
      console.warn(`Incorrect locale: ${newLocale}`); // eslint-disable-line
    }
    this.locale = 'en-GB';
    return this.locale;
  };

  this.isValid = testLocale => this.regex.test(testLocale);

  function changeCountryToUpperCase(lowerCaseLocale) {
    return lowerCaseLocale.slice(0, 3) + lowerCaseLocale.slice(3, 5).toUpperCase();
  }
}

export default LocaleService;
