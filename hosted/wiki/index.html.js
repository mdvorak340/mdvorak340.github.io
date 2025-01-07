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
