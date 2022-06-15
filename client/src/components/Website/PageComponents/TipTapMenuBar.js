import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import  { TypeItalic,TypeBold,TypeStrikethrough,Code,Paragraph,TypeH1,TypeH2,TypeH3 } from 'react-bootstrap-icons';

const TipTapMenuBar = ({ 
    bold = true,
    italic = true,
    strike = true,
    code = true,
    paragraph = true,
    h1 = true,
    h2 = true,
    h3 = true,
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
            <TypeBold/>
        </button>
    )
    italic && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
        >
            <TypeItalic/>
        </button>
    );
    strike && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
        >
            <TypeStrikethrough/>
        </button>
    );
    code && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
        >
            <Code/>
        </button>
    );
    paragraph && buttons.push(
        <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
            <Paragraph/>
        </button>
    );
    h1 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
            <TypeH1/>
        </button>
    );
    h2 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
            <TypeH2/>
        </button>
    );
    h3 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
            <TypeH3/>
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