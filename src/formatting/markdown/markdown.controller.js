import commonmark from 'commonmark';

class MarkdownController {
  constructor($element, $sce) {
    this.$element = $element;
    this.$sce = $sce;

    this.reader = new commonmark.Parser();
    this.writer = new commonmark.HtmlRenderer({ safe: true });
  }

  $onChanges(changes) {
    if (changes.markdown) {
      this.render();
    }
  }

  render() {
    if (!this.markdown) {
      this.html = '';
      return;
    }
    const parsed = this.reader.parse(this.markdown);
    const result = this.writer.render(parsed);

    this.html = this.$sce.trustAsHtml(result);
  }
}


MarkdownController.$inject = [
  '$element',
  '$sce',
];

export default MarkdownController;
