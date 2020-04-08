import angular from 'angular';
import template from './markdown.demo.html';

export default angular
  .module('tw.styleguide.demo.formatting.markdown', [])
  .component('twMarkdownDocs', {
    bindings: {
      markdown: '<'
    },
    controller() {
      // eslint-disable-next-line no-multi-str
      this.markdown = `# This is a heading
## This is a sub heading 
* item 1 
* item 2
1. item 1
2. item 2

**hello**  *world*
<div>this is a div and it should NOT be rendered</div>`;
    },
    template
  }).name;
