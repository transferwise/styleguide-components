
function DateFormatFull(TwDateService) {
  return (date, locale) => {
    if (!date) {
      return date;
    }

    if (typeof date === 'string' && new Date(date)) {
      date = new Date(date);
    }

    return TwDateService.getLocaleFullDate(date, locale);
  };
}

DateFormatFull.$inject = ['TwDateService'];

export default DateFormatFull;
