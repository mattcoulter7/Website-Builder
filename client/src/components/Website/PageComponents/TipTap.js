import { useState } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import TipTapMenuBar from "./TipTapMenuBar"

import CustomFocusser from './CustomFocusser'

const TipTap = ({ value, onChange }) => {
    const [focus, setFocus] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
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
            {(() => {
                return focus && <TipTapMenuBar editor={editor} />
            })()}
            <EditorContent editor={editor} />
        </CustomFocusser>
    )
}

export default TipTap