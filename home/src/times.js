import { time } from 'ellipsi'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Julu', 'August', 'September', 'October', 'November', 'December']

const loop = (ms, fn) => {
    const trueloop = async () => {
        fn()
        setTimeout(trueloop, ms)
    }
    trueloop()
}

export const UnixTime = (refreshRate_ms) => {
    const This = time()
    loop(refreshRate_ms, () => This.innerText = Date.now())
    return This
}

export const UTCTime = (refreshRate_ms) => {
    const This = time()
    loop(refreshRate_ms, () => This.innerText = new Date().toUTCString())
    return This
}

export const ISOTime = (refreshRate_ms) => {
    const This = time()
    loop(refreshRate_ms, () => This.innerText = new Date().toISOString())
    return This
}

export const DateTime = (refreshRate_ms) => {
    const This = time()
    loop(refreshRate_ms, () => {
        const now = new Date()
        This.innerText
            = days[now.getDay()] + ', '
            + months[now.getMonth()] + ' '
            + now.getDate() + ', '
            + now.getFullYear()
    })
    return This
}
