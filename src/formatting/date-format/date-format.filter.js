
function DateFormatFilter(TwDateService) {
  return (date, locale, format) => {
    if (!date) {
      return date;
    }
    let utcDate = date;

    if (typeof date === 'string') {
      // utcDate = TwDateService.getUTCDateFromIso(date);
      utcDate = new Date(date);

      const dateOnly = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'); // yyyy-mm-dd
      if (dateOnly.test(date)) {
        if (!utcDate) { return date; }

        return TwDateService.getUTCDateString(utcDate, locale, format);
      }
    }

    if (!utcDate) { return date; }
    // Use locale timezone
    const ret = TwDateService.getLocaleDateString(utcDate, locale, format);
    return ret;
  };
}

DateFormatFilter.$inject = ['TwDateService'];

export default DateFormatFilter;
