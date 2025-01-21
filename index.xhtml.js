/**
 * Main scripts for index.xhtml of Wiqipedia.  Loads the page passed via URL
 * search parameters.
 * @author Mozzie Dvorak
 */

if (document.readyState != 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}

function main() {
  defineCustomElements();

  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has('page') || urlParams.get('page') == 'home') {
    openPage('home');
  } else {
    let pageId = urlParams.get('page');
    let xhrPage = document.getElementById('xhr-page');
    fillWithXhr(
      xhrPage,
      pageId,
      () => openPage(pageId),
      () => openPage('not-found-error')
    );
  }
}

function copyCode(button) {
  let slot = button.previousElementSibling.querySelector('slot');
  let code = slot.assignedNodes()[0].textContent;
  navigator.clipboard.writeText(code);
}

function saveCode(button) {
  console.error('!!! not implemented');
}

function openPage(id) {
  let page = document.querySelector(`wiqi-page#${id}`);

  if (page) {
    page.setAttribute('open', '');
  } else {
    console.warn('??? attempted to open page that doesn\'t exist');
  }
}

function defineCustomElements() {
  let templates = document.querySelectorAll('template');

  templates.forEach((template) => {
    customElements.define(
      template.id,
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' })
              .appendChild(template.content.cloneNode(true));
        }
      }
    )
  });
}

/**
 * Callback function that takes no arguments and returns nothing.
 * @callback NullCallback
 * @returns {null}
 */

/**
 * Sets the inner HTML of the given element to the contents fetched from the
 * XHTML file located at the given xhr path.  Calls the success callback on a
 * success, and the error callback on a failure.
 * @param {Element} element The outer element that will be filled with the
 * xhr content.
 * @param {string} xhrPath The path to the xhr content within the xhr
 * folder.  The path starts within the xhr folder and does not include a file
 * extension.
 * @param {NullCallback} successCallBack The callback function called on a
 * success.  Defaults to () => null.
 * @param {NullCallback} errorCallBack The callback function called on a
 * failure.  Defaults to () => null.
 * @returns {null}
 */
function fillWithXhr(
  element,
  xhrPath,
  successCallBack = () => null,
  errorCallBack = () => null
) {
  let filePath = `./xhr/${xhrPath}.xhtml`;
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      switch (this.status) {
        case 200:
          element.innerHTML = this.responseText;
          successCallBack();
          break;
        default:
          errorCallBack();
      }
    }
  }

  xhr.open("GET", filePath, true);
  xhr.send();
}
