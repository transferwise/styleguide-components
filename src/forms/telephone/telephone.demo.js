import angular from 'angular';
import template from './telephone.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.telephone', [])
  .component('twTelephoneDocs', {
    bindings: {
      model: '=',
      locales: '<'
    },
    controller() {
      this.telephone = {
        countries: [
          {
            callingCode: '1', iso2Code: 'US', iso3Code: 'usa', name: 'United States of America'
          },
          {
            callingCode: '44', iso2Code: 'GG', iso3Code: 'ggy', name: 'Guernsey'
          },
          {
            callingCode: '44', iso2Code: 'GB', iso3Code: 'gbr', name: 'United Kingdom'
          },
          {
            callingCode: '33', iso2Code: 'FR', iso3Code: 'fra', name: 'France'
          }
        ],
        required: true
      };
      this.log = function (message) { console.log(`Telephone changed to ${message}`); };
    },
    template
  }).name;
