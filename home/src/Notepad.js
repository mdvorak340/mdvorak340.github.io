import { textarea, on } from "ellipsi"

let numNotepads = 0

export default function Notepad() {
    const notepadID = 'notepad-' + numNotepads++

    const This = textarea(
        {
            class: 'notepad',
            spellcheck: false,
            placeholder: 'Notes…',
        },
        localStorage.getItem(notepadID) || null,
        on('keydown blur', () => localStorage.setItem(notepadID, This.value)),
    )

    return This
}
