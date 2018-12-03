
class YearCalendarController {
  constructor(TwDateService) {
    this.DateService = TwDateService;

    this.yearOffset = 0;
  }
  selectYear($event, year) {
    $event.stopPropagation();
    if (this.isYearDisabled(year)) {
      return;
    }
    this.year = year;
    if (this.onChange) {
      this.onChange({ year: this.year });
    }
  }

  calculateYear(row, column) {
    return (this.year - (this.year % 20)) + row + column + this.yearOffset;
  }

  setYearOffset($event, addtionalOffset) {
    $event.stopPropagation();
    this.yearOffset += addtionalOffset;
  }

  isYearDisabled(year) {
    return (this.minYear && year < this.minYear) || (this.maxYear && year > this.maxYear);
  }
}


export default YearCalendarController;
