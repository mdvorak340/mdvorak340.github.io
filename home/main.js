import { time, header, footer, section, h1, p, dl, dt, dd, canvas, on, button, span, textarea } from 'ellipsi'
const AllCaps = (...x) => span({ class: 'ac' }, ...x)

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Julu', 'August', 'September', 'October', 'November', 'December']

const loop = (ms, fn) => {
    const trueloop = async () => {
        fn()
        setTimeout(trueloop, ms)
    }
    trueloop()
}

const UnixTime = time()
loop(50, () => UnixTime.innerText = Date.now())

const UTCTime = time()
loop(50, () => UTCTime.innerText = new Date().toUTCString())

const ISOTime = time()
loop(50, () => ISOTime.innerText = new Date().toISOString())

const DateTime = time()
loop(60_000, () => {
    const now = new Date()
    DateTime.innerText
        = days[now.getDay()] + ', '
        + months[now.getMonth()] + ' '
        + now.getDate() + ', '
        + now.getFullYear()
})

let isDrawing = false
let canvasMemory = localStorage.getItem('canvas')?.split(' ') || []
const storeCanvas = () => {
    localStorage.setItem('canvas', canvasMemory.join(' '))
}
const loadCanvas = async (context) => {
    if (canvasMemory) {
        canvasMemory.forEach((command) => {
            const type = command[0]
            const [x, y] = command.slice(1).split(',')
            switch (type) {
                case 'M':
                    context.moveTo(x, y)
                    break;
                case 'L':
                    context.lineTo(x, y)
                    context.stroke()
                    break;
            }
        })
    }
}

const relativeXY = (event, Element) => {
    return [event.pageX - Element.offsetLeft, event.pageY - Element.offsetTop]
}

const DrawingCanvas = canvas(
    { width: 600, height: 400 },
    on('mousedown', (event) => {
        isDrawing = true
        context.beginPath()
        const position = relativeXY(event, DrawingCanvas)
        context.moveTo(...position)
        canvasMemory.push('M' + position.join(','))
    }),
    on('mouseup', () => {
        isDrawing = false
        storeCanvas()
    }),
    on('mousemove', (event) => {
        if (isDrawing) {
            const position = relativeXY(event, DrawingCanvas)
            context.lineTo(...position)
            context.stroke()
            canvasMemory.push('L' + position.join(','))
        }
    }),
    on('mouseenter', (event) => {
        if (isDrawing) {
            const position = relativeXY(event, DrawingCanvas)
            context.moveTo(...position)
            canvasMemory.push('M' + position.join(','))
        }
    }),
)
const context = DrawingCanvas.getContext('2d')
loadCanvas(context)

const ClearCanvasButton = button(
    'Clear canvas',
    on('click', () => {
        context.clearRect(0, 0, DrawingCanvas.width, DrawingCanvas.height)
        canvasMemory = []
        storeCanvas()
    }),
)

const Notes = textarea(
    {
        spellcheck: false,
        placeholder: 'Notes…',
    },
    localStorage.getItem('notes') || null,
    on('keydown blur', () => localStorage.setItem('notes', Notes.value)),
)

const Page = [
    header(
        p('Welcome back, ', AllCaps('user')),
        h1('Today is ', DateTime),
    ),
    section({id:'dates'},
        dl(
            dt('Unix'),
            dd(UnixTime),
            dt('UTC'),
            dd(UTCTime),
            dt('ISO'),
            dd(ISOTime),
        ),
    ),
    section({ id: 'stats' },
        dl(
            dt('Hostname'),
            dd(location.hostname || 'No host'),
            dt('Port #'),
            dd(location.port || 'No port number'),
        )
    ),
    section({ id: 'draw' },
        DrawingCanvas,
        ClearCanvasButton,
    ),
    section({ id: 'notes' },
        Notes,
    ),
    footer(
        p(AllCaps('mdvorak'))
    ),
]

const main = () => {
    document.body.replaceChildren(...Page)
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main)
} else {
    main()
}
