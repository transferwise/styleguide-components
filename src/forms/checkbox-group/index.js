import angular from 'angular';
import CheckboxGroup from './checkbox-group.component.js';
import DomService from '../../services/dom';
import Focusable from '../focusable';

export default angular
  .module('tw.styleguide.forms.checkbox-group', [
    DomService,
    Focusable
  ])
  .component('twCheckboxGroup', CheckboxGroup).name;
