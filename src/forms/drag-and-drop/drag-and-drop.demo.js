import angular from 'angular';
import template from './drag-and-drop.demo.html';

function controller() {
  this.onEnter = () => {
    console.log('Drag enter'); // eslint-disable-line
    this.dragging = true;
    this.dropped = false;
  };
  this.onLeave = () => {
    console.log('Drag leave'); // eslint-disable-line
    this.dragging = false;
  };
  this.onDrop = (files) => {
    console.log('Files dropped', files); // eslint-disable-line
    this.dragging = false;
    this.dropped = true;
  };
}

export default angular
  .module('tw.styleguide.demo.forms.drag-and-drop', [])
  .component('twDragAndDropDocs', {
    controller,
    template
  }).name;
