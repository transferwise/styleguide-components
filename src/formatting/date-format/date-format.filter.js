
function DateFormatFilter(TwDateService) {
  return (dateSupplied, locale, format) => {
    if (!dateSupplied) {
      return dateSupplied;
    }
    let date = dateSupplied;

    if (typeof date === 'string') {
      date = TwDateService.getUTCDateFromIso(date);

      const dateOnly = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'); // yyyy-mm-dd
      if (dateOnly.test(dateSupplied)) {
        return TwDateService.getUTCDateString(date, locale, format);
      }
    }

    if (!date) { return dateSupplied; }
    // Use locale timezone
    return TwDateService.getLocaleDateString(date, locale, format);
  };
}

DateFormatFilter.$inject = ['TwDateService'];

export default DateFormatFilter;
