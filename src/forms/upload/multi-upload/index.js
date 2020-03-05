import angular from 'angular';
import MultiUpload from './multi-upload.component';
import DragAndDrop from '../../drag-and-drop';
import ProcessingCard from '../processing-card';

export default angular
  .module('tw.styleguide.forms.upload.multi', [
    ProcessingCard,
    DragAndDrop
  ])
  .component('twMultiUpload', MultiUpload)
  .name;
