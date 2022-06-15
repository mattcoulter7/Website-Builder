import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import  { TypeItalic,TypeBold,TypeStrikethrough,Code,Paragraph,TypeH1,TypeH2,TypeH3 } from 'react-bootstrap-icons';

import {FaBold,FaItalic,FaStrikethrough,FaCode,FaParagraph,FaUndo,FaRedo} from 'react-icons/fa'

import {GoListUnordered,GoListOrdered,GoHorizontalRule} from 'react-icons/go'
import {GrBlockQuote} from 'react-icons/gr'
import {BsFillFileEarmarkBreakFill} from 'react-icons/bs'

const TipTapMenuBar = ({ 
    bold = true,
    italic = true,
    strike = true,
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
    editor = true,
    visible = true 
}) => {
    if (!editor) {
        return null;
    }

    var buttons = [];
    bold && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <FaBold/>
        </button>
    )
    italic && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <FaItalic/>
        </button>
    );
    strike && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <FaStrikethrough/>
        </button>
    );
    paragraph && buttons.push(
        <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <FaParagraph/>
        </button>
    );
    h1 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <TypeH1/>
        </button>
    );
    h2 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <TypeH2/>
        </button>
    );
    h3 && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <TypeH3/>
        </button>
    );
    bulletList && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <GoListUnordered/>
        </button>
    );
    orderedList && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <GoListOrdered/>
        </button>
    );
    codeBlock && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <FaCode/>
        </button>
    );
    blockQuote && buttons.push(
        <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'btn btn-primary btn-sm is-active m-1' : 'btn btn-secondary btn-sm m-1'}
        >
            <GrBlockQuote/>
        </button>
    );
    horizontalRule && buttons.push(
        <button className='btn btn-outline-primary btn-sm is-active m-1'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <GoHorizontalRule/>
        </button>
    );
    hardBreak && buttons.push(
        <button className='btn btn-outline-primary btn-sm is-active m-1'
            onClick={() => editor.chain().focus().setHardBreak().run()}>
            <BsFillFileEarmarkBreakFill/>
        </button>

    );
    undo && buttons.push(
        <button className='btn btn-outline-primary btn-sm is-active m-1'
            onClick={() => editor.chain().focus().undo().run()}>
            <FaUndo/>
        </button>
    );
    redo && buttons.push(
        <button className='btn btn-outline-primary btn-sm is-active m-1'
            onClick={() => editor.chain().focus().redo().run()}>
            <FaRedo/>
        </button>
    );

    return (
        <div className={`shadow-sm p-3 bg-white rounded ${visible ? "visible-fade" : "invisible-fade"}`}>
            {buttons}
        </div>
    )
}

export default TipTapMenuBar;