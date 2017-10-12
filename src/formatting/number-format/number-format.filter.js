
function NumberFormatFilter() {
  return (number, locale, precision) => {
    if (!number) {
      return number;
    }

    if (typeof number === 'number' && Number(number)) {
      number = Number(number);
    }

    const options = {};
    if (precision) {
      options.minimumFractionDigits = precision;
      options.maximumFractionDigits = precision;
    }
    if (locale) {
      return number.toLocaleString(locale, options);
    }
    return number.toLocaleString('en-GB', options);
  };
}


export default NumberFormatFilter;
