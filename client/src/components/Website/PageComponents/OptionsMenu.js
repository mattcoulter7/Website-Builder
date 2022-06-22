import React from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { AiFillPlusCircle, AiFillEdit,AiFillSave } from 'react-icons/ai'
import {HiOutlineDuplicate} from "react-icons/hi"

const OptionsMenu = ({
    onDelete,
    onUp,
    onDown,
    onAdd,
    onEdit,
    onSave,
    onDuplicate
}) => {
    var buttons = [];
    onDelete && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={onDelete}
        >
            <RiDeleteBin6Fill />
        </button>
    )
    onUp && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={onUp}
        >
            <FaArrowUp />
        </button>
    );
    onDown && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={onDown}
        >
            <FaArrowDown />
        </button>
    );
    onAdd && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={onAdd}
        >
            <AiFillPlusCircle />
        </button>
    );
    onEdit && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={onEdit}
        >
            <AiFillEdit />
        </button>
    );
    onSave && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={onSave}
        >
            <AiFillSave />
        </button>
    );
    onDuplicate && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={onDuplicate}
        >
            <HiOutlineDuplicate />
        </button>
    );


    return (
        <div
            style={{
                position: 'absolute',
                zIndex: '900000',
                transform: 'translateY(-100px)',
                width: 'max-content'
            }} className={`shadow-sm p-3 bg-white rounded`}>
            {buttons}
        </div>
    )
}

export default OptionsMenu;