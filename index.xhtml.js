/**
 * Main scripts for index.xhtml of Wiqipedia.  Loads xhttp to fill includes and
 * loads the page passed via URL search parameters.
 * @author Mozzie Dvorak
 */

if (document.readyState != 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}

function main() {
  /**
   * The search parameters within the URL, e.g. ?page=home
   * @type {URLSearchParams}
   */
  const urlParams = new URLSearchParams(window.location.search);

  /**
   * The target container that will hold the page loaded via xhttp.
   * @type {Element}
   */
  const xhttpPage = document.querySelector('wiqi-js-target#xhttp-page');

  fillWiqiIncludes();  // Start loading includes.

  if (!urlParams.has('page') || urlParams.get('page') == 'home') {
    openPage('home');
  } else if (xhttpPage) {
    let pageId = urlParams.get('page');
    fillWithXHttp(
      xhttpPage,
      `pages/${pageId}`,
      () => { openPage(pageId); fillWiqiIncludes(xhttpPage); },
      () => openPage('not-found-error')
    );
  } else {
    console.error('!!! xhttp page is undefined');
  }
}

/**
 * The page that is currently open, if any.
 * @type {?Element}
 */
var previousPage = null;

/**
 * If the given id corresponds to a wiqi-page, open it and close the previously
 * opened page.  Else, do nothing.
 * @param {string} id The id of the target page.
 * @returns {boolean} Whether or not the page was opened (i.e. if the page
 * exists).
 */
function openPage(id) {
  let page = document.querySelector(`wiqi-page#${id}`);

  if (!page) {
    console.error('!!! page that does not exist was opened: ' + id);
    return false;
  }

  page.setAttribute('open', '');
  if (previousPage) {
    previousPage.removeAttribute('open');
  }
  previousPage = page;
  return true;
}

/**
 * Recursively fill all wiqi-includes with their xhttp content.
 * @param {Element} element The root element within which to search for
 * wiqi-includes.  Defaults to the whole document.
 * @returns {null}
 */
function fillWiqiIncludes(element = document) {
  let includes = element.querySelectorAll('wiqi-include');

  includes.forEach((include) => {
    fillWithXHttp(
      include,
      include.id,
      () => fillWiqiIncludes(include),
      () => include.innerText = "ERROR: bad include."
    );
  });
}

/**
 * Callback function that takes no arguments and returns nothing.
 * @callback NullCallback
 * @returns {null}
 */

/**
 * Sets the inner HTML of the given element to the contents fetched from the
 * XHTML file located at the given xhttp path.  Calls the success callback on a
 * success, and the error callback on a failure.
 * @param {Element} element The outer element that will be filled with the
 * xhttp content.
 * @param {string} xhttpPath The path to the xhttp content within the xhttp
 * folder.  The path starts within the xhttp folder and does not include a file
 * extension.
 * @param {NullCallback} successCallBack The callback function called on a
 * success.  Defaults to () => null.
 * @param {NullCallback} errorCallBack The callback function called on a
 * failure.  Defaults to () => null.
 * @returns {null}
 */
function fillWithXHttp(
  element,
  xhttpPath,
  successCallBack = () => null,
  errorCallBack = () => null
) {
  if (!element) {
    console.warn('??? No element given to include ' + xhttpPath);
    return;
  }
  if (!xhttpPath) {
    console.warn('??? No path given to include ' + element);
    return;
  }

  let filePath = `./xhttp/${xhttpPath}.xhtml`;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
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

  xhttp.open("GET", filePath, true);
  xhttp.send();
}
