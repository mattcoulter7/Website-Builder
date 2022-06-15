import React from "react";
import './Component.css';

import * as ComponentMapping from "./ComponentMapping";

import ComponentDAO from "../../../DAOs/ComponentDAO";

export default class EditableComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showOptions:false
        }
    }

    toggleOptions(enabled) {
        this.setState({
            showOptions:enabled
        })
    }

    render() {
        var CustomComponent = ComponentMapping.Edit[this.props.component.type];
        if (!CustomComponent) return (<></>);

        return (
            <div style={{
                ...this.state.showOptions ? {
                    border:"aqua 3px solid"
                } : {}
            }} onMouseEnter={() => this.toggleOptions(true)} onMouseLeave={() => this.toggleOptions(false)}>
                <CustomComponent component={this.props.component}>
                    {(() => {
                        if (this.state.showOptions){
                            return (
                                <div class="row shadow-sm p-3 mb-5 bg-white rounded">
                                    <button onClick={() => ComponentDAO.delete(this.props.component._id).then((result) => window.location.reload())}>
                                        Delete
                                    </button>
                                    <button onClick={() => {}}>
                                        Up
                                    </button>
                                    <button onClick={() => {}}>
                                        Down
                                    </button>
                                </div>
                            )
                        }
                    })()}
                </CustomComponent>
            </div>
        );
    }
}