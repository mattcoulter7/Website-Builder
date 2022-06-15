import { useState } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

import TipTapMenuBar from "./TipTapMenuBar"

import CustomFocusser from './CustomFocusser'

const TipTap = ({ value, onChange }) => {
    const [focus, setFocus] = useState(false);
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    })
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign
        ],
        onFocus: () => { setFocus(true) },
        onUpdate: onChange,
        content: value,
    })

    return (
        <CustomFocusser
            onFocus={(e) => {
                setFocus(true)
            }}
            onBlur={(e) => {
                setFocus(false)
            }}>
            <TipTapMenuBar visible={focus} editor={editor} />
            <EditorContent editor={editor} />
        </CustomFocusser>
    )
}

export default TipTap