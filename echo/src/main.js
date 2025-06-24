import { code, div, footer, h1, kbd, p, pre, q } from 'ellipsi'
import hljs from 'highlight.js'

const ErrorPage = (...x) => div({ class: 'error-page' }, ...x)
const UrlBlock = (...x) => pre({ class: 'language-plaintext' }, code(...x))

const validUrl = 'mdvorak340.github.io/echo/?url=https://your.target.com'

const ErrorPageNoSource = () => [
  ErrorPage(
    h1('ERROR : No URL given'),
    p('To load a page and view its source, navigate to'),
    UrlBlock(validUrl),
  ),
]

const ErrorPageBadSource = (href) => [
  ErrorPage(
    h1('ERROR : Bad URL'),
    p('Failed to load the given URL (', q(code(href)), ').'),
    p('The proper way to target a URL is'),
    UrlBlock(validUrl),
  ),
]

const SuccessPage = (SourceContent) => [
  SourceContent,
]

const LoadSource = async (href) => {
  const text = await fetch(href).then((resp) => resp.text())
  return pre(code(text))
}

const main = async () => {
  let Page = []

  assembly: {
    const params = new URLSearchParams(window.location.search)

    if (!params.has('url')) {
      Page = ErrorPageNoSource()
      break assembly
    }

    const href = params.get('url')
    try {
      const SourceContent = await LoadSource(href)
      document.title += ': ' + href
      Page = SuccessPage(SourceContent)
    } catch {
      Page = ErrorPageBadSource(href)
    }
  }

  document.body.replaceChildren(...Page, footer('Site by Mozzie Dvorak'))
  hljs.highlightAll()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => await main)
} else {
  await main()
}
