import { className, code, h1, p, pre } from '@mdvorak340/dots'

const jsLang = className('language-js')
const dots = code('dots', jsLang)

const codeBlock = (...x) => pre(code(jsLang, ...x))

const doc = [
  h1(
    dots,
    ': an HTML Assembler'
  ),
  p(
    dots,
    ' is a simple, dependency-free JavaScript library that can be used to',
    ' create HTML content quickly.'
  ),
  codeBlock('const example = tag("p", "A simple example")'),
]

document.addEventListener('DOMContentLoaded', () => {
  document.body.replaceChildren(...doc)
})