import { svgIconSprite } from '@transferwise/icons';

import template from './icon.html';

const CONTAINER_CLASS = 'svg-icon-sprite-container';

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
    return !!this.document.querySelector(`.${CONTAINER_CLASS}`);
  }

  appendSpriteToPage() {
    const div = this.document.createElement('div');
    div.style.display = 'none';
    div.classList.add(CONTAINER_CLASS);

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
