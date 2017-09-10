
function DomService() {
  this.getClosestParentByTagName = (element, tagName) => {
    const tagNameUpper = tagName.toUpperCase();
    let parent = element;

    while (parent) {
      parent = parent.parentNode;
      if (parent && parent.tagName && parent.tagName.toUpperCase() === tagNameUpper) {
        return parent;
      }
    }
    return null;
  };

  this.getClosestParentByClassName = (element, className) => {
    let parent = element;

    while (parent) {
      parent = parent.parentNode;
      if (parent && parent.classList && parent.classList.contains(className)) {
        return parent;
      }
    }
    return null;
  };
}

export default DomService;
