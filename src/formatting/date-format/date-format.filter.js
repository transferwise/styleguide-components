
function DateFormatFilter(TwDateService) {
  return (date, locale, format) => {
    if (!date) {
      return date;
    }

    if (typeof date === 'string' && new Date(date)) {
      const kebabCase = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'); // yyyy-mm-dd
      const yyyymmdd = new RegExp('^[0-9]{8}$');
      const noTimeInfo = kebabCase.test(date) || yyyymmdd.test(date);

      try {
        date = new Date(date);
      } catch (error) {
        return date;
      }
      if (noTimeInfo) {
        // Treat as UTC
        return TwDateService.getUTCDateString(date, locale, format);
      }
    }

    return TwDateService.getLocaleDateString(date, locale, format);
  };
}

DateFormatFilter.$inject = ['TwDateService'];

export default DateFormatFilter;
