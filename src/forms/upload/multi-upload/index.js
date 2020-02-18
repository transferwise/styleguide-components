import angular from 'angular';
import MultiUpload from './multi-upload.component';
import Droppable from '../droppable';
import ProcessingCard from '../processing-card';

export default angular
  .module('tw.styleguide.forms.upload.multi', [
    Droppable,
    ProcessingCard
  ])
  .component('twMultiUpload', MultiUpload)
  .name;
