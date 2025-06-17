// Initial imports.
import { button, caption, className, code, dd, dl, dt, em, figure, footer, h1, h2, hr, id, onclick, p, pre, table, td, tr } from '@mdvorak340/dots'

// Syntax highlighting; external package.
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', xml)

// Some helper functions.
const jsCode = (...x) => code(className('language-javascript'), ...x)
const htmlCode = (...x) => code(className('language-html'), ...x)
const jsCodeBlock = (...x) => pre(jsCode(...x))
const htmlCodeBlock = (...x) => pre(htmlCode(...x))

// The contents of the <dl />; contains the 3 important functions.
const dlContents = [
  dt(jsCode('tag(name, ...children)')),
  dd(
    'The main function; used to create tags of the given name.  The children',
    ' can be either ', jsCode('HTMLElement'), 's, attributes, event handlers,',
    ' or plain strings.',
    figure(
      jsCodeBlock('tag("h1", "A Header")'),
      jsCodeBlock(`tag("ul",\n  tag("li", "A List Item"),\n)`),
    ),
  ),
  dt(jsCode('attr(key, ...values)')),
  dd(
    'Used to create HTML attributes (', jsCode('Attr'), 's).  Takes a simple',
    ' key/value pair of strings.',
    figure(
      jsCodeBlock('attr("href", "https://www.spidersge.org")'),
      jsCodeBlock('attr("class", "centered", "container")'),
    ),
  ),
  dt(jsCode('on(event, function)')),
  dd(
    'Used to create event handlers (of a custom class, ',
    jsCode('EventContainer'), ').  Takes the event name as a string (e.g.',
    ' "click") and a callback function.',
    figure(jsCodeBlock('on("click", () => alert("Clicked!"))')),
  ),
]

// The code <table /> comparing the JS to the generated HTML.
const tableOfCode = table(
  caption('A simple example using shortcut functions.'),
  tr(
    td(jsCodeBlock(`const link = a(\n  "Explanation of Cats",\n  href("https://en.wikipedia.org/wiki/Cat"),\n)\nconst app = main(\n  h1("Example", style("color:#44c")),\n  p("Here is a link: ", link),\n  button("Click me!", onclick(() => alert("mrow"))),\n)`)),
    td(htmlCodeBlock(`<main>\n  <h1 style="color:#44c">Example</h1>\n  <p>\n    Here is a link:\n    <a href="https://en.wikipedia.org/wiki/Cat"\n       >Explanation of Cats</a>\n  </p>\n  <button>Click me!</button>\n</main>`)),
  ),
)

// Fetch this file for use as the extended example.
const thisCode = await fetch('./src/scripts.js')
  .then(resp => resp.text())

// The name of library, complete with stylization.
const libName = code('dots', className('fancy'))

const pageContent = [
  h1(libName, ': an HTML Assembler'),
  p(
    libName,
    ' is a simple, dependency-free JavaScript library that can be used to',
    ' create HTML content quickly.'
  ),
  figure(jsCodeBlock(`const myButton = button(\n  "Click me!",\n  id("my-button"),\n  onclick(() => alert("Hello, World!")),\n)`)),
  button(
    "Click me!",
    id("my-button"),
    onclick(() => alert("Hello, World!")),
  ),
  hr(),
  p('The library consists of 3 primary functions:'),
  dl(...dlContents),
  p(
    'There are also a large number of pre-defined helper functions for common',
    ' tags, attributes, and events, such as:',
  ),
  tableOfCode,
  hr(),
  h2('Extended Example'),
  p(
    'This entire page is actually an example!  But yea, ', em('normally'),
    ' I would not recommend writing your page like this — ', libName, ' is',
    ' intended to be used to write HTML procedurally, not declaratively.',
  ),
  p('Here is the page source:'),
  figure(jsCodeBlock(thisCode)),
  footer(p('by Mozzie Dvorak')),
]

// The main function of the program, not related to `dots`.
const main = () => {
  document.body.replaceChildren(...pageContent)
  hljs.highlightAll()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}
