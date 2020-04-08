import angular from 'angular';
import MarkdownComponent from './markdown.component';

export default angular
  .module('tw.styleguide.formatting.markdown', [])
  .component('twMarkdown', MarkdownComponent)
  .name;
