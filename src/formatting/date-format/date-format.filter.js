
function DateFormatFilter(TwDateService) {
  return (date, locale, format) => {
    if (!date) {
      return date;
    }

    if (typeof date === 'string' && new Date(date)) {
      date = new Date(date);
    }

    if (format === 'long') {
      return TwDateService.getLocaleFullDate(date, locale);
    }

    return TwDateService.getLocaleDateString(date, locale, format === 'short');
  };
}

DateFormatFilter.$inject = ['TwDateService'];

export default DateFormatFilter;
