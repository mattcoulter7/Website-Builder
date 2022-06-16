import React from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

import ComponentMapping from './ComponentMapping'

const LayoutsMenu = ({
    component,
    className,
    parentContext
}) => {
    if (!component) {
        return null;
    }

    const buttons = Object.entries(ComponentMapping).map(pair => 
        <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => {
                pair[1].update(component)
                    .then((result) => {
                        let thisComponent = parentContext();
                        let thisComponentContainer = thisComponent.props.parentContext();
                        if (thisComponentContainer){
                            thisComponentContainer.onUpdate(result)
                        }
                    })
            }}
        >
            {pair[0]}
        </button>
    )

    return (
        <div className={`shadow-sm p-3 bg-white rounded ${className}`}>
            {buttons}
        </div>
    )
}

export default LayoutsMenu;