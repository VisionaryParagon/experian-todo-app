function insertStyle(container, id, stylesheet) {
  if (!container.querySelector(`style[data-id="${id}"]`)) {
    const style = document.createElement('style');
    style.setAttribute('data-id', id);
    style.appendChild(document.createTextNode(stylesheet));
    container.appendChild(style);
  }
}

export function addStyle(id, stylesheet, element) {
  let container;

  if (element && element.closest('html')) container = element.closest('html').querySelector('head');
  else container = document.head;

  insertStyle(container, id, stylesheet);
}
