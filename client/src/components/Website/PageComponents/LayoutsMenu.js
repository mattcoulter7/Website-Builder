import React from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

import { Preview } from './ComponentMapping'

const LayoutsMenu = ({
    component,
    className
}) => {
    if (!component) {
        return null;
    }

    const changeType = (compType) => {
        debugger
        let values = compType._DefaultComponentValues();
        ComponentDAO.update(new ComponentDTO({
            ...values,
            ...component.toFilteredJSON(),
            type:values.type
        }));
    }

    const buttons = Object.entries(Preview).map(pair => 
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => changeType(pair[1])}
        >
            {pair[0]}
        </button>
    )

    return (
        <div class={`shadow-sm p-3 bg-white rounded ${className}`}>
            {buttons}
        </div>
    )
}

export default LayoutsMenu;