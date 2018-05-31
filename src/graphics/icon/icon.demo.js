import angular from 'angular';
import template from './icon.demo.html';

import Icon from './';

export default angular.module('tw.styleguide.demo.layout.icon', [Icon]).component('twIconDocs', {
  controller() {
    this.name = 'bank';
    this.nameSelect = [
      { value: 'bank', label: 'bank' },
      { value: 'globe', label: 'globe' },
      { value: 'emoji', label: 'emoji' },
      { value: 'barcode', label: 'barcode' },
      { value: 'alert', label: 'alert' },
      { value: 'balance', label: 'balance' },
      { value: 'phone', label: 'phone' },
      { value: 'money', label: 'money' },
      { value: 'profile', label: 'profile' },
      { value: 'passport', label: 'passport' },
    ];
    this.size = 'lg';
    this.sizeSelect = [
      { value: 'sm', label: 'sm' },
      { value: 'md', label: 'md' },
      { value: 'lg', label: 'lg' },
      { value: 'xl', label: 'xl' },
      { value: 'xxl', label: 'xxl' },
    ];
  },
  template,
}).name;
