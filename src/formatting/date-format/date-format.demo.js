import angular from 'angular';
import template from './date-format.demo.html';

export default angular
  .module('tw.styleguide.demo.formatting.date-format', [])
  .component('twDateFormatDocs', {
    bindings: {
      locales: '<'
    },
    controller() {
      this.formats = [
        { value: 'short', label: 'short' },
        { value: 'medium', label: 'medium' },
        { value: 'long', label: 'long' }
      ];
      const now = new Date();
      this.dates = {
        now,

        lastHour: new Date(now.getTime() - (60 * 60 * 1000)),
        lastDay: new Date(now.getTime() - (24 * 60 * 60 * 1000)),
        lastWeek: new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)),
        lastMonth: new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)),
        lastYear: new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000)),

        nextHour: new Date(now.getTime() + (60 * 60 * 1000)),
        nextDay: new Date(now.getTime() + (24 * 60 * 60 * 1000)),
        nextWeek: new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)),
        nextMonth: new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)),
        nextYear: new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000))
      };
      this.timeChange = function () {
        if (!this.time) {
          return;
        }
        this.hours = parseInt(this.time.substring(0, 2), 10);
        this.minutes = parseInt(this.time.substring(2, 4), 10);

        if (this.model) {
          this.model.setHours(this.hours);
          this.model.setMinutes(this.minutes);
        }
      };
      this.dateChange = function () {
        this.model.setHours(this.hours);
        this.model.setMinutes(this.minutes);
      };
      this.hours = 12;
      this.minutes = 0;
    },
    template
  }).name;
