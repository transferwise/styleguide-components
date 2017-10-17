// Polyfill for IE 9, 10, 11 CustomEvents, see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
const customEventsPolyfill = () => {
  console.log('Heiaa pleiaaa sleiaaa');
  if (typeof window.CustomEvent === 'function') {
    return false;
  }

  function CustomEvent(event, params) {
    const evt = document.createEvent('CustomEvent');
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  return true;
};

export default customEventsPolyfill;
