import React from 'react'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

const OptionsMenu = ({ 
    destroy = true,
    up = true,
    down = true,
    component
}) => {
    if (!component) {
        return null;
    }

    var buttons = [];
    destroy && buttons.push(
        <button
            onClick={() => ComponentDAO.delete(component._id).then((result => result))}
        >
            Delete
        </button>
    )
    up && buttons.push(
        <button
            onClick={() => {}}
        >
            Up
        </button>
    );
    down && buttons.push(
        <button
            onClick={() => {}}
        >
            Down
        </button>
    );

    return (
        <div class="row shadow-sm p-3 mb-5 bg-white rounded">
            {buttons}
        </div>
    )
}

export default OptionsMenu;