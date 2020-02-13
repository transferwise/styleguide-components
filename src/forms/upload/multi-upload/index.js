import angular from 'angular';
import MultiUpload from './multi-upload.component';
import Droppable from '../droppable';

export default angular
  .module('tw.styleguide.forms.upload.multi', [Droppable])
  .component('twMultiUpload', MultiUpload)
  .name;
