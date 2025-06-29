import { canvas, on, button, div } from 'ellipsi'

let numCanvases = 0

const relativePosition = (event, Element) => {
    return [event.pageX - Element.offsetLeft, event.pageY - Element.offsetTop]
}

export default function DrawingCanvas(width, height) {
    const canvasID = 'canvas-' + numCanvases++

    let isDrawing = false
    let context = null
    let canvasMemory = []

    const storeCanvas = () => {
        localStorage.setItem(canvasID, canvasMemory.join(' '))
    }

    const act = (type, args) => {
        switch (true) {
            case type === 'M' && args.length === 2:
                context.moveTo(...args)
                canvasMemory.push('M' + args.join(','))
                break
            case type === 'L' && args.length === 2:
                context.lineTo(...args)
                context.stroke()
                canvasMemory.push('L' + args.join(','))
                break
            default:
                console.warn('INVALID COMMAND : ', type, args)
        }
    }

    const DrawingCanvas = canvas(
        { width: width, height: height },
        on('mousedown', (event) => {
            isDrawing = true
            context.beginPath()
            act('M', relativePosition(event, DrawingCanvas))
        }),
        on('mousemove', (event) => {
            if (isDrawing) {
                act('L', relativePosition(event, DrawingCanvas))
            }
        }),
        on('mouseenter', (event) => {
            if (isDrawing) {
                act('M', relativePosition(event, DrawingCanvas))
            }
        }),
    )

    document.addEventListener('mouseup', () => {
        if (isDrawing) {
            isDrawing = false
            storeCanvas()
        }
    })

    context = DrawingCanvas.getContext('2d')

    // Recreate previous canvas, if any is stored
    localStorage.getItem(canvasID)?.split(' ').forEach((command) => {
        if (command) {
            const type = command[0]
            const args = command.slice(1).split(',')
            act(type, args)
        }
    })

    const ClearCanvasButton = button(
        'Clear canvas',
        on('click', () => {
            context.clearRect(0, 0, DrawingCanvas.width, DrawingCanvas.height)
            canvasMemory = []
            storeCanvas()
        }),
    )

    return div({ class: 'drawing-canvas' },
        DrawingCanvas,
        ClearCanvasButton,
    )
}
