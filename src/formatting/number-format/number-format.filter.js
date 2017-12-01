
function NumberFormatFilter() {
  return (number, locale, precision) => {
    if (!number) {
      return number;
    }

    if (typeof number === 'string' && Number(number)) {
      number = Number(number);
    }

    const options = {};
    if (typeof precision === 'number') {
      options.minimumFractionDigits = precision;
      options.maximumFractionDigits = precision;

      if (!isNumberLocaleSupported()) {
        return number.toFixed(precision);
      }
    }

    if (locale) {
      return number.toLocaleString(locale, options);
    }
    return number.toLocaleString('en-GB', options);
  };
}

function isNumberLocaleSupported() {
  const num = 1234;
  const numString = num.toLocaleString('en-GB');
  return numString === '1,234';
}

export default NumberFormatFilter;
