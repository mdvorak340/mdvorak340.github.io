/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@mdvorak340/dots/index.js":
/*!************************************************!*\
  !*** ./node_modules/@mdvorak340/dots/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   a: () => (/* binding */ a),\n/* harmony export */   attr: () => (/* binding */ attr),\n/* harmony export */   b: () => (/* binding */ b),\n/* harmony export */   br: () => (/* binding */ br),\n/* harmony export */   button: () => (/* binding */ button),\n/* harmony export */   className: () => (/* binding */ className),\n/* harmony export */   code: () => (/* binding */ code),\n/* harmony export */   dd: () => (/* binding */ dd),\n/* harmony export */   div: () => (/* binding */ div),\n/* harmony export */   dl: () => (/* binding */ dl),\n/* harmony export */   download: () => (/* binding */ download),\n/* harmony export */   dt: () => (/* binding */ dt),\n/* harmony export */   em: () => (/* binding */ em),\n/* harmony export */   fieldset: () => (/* binding */ fieldset),\n/* harmony export */   figcaption: () => (/* binding */ figcaption),\n/* harmony export */   figure: () => (/* binding */ figure),\n/* harmony export */   forId: () => (/* binding */ forId),\n/* harmony export */   form: () => (/* binding */ form),\n/* harmony export */   h1: () => (/* binding */ h1),\n/* harmony export */   h2: () => (/* binding */ h2),\n/* harmony export */   h3: () => (/* binding */ h3),\n/* harmony export */   h4: () => (/* binding */ h4),\n/* harmony export */   h5: () => (/* binding */ h5),\n/* harmony export */   h6: () => (/* binding */ h6),\n/* harmony export */   hr: () => (/* binding */ hr),\n/* harmony export */   href: () => (/* binding */ href),\n/* harmony export */   i: () => (/* binding */ i),\n/* harmony export */   id: () => (/* binding */ id),\n/* harmony export */   img: () => (/* binding */ img),\n/* harmony export */   input: () => (/* binding */ input),\n/* harmony export */   label: () => (/* binding */ label),\n/* harmony export */   legend: () => (/* binding */ legend),\n/* harmony export */   li: () => (/* binding */ li),\n/* harmony export */   main: () => (/* binding */ main),\n/* harmony export */   ol: () => (/* binding */ ol),\n/* harmony export */   on: () => (/* binding */ on),\n/* harmony export */   onchange: () => (/* binding */ onchange),\n/* harmony export */   onclick: () => (/* binding */ onclick),\n/* harmony export */   oncopy: () => (/* binding */ oncopy),\n/* harmony export */   oncut: () => (/* binding */ oncut),\n/* harmony export */   ondrag: () => (/* binding */ ondrag),\n/* harmony export */   ondragend: () => (/* binding */ ondragend),\n/* harmony export */   ondragenter: () => (/* binding */ ondragenter),\n/* harmony export */   ondragleave: () => (/* binding */ ondragleave),\n/* harmony export */   ondragover: () => (/* binding */ ondragover),\n/* harmony export */   ondragstart: () => (/* binding */ ondragstart),\n/* harmony export */   ondrop: () => (/* binding */ ondrop),\n/* harmony export */   oninput: () => (/* binding */ oninput),\n/* harmony export */   onkeydown: () => (/* binding */ onkeydown),\n/* harmony export */   onkeyup: () => (/* binding */ onkeyup),\n/* harmony export */   onmousedown: () => (/* binding */ onmousedown),\n/* harmony export */   onmousemove: () => (/* binding */ onmousemove),\n/* harmony export */   onmouseout: () => (/* binding */ onmouseout),\n/* harmony export */   onmouseover: () => (/* binding */ onmouseover),\n/* harmony export */   onmouseup: () => (/* binding */ onmouseup),\n/* harmony export */   onpaste: () => (/* binding */ onpaste),\n/* harmony export */   onscroll: () => (/* binding */ onscroll),\n/* harmony export */   onselect: () => (/* binding */ onselect),\n/* harmony export */   onsubmit: () => (/* binding */ onsubmit),\n/* harmony export */   onwheel: () => (/* binding */ onwheel),\n/* harmony export */   p: () => (/* binding */ p),\n/* harmony export */   pre: () => (/* binding */ pre),\n/* harmony export */   q: () => (/* binding */ q),\n/* harmony export */   rel: () => (/* binding */ rel),\n/* harmony export */   s: () => (/* binding */ s),\n/* harmony export */   search: () => (/* binding */ search),\n/* harmony export */   section: () => (/* binding */ section),\n/* harmony export */   select: () => (/* binding */ select),\n/* harmony export */   span: () => (/* binding */ span),\n/* harmony export */   strong: () => (/* binding */ strong),\n/* harmony export */   style: () => (/* binding */ style),\n/* harmony export */   sub: () => (/* binding */ sub),\n/* harmony export */   sup: () => (/* binding */ sup),\n/* harmony export */   table: () => (/* binding */ table),\n/* harmony export */   tag: () => (/* binding */ tag),\n/* harmony export */   target: () => (/* binding */ target),\n/* harmony export */   td: () => (/* binding */ td),\n/* harmony export */   textarea: () => (/* binding */ textarea),\n/* harmony export */   th: () => (/* binding */ th),\n/* harmony export */   tr: () => (/* binding */ tr),\n/* harmony export */   type: () => (/* binding */ type),\n/* harmony export */   u: () => (/* binding */ u),\n/* harmony export */   ul: () => (/* binding */ ul)\n/* harmony export */ });\n/**\n * Creates an HTML tag.  Many helper functions are provided as shortcuts for\n * creating commmon elements (see the example).\n * @param {string} name The tag name.\n * @param {...string | HTMLElement | Attr | EventContainer} children The\n * children/attributes/event handlers of the tag.  `HTMLElement`s are added as\n * is, `Attr`s are cloned and attached to the tag itself, `EventContainer`s are\n * attached via `addEventListener`, and all else is converted to `Text` nodes.\n * @returns {HTMLElement} The created HTML tag.\n * @example\n * \n *     const elementArray = [\n *       // Simple usage.\n *       tag('h1', 'A Header'),\n *       tag('p', 'A Paragraph'),\n *       // Using built-in helper functions.\n *       ul(\n *         li('A List Item'),\n *         li('A List Item'),\n *         li('A List Item', ' with multiple text nodes'),\n *       ),\n *       p(\n *         'Here\\'s a ',\n *         a(\n *           'hyperlink with an attribute',\n *           attr('href', 'https://www.spidersge.org'),\n *         ),\n *       ),\n *       button(\n *         'Click me!',\n *         on('click', () => alert('Clicked!')),\n *         attr('type', 'button'),\n *       ),\n *     ];\n * \n *     // Defining custom helper functions.\n *     const main = (...x) => tag('main', ...x);\n *     const app = main(...elementArray);\n */\nconst tag = (name, ...children) => {\n  const node = document.createElement(name);\n\n  const safeChildren = children\n    .map((child) => child instanceof HTMLElement ? child.cloneNode(true) :\n                    child instanceof Attr ? node.setAttributeNode(child.cloneNode()) :\n                    child instanceof EventContainer ? node.addEventListener(child.type, child.fn) :\n                    document.createTextNode(child))\n    .filter((child) => child !== null && child !== undefined);\n\n  node.replaceChildren(...safeChildren);\n  return node;\n}\n\n/**\n * Creates an HTML attribute.  Some helper functions are provided as shortcuts\n * for creating commmon attributes (see the example).  Due to namespace\n * restrictions, `class` is shortcuted as `className` and `for` as `forId`.\n * @param {string} key The attribute name.\n * @param {string} value The attribute value.\n * @returns {Attr} The attribute node.\n * @example\n * \n *     // Simple usage.\n *     const a1 = tag('a', 'An anchor tag', attr('href', 'https://example.com'));\n *     // Using built-in helper functions.\n *     const a2 = tag('a', 'An anchor tag', href('https://example.com'));\n *     // Defining custom helper functions.\n *     const download = (v) => attr('download', v);\n *     const a3 = tag('a', 'An anchor tag', download('some-file.txt'));\n */\nconst attr = (key, value) => {\n  const node = document.createAttribute(key);\n  node.value = value;\n  return node;\n}\n\n/**\n * @callback eventCallback\n * @param {Event} [event] The triggering event, if any.\n * @returns {undefined}\n */\n\n/**\n * An event container.  Serves only to represent a type-function pair for a\n * potential `tag.addEventListener(type, function)`.\n */\nclass EventContainer {\n  /**\n   * @param {string} type The event type.\n   * @param {eventCallback} fn The callback function.\n   */\n  constructor(type, fn) {\n    this.type = type;\n    this.fn = fn;\n  }\n}\n\n/**\n * Creates an event container.  Many helper functions are provided as shortcuts\n * for creating commmon event containers (see the example).\n * @param {string} type The event type.\n * @param {eventCallback} fn The callback function.\n * @returns {EventContainer} The event container.\n * @example\n *\n *     // Simple usage.\n *     const b1 = tag('button', 'Click me', on('click', () => alert('foo')));\n *     // Using built-in helper functions.\n *     const b2 = tag('button', 'Click me', onclick(() => alert('foo')));\n *     // Defining custom helper functions.\n *     const oncustomevent = (fn) => on('customevent', fn);\n *     const b3 = tag('button', 'Click me', oncustomevent(() => alert('foo')));\n */\nconst on = (type, fn) => {\n  return new EventContainer(type, fn);\n}\n\nconst h1 = (...x) => tag('h1', ...x);\nconst h2 = (...x) => tag('h2', ...x);\nconst h3 = (...x) => tag('h3', ...x);\nconst h4 = (...x) => tag('h4', ...x);\nconst h5 = (...x) => tag('h6', ...x);\nconst h6 = (...x) => tag('h6', ...x);\nconst a = (...x) => tag('a', ...x);\nconst b = (...x) => tag('b', ...x);\nconst br = (...x) => tag('br', ...x);\nconst button = (...x) => tag('button', ...x);\nconst code = (...x) => tag('code', ...x);\nconst dd = (...x) => tag('dd', ...x);\nconst div = (...x) => tag('div', ...x);\nconst dl = (...x) => tag('dl', ...x);\nconst dt = (...x) => tag('dt', ...x);\nconst em = (...x) => tag('em', ...x);\nconst fieldset = (...x) => tag('fieldset', ...x);\nconst figcaption = (...x) => tag('figcaption', ...x);\nconst figure = (...x) => tag('figure', ...x);\nconst form = (...x) => tag('form', ...x);\nconst hr = (...x) => tag('hr', ...x);\nconst i = (...x) => tag('i', ...x);\nconst img = (...x) => tag('img', ...x);\nconst input = (...x) => tag('input', ...x);\nconst label = (...x) => tag('label', ...x);\nconst legend = (...x) => tag('legend', ...x);\nconst li = (...x) => tag('li', ...x);\nconst ol = (...x) => tag('ol', ...x);\nconst p = (...x) => tag('p', ...x);\nconst pre = (...x) => tag('pre', ...x);\nconst q = (...x) => tag('q', ...x);\nconst s = (...x) => tag('s', ...x);\nconst section = (...x) => tag('section', ...x);\nconst select = (...x) => tag('select', ...x);\nconst span = (...x) => tag('span', ...x);\nconst strong = (...x) => tag('strong', ...x);\nconst sub = (...x) => tag('sub', ...x);\nconst sup = (...x) => tag('sup', ...x);\nconst table = (...x) => tag('table', ...x);\nconst td = (...x) => tag('td', ...x);\nconst textarea = (...x) => tag('textarea', ...x);\nconst th = (...x) => tag('th', ...x);\nconst tr = (...x) => tag('tr', ...x);\nconst u = (...x) => tag('u', ...x);\nconst ul = (...x) => tag('ul', ...x);\nconst main = (...x) => tag('main', ...x);\nconst search = (...x) => tag('search', ...x);\n\nconst id = (v) => attr('id', v);\nconst className = (v) => attr('class', v);\nconst style = (v) => attr('style', v);\nconst type = (v) => attr('type', v);\nconst href = (v) => attr('href', v);\nconst rel = (v) => attr('rel', v);\nconst target = (v) => attr('target', v);\nconst forId = (v) => attr('for', v);\nconst download = (v) => attr('download', v);\n\nconst onclick = (fn) => on('click', fn);\nconst onchange = (fn) => on('change', fn);\nconst oninput = (fn) => on('input', fn)\nconst onselect = (fn) => on('select', fn)\nconst onsubmit = (fn) => on('submit', fn)\nconst onkeydown = (fn) => on('keydown', fn)\nconst onkeyup = (fn) => on('keyup', fn)\nconst onmousedown = (fn) => on('mousedown', fn)\nconst onmousemove = (fn) => on('mousemove', fn)\nconst onmouseover = (fn) => on('mouseover', fn)\nconst onmouseup = (fn) => on('mouseup', fn)\nconst onwheel = (fn) => on('wheel', fn)\nconst onmouseout = (fn) => on('mouseout', fn)\nconst ondrag = (fn) => on('drag', fn)\nconst ondragend = (fn) => on('dragend', fn)\nconst ondragenter = (fn) => on('dragenter', fn)\nconst ondragleave = (fn) => on('dragleave', fn)\nconst ondragover = (fn) => on('dragover', fn)\nconst ondragstart = (fn) => on('dragstart', fn)\nconst ondrop = (fn) => on('drop', fn)\nconst onscroll = (fn) => on('scroll', fn)\nconst oncopy = (fn) => on('copy', fn)\nconst oncut = (fn) => on('cut', fn)\nconst onpaste = (fn) => on('paste', fn)\n\n\n//# sourceURL=webpack://dots-web/./node_modules/@mdvorak340/dots/index.js?");

/***/ }),

/***/ "./src/scripts.js":
/*!************************!*\
  !*** ./src/scripts.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mdvorak340_dots__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mdvorak340/dots */ \"./node_modules/@mdvorak340/dots/index.js\");\n\n\nconst jsLang = (0,_mdvorak340_dots__WEBPACK_IMPORTED_MODULE_0__.className)('language-js')\nconst dots = (0,_mdvorak340_dots__WEBPACK_IMPORTED_MODULE_0__.code)('dots', jsLang)\n\nconst codeBlock = (...x) => (0,_mdvorak340_dots__WEBPACK_IMPORTED_MODULE_0__.pre)((0,_mdvorak340_dots__WEBPACK_IMPORTED_MODULE_0__.code)(jsLang, ...x))\n\nconst doc = [\n  (0,_mdvorak340_dots__WEBPACK_IMPORTED_MODULE_0__.h1)(\n    dots,\n    ': an HTML Assembler'\n  ),\n  (0,_mdvorak340_dots__WEBPACK_IMPORTED_MODULE_0__.p)(\n    dots,\n    ' is a simple, dependency-free JavaScript library that can be used to',\n    ' create HTML content quickly.'\n  ),\n  codeBlock('const example = tag(\"p\", \"A simple example\")'),\n]\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.body.replaceChildren(...doc)\n})\n\n//# sourceURL=webpack://dots-web/./src/scripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts.js");
/******/ 	
/******/ })()
;