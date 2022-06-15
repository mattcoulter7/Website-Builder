import { useState } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import TipTapMenuBar from "./TipTapMenuBar"

import './TipTap.scss'

const TipTap = ({ value, onChange }) => {
    const [showMenu, setshowMenu] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        onFocus: () => { setshowMenu(true) },
        onExit:() => {setshowMenu(true)},
        onUpdate: onChange,
        content: value,
    })

    return (
        <>
            {(() => {
                return showMenu && <TipTapMenuBar editor={editor} />
            })()}
            <EditorContent editor={editor} />
        </>
    )
}

export default TipTap