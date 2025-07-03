import { button, input, output, h1, form, on, fieldset, legend, label, hr, table, tr, td, p, details, summary, ul, li, pre, code, a, samp, footer, main, header, datalist, option } from 'ellipsi'

const knownWebSockets = [
  'wss://ws.vi-server.org/mirror',
]

const ConnectionOptions = datalist(
  { id: 'connection-options' },
  knownWebSockets.map((ws) => option({ value: ws })),
)

const ConnectionInput = input({
  type: 'text',
  id: 'connection',
  list: ConnectionOptions.id,
  placeholder: knownWebSockets[0],
})

const MessageInput = input({ type: 'text', id: 'message' })

const FormButton = (...x) => button({ type: 'button' }, ...x)

const ConnectButton = FormButton('Connect', { id: 'connect-button' })
const DisconnectButton = FormButton('Disconnect', { id: 'disconnect-button' })
const SendButton = FormButton('Send', { id: 'send-button' })

const Outgoing = output({ id: 'outgoing' })
const Incoming = output({ id: 'incoming' })
const Status = output({ id: 'status' })

let conn = null;

const handleOpen = () => {
  Status.setAttribute('type', 'open')
}

const handleMessage = (event) => {
  Incoming.prepend(pre(code(event.data)), hr())
}

const handleClose = () => {
  Status.setAttribute('type', 'closed')
  conn = null
}

const handleError = () => {
  Status.setAttribute('type', 'failed')
  conn = null
}

const handleForm = (event) => {
  const target = event.target;
  const type = event.type;
  const key = type === 'keydown' ? event.key : null;

  switch (true) {
    case target === ConnectionInput && key === 'Enter':
    case target === ConnectButton && type === 'click':
      if (ConnectionInput.value) {
        try {
          conn = new WebSocket(ConnectionInput.value)
          Status.setAttribute('type', 'loading')
          conn.addEventListener('open', handleOpen)
          conn.addEventListener('message', handleMessage)
          conn.addEventListener('close', handleClose)
          conn.addEventListener('error', handleError)
        } catch (e) {
          console.error(e)
          Status.setAttribute('type', 'failed')
        }
      }
      break;

    case target === DisconnectButton && type === 'click':
      if (conn?.readyState === WebSocket.OPEN) {
        conn.close()
      }
      break;

    case target === MessageInput && key === 'Enter':
    case target === SendButton && type === 'click':
      if (MessageInput.value && conn?.readyState === WebSocket.OPEN) {
        conn.send(MessageInput.value)
        Outgoing.prepend(pre(code(MessageInput.value)), hr())
      }
      break;
  }
}

const Sources = [
  a(
    'MDN Docs for WebSocket API',
    { href: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket' },
  ),
  a(
    'MDN Docs for CSS Grid',
    { href: 'https://developer.mozilla.org/en-US/docs/Glossary/Grid' },
  ),
  a(
    'Blog post about Event Delegation',
    { href: 'https://javascript.info/event-delegation' },
  ),
  a(
    'Plain HTML page on TCP sockets in C',
    { href: 'https://www.cs.rpi.edu/~moorthy/Courses/os98/Pgms/socket.html' },
  ),
  a(
    'Stack overflow on reading from sockets in C',
    { href: 'https://stackoverflow.com/questions/666601/what-is-the-correct-way-of-reading-from-a-tcp-socket-in-c-c' },
  ),
  a(
    'CLI tool for probing websockets',
    { href: 'https://github.com/vi/websocat' },
  )
]

const Doc = [
  header(
    h1('Websocket Pertubation & Response'),
    p('A simple interface for making and probing websocket connections using the WebSocket API.'),
  ),
  main(
    form(
      on('click keydown', handleForm),
      fieldset(
        legend('Input'),
        label('Connection URL', { for: ConnectionInput.id }),
        ConnectionInput,
        ConnectionOptions,
        ConnectButton,
        DisconnectButton,
        hr(),
        label('Connection status', { for: Status.id }),
        Status,
        hr(),
        label('Message', { for: MessageInput.id }),
        MessageInput,
        SendButton,
      ),
      fieldset(
        legend('Output'),
        table(
          tr(
            td(label('Pertubation', { for: Outgoing.id }), { class: 'nosmall' }),
            td(label('Response', { for: Incoming.id })),
          ),
          tr(
            td(samp(Outgoing), { class: 'nosmall' }),
            td(samp(Incoming)),
          ),
        ),
      ),
    ),
    details(
      summary('Sources'),
      ul(Sources.map((source) => li(source))),
    ),
  ),
  footer(
    p(
      'by Mozzie Dvorak // with ',
      a('Ellipsi', { href: 'https://www.npmjs.com/package/ellipsi' }),
      ' // view ',
      a('page source', { href: 'https://github.com/mdvorak340/mdvorak340.github.io/tree/main/ws' }),
    ),
  ),
]

const loadContent = () => {
  document.body.replaceChildren(...Doc)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadContent)
} else {
  loadContent()
}
