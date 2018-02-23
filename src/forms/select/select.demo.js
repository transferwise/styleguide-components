import angular from 'angular';
import template from './select.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.select', [])
  .component('twSelectDocs', {
    bindings: {
      model: '='
    },
    controller() {
      this.select = {
        required: true,
        empty: 'Select an option...',
        type: 'standard',
        types: [
          { value: 'standard', label: 'Standard' },
          { value: 'icons', label: 'Icons' },
          { value: 'currencies', label: 'Currencies' },
          { value: 'notes', label: 'Notes' },
          { value: 'headers', label: 'Headers' },
          { value: 'secondary', label: 'Secondary text' },
          { value: 'searchable', label: 'Searchable text' },
          { value: 'circles', label: 'Circles' },
          { value: 'long', label: 'Long list' },
          { value: 'disabled', label: 'Disabled option' },
          { value: 'currencySelect', label: 'Example: Currency select' },
          { value: 'accountSelect', label: 'Example: Account select' }
        ],
        options: {
          standard: [
            { value: 0, label: 'Zero' },
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' }
          ],
          icons: [
            { value: { id: '1' }, label: 'Profile', icon: 'icon-profile' },
            { value: { id: '2' }, label: 'Globe', icon: 'icon-globe' },
            { value: { id: '3' }, label: 'Bank', icon: 'icon-bank' }
          ],
          currencies: [
            { value: 'eur', label: 'Euro', currency: 'EUR' },
            { value: 'gbp', label: 'British Pound', currency: 'GBP' },
            { value: 'usd', label: 'US Dollar', currency: 'USD' }
          ],
          notes: [
            { value: 'eur', label: 'EUR', note: 'Euro' },
            { value: 'gbp', label: 'GBP', note: 'Great British Pound' },
            { value: 'usd', label: 'USD', note: 'United States Dollar' }
          ],
          headers: [
            { header: 'Header' },
            { value: 'opt1', label: 'Option 1' },
            { header: 'Another header' },
            { value: 'opt2', label: 'Option 2' }
          ],
          secondary: [
            { value: '1', label: 'Bob Smith', secondary: 'Account ending 1234' },
            { value: '2', label: 'James Davies', secondary: 'Account ending 9876' },
            { value: '3', label: 'Helen Williams', secondary: 'Accont ending 4321' }
          ],
          searchable: [
            { value: 'eur', label: 'Euro', searchable: 'Austria, France, Germany, Spain' },
            { value: 'usd', label: 'Dollar', searchable: 'United States, Hong Kong, Saudi Arabia' },
            { value: 'gbp', label: 'Pound', searchable: 'Great britain, England, Scotland' }
          ],
          circles: [
            { value: '1', label: 'Bob Smith', circleImage: 'images/mike.jpg' },
            { value: '2', label: 'James Davies', circleIcon: 'icon-bank' },
            { value: '3', label: 'Helen Williams', circleText: 'AZ' }
          ],
          disabled: [
            { value: '1', label: 'Enabled option' },
            { value: '2', label: 'Disabled option', disabled: true },
            { value: '3', label: 'Second option' }
          ],
          currencySelect: [
            { header: 'Popular currencies' },
            {
              value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'
            },
            {
              value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'
            },
            {
              value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'
            },
            { header: 'All currencies' },
            {
              value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'
            }
          ],
          accountSelect: [
            {
              value: '1', label: 'Bob Smith', note: 'GBP', secondary: 'Account ending 1234', circleImage: 'images/mike.jpg'
            },
            {
              value: '2', label: 'James Davies', note: 'GBP', secondary: 'Account ending 9876', circleText: 'JD'
            },
            {
              value: '3', label: 'Helen Williams', note: 'EUR', secondary: 'Accont ending 4321', circleText: 'HW'
            }
          ],
          long: [{ header: 'example header' }]
        }
      };
      for (let i = 0; i < 999; i++) {
        this.select.options.long.push({ value: String(i), label: String(i) });
      }

      this.hideOptions = [
        { value: 'true', label: 'All widths' },
        { value: 'xs', label: 'xs grid' },
        { value: 'sm', label: 'sm grid' },
        { value: 'md', label: 'md grid' },
        { value: 'lg', label: 'lg grid' },
        { value: 'xl', label: 'xl grid' },
        { value: 'xs,sm', label: 'xs and sm grid' },
        { value: 'md,lg,xl', label: 'md, lg and xl grid' }
      ];

      this.gridSizes = [
        { value: 'xs', label: 'XSmall grids and wider' },
        { value: 'sm', label: 'Small grids and wider' },
        { value: 'md', label: 'Medium grids and wider' },
        { value: 'lg', label: 'Large grids and wider' },
        { value: 'xl', label: 'XLarge grids and wider' }
      ];

      this.dropdownSizes = [
        { value: 'sm', label: 'Small dropdown' },
        { value: 'md', label: 'Medium dropdown' },
        { value: 'lg', label: 'Large dropdown' }
      ];

      this.buttonSizes = [
        { value: 'sm', label: 'Small button' },
        { value: 'md', label: 'Medium button' },
        { value: 'lg', label: 'Large button' }
      ];

      this.log = function (message) { console.log(message); };
    },
    template
  }).name;
