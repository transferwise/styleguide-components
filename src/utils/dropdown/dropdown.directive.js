
function TwDropdown($document) {
  return {
    restrict: 'A',
    link: (scope, $element) => {
      const document = $document[0];
      const trigger = $element[0];
      const parent = trigger.parentNode;
      const dropdown = parent.getElementsByClassName('dropdown-menu')[0];

      const open = () => {
        // closeAll(); // TODO is this ok?
        parent.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      };

      const close = () => {
        parent.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      };

      const closeAll = () => {
        console.log('close all');
        // const doc = $document[0];
        let openDropdown;
        let openTrigger;
        const openDropdowns = document.getElementsByClassName('open');

        console.log(document.getElementsByTagName('div'));
        console.log(`openDropdowns ${openDropdowns.length}`);

        for (let i = 0; i < openDropdowns.length; i++) {
          openDropdown = openDropdowns.item(i);
          openDropdown.classList.remove('open');
          openTrigger = openDropdown.querySelector('[tw-dropdown]')[0];
          if (openTrigger) {
            openTrigger.setAttribute('aria-expanded', 'false');
          } else {
            console.log('no trigger found');
          }
        }
      };

      const onTriggerClick = (event) => {
        console.log('onTriggerClick');
        // TODO parent = Dom.getClosestParentByClassName('dropdown');
        if (parent.classList.contains('open')) {
          close();
        } else {
          open();
        }
        console.log('catch click at trigger');
        event.stopPropagation();
      };

      const onParentClick = (event) => {
        // Clicks within dropdown should not propogate to document
        console.log('catch click at parent');
        event.stopPropagation();
      };

      const onDropdownClick = (event) => {
        if (event.target.tagName.toLowerCase() === 'a') {
          close();
          trigger.focus();
        }
      };

      const onDropdownKeypress = (event) => {
        console.log('dropdown keypress');
        console.log(event.target.tagName);
        if (event.target.tagName.toLowerCase() === 'a') {
          keyHandler(event);
        }
      };

      const onTriggerKeypress = (event) => {
        if (event.keyCode === keys.down) {
          open();
        }
        console.log('trigger keypress');
        console.log(event.target.tagName);
        keyHandler(event);
      };

      const keyHandler = (event) => {
        const characterCode = event.which || event.charCode || event.keyCode;
        console.log(characterCode);
        if (characterCode === keys.up) {
          event.preventDefault(); // Prevent browser scroll
          moveUpOneLink();
        } else if (characterCode === keys.down) {
          event.preventDefault(); // Prevent browser scroll
          moveDownOneLink();
        }
      };

      const onDocumentClick = () => {
        console.log('document click');
        closeAll();
      };

      parent.addEventListener('click', onParentClick);

      trigger.addEventListener('click', onTriggerClick);
      // trigger.addEventListener('keypress', onTriggerKeypress);
      trigger.addEventListener('keydown', onTriggerKeypress);

      dropdown.addEventListener('click', onDropdownClick);
      // dropdown.addEventListener('keypress', onDropdownKeypress);
      dropdown.addEventListener('keydown', onDropdownKeypress);

      if (!window.twDropdownInitialised) {
        console.log('add body listener');
        window.twDropdownInitialised = true;
        const body = document.getElementsByTagName('body')[0];
        body.addEventListener('click', onDocumentClick);
      }

      const moveDownOneLink = () => {
        console.log('move down');
        const links = dropdown.querySelectorAll('li a');
        console.log(links);
        let found = false;
        for (let i = 0; i < links.length; i++) {
          if (links[i] === document.activeElement && links[i + 1]) {
            console.log(`Focus ${i}`);
            links[i + 1].focus();
            found = true;
            break;
          }
        }

        if (!found && links[0]) {
          console.log('not found');
          links[0].focus();
        }
      };

      const moveUpOneLink = () => {
        console.log('move up');
        const links = dropdown.querySelectorAll('li a');
        let found = false;
        for (let i = 0; i < links.length; i++) {
          if (links[i] === document.activeElement && links[i - 1]) {
            links[i - 1].focus();
            found = true;
            break;
          }
        }

        if (!found && links.length) {
          links[links.length - 1].focus();
        }
      };

      // TODO clicking a different dropdown, doesn't close other open ones.
    }
  };
}

TwDropdown.$inject = ['$document'];

const keys = {
  up: 38,
  down: 40
};

export default TwDropdown;
