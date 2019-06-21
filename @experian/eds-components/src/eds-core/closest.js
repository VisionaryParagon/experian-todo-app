// Element.closest polyfill
// MODIFIED from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      // Add support for rare polyfill limitation (event handler on document)
      // Only required in IE11
      if (el.parentNode.__shady && el.parentNode.host) {
        el = el.parentNode.host;
      } else {
        el = el.parentElement || el.parentNode;
      }
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
