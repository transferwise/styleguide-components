import { svgIconSprite } from '@transferwise/icons';

import template from './icon.html';

class Controller {
  $onInit() {
    this.document = document;

    this.appendSpriteToPageIfNotOnPageYet();
  }

  appendSpriteToPageIfNotOnPageYet() {
    if (!this.spriteIsOnPage()) {
      this.appendSpriteToPage();
    }
  }

  spriteIsOnPage() {
    return !!this.document.querySelector('.svg-icon-sprite-container');
  }

  appendSpriteToPage() {
    const div = this.document.createElement('div');
    div.style.display = 'none';
    div.classList.add('svg-icon-sprite-container');

    div.innerHTML = svgIconSprite;

    this.document.body.insertBefore(div, this.document.body.childNodes[0]);
  }
}

const TwIcon = {
  template,
  controller: Controller,
  bindings: {
    name: '@',
    size: '@?',
  },
};

export default TwIcon;
