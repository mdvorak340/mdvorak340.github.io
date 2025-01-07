var includes = document.querySelectorAll('wiqi-include');

includes.forEach((include) => {
  applyHTMLSnippet(include);
});

/**
 * Fetches an HTML snippet and applies it to its element.
 * @param {HTMLElement} element The HTML element beind filled with the include.
 * @returns Nothing.
 */
function applyHTMLSnippet(element) {
  if (!element.id) {
    console.log('??? include lacks id: ' + element);
    return;
  }

  let filePath = `./${element.id}.html`;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      switch (this.status) {
        case 200:
          element.innerHTML = this.responseText;
          let additional = element.querySelectorAll('wiqi-include');
          additional.forEach((addition) => {
            applyHTMLSnippet(addition);
          });
          break;
        case 404:
          console.log('!!! error 404 looking for: ' + e);
          break;
        default:
          console.log('??? undefined behavior when including: ' + this.status);
      }
    }
  }

  xhttp.open("GET", filePath, false);
  xhttp.send();
}

const urlParams = new URLSearchParams(window.location.search);

const defaultPage = getPage('mozzie');
const errorPage = getPage('error');

if (!urlParams.has('page')) {
  defaultPage.setAttribute('open', '');
} else {
  let targetPage = getPage(urlParams.get('page'));
  ((targetPage) ? targetPage : errorPage).setAttribute('open', '');
}

/**
 * Get the DOM element of page using its id.
 * @param {String} id The id of the page.
 * @returns The page's DOM element, if it exists.
 */
function getPage(id) {
  return document.querySelector(`wiqi-page#${id}`);
}
