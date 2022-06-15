import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import './TipTap.scss'

const TipTapMenuBar = ({ bold,
    italic = true,
    strike = true,
    code = true,
    clearMarks = true,
    clearNodes = true,
    paragraph = true,
    h1 = true,
    h2 = true,
    h3 = true,
    h4 = true,
    h5 = true,
    h6 = true,
    bulletList = true,
    orderedList = true,
    blockQuote = true,
    codeBlock = true,
    horizontalRule = true,
    hardBreak = true,
    undo = true,
    redo = true,
    editor = true 
}) => {
    if (!editor) {
        return null;
    }

    var buttons = [];
    bold && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
        >
            bold
        </button>
    )
    italic && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
        >
            italic
        </button>
    );
    strike && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
        >
            strike
        </button>
    );
    code && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
        >
            code
        </button>
    );
    clearMarks && buttons.push(
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            clear marks
        </button>
    );
    clearNodes && buttons.push(
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
            clear nodes
        </button>
    );
    paragraph && buttons.push(
        <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
            paragraph
        </button>
    );
    h1 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
            h1
        </button>
    );
    h2 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
            h2
        </button>
    );
    h3 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
            h3
        </button>
    );
    h4 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
            h4
        </button>
    );
    h5 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
            h5
        </button>
    );
    h6 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
            h6
        </button>
    );
    bulletList && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
            bullet list
        </button>
    );
    orderedList && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
            ordered list
        </button>
    );
    codeBlock && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
            code block
        </button>
    );
    blockQuote && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
            blockquote
        </button>
    );
    horizontalRule && buttons.push(
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            horizontal rule
        </button>
    );
    hardBreak && buttons.push(
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
            hard break
        </button>

    );
    undo && buttons.push(
        <button onClick={() => editor.chain().focus().undo().run()}>
            undo
        </button>
    );
    redo && buttons.push(
        <button onClick={() => editor.chain().focus().redo().run()}>
            redo
        </button>
    );

    return (
        <>
            {buttons}
        </>
    )
}

export default TipTapMenuBar;