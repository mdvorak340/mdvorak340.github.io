import { header, footer, section, h1, p, dl, dt, dd, span } from 'ellipsi'
import DrawingCanvas from './DrawingCanvas.js'
import { DateTime, UnixTime, UTCTime, ISOTime } from './times.js'
import Notepad from './Notepad.js'

const AllCaps = (...x) => span({ class: 'ac' }, ...x)

const Page = [
    header(
        p('Welcome back, ', AllCaps('user')),
        h1('Today is ', DateTime(60_000)),
    ),
    section({ id:'dates' },
        dl(
            dt('Unix'),
            dd(UnixTime(50)),
            dt('UTC'),
            dd(UTCTime(50)),
            dt('ISO'),
            dd(ISOTime(50)),
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
        DrawingCanvas(600, 400),
    ),
    section({ id: 'notes' },
        Notepad(),
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
