import React from 'react'

import {FaArrowUp,FaArrowDown} from 'react-icons/fa'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {AiFillPlusCircle} from 'react-icons/ai'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

const OptionsMenu = ({ 
    destroy = true,
    up = true,
    down = true,
    add = true,
    component,
    className,
    parentContext
}) => {
    if (!component) {
        return null;
    }

    var buttons = [];
    destroy && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => {
                ComponentDAO
                    .delete(component._id)
                    .then((result) => {
                        let thisComponent = parentContext();
                        let thisComponentContainer = thisComponent.props.parentContext();
                        if (thisComponentContainer){
                            thisComponentContainer.onDelete(component)
                        }
                    })
            }}
        >
            <RiDeleteBin6Fill/>
        </button>
    )
    up && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => {}}
        >
            <FaArrowUp/>
        </button>
    );
    down && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => {}}
        >
            <FaArrowDown/>
        </button>
    );
    add && parentContext().onClickNew && buttons.push(
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => parentContext().onClickNew()}
        >
            <AiFillPlusCircle/>
        </button>
    );

    return (
        <div className={`shadow-sm p-3 bg-white rounded ${className}`}>
            {buttons}
        </div>
    )
}

export default OptionsMenu;