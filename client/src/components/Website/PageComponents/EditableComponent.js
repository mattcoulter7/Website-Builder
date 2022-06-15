import React from "react";
import './Component.css';

import * as ComponentMapping from "./ComponentMapping";

import ComponentDAO from "../../../DAOs/ComponentDAO";
import OptionsMenu from "./OptionsMenu";

import CustomFocusser from "./CustomFocusser";

export default class EditableComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }
    }

    render() {
        var CustomComponent = ComponentMapping.Edit[this.props.component.type];
        if (!CustomComponent) return (<></>);

        return (
            <CustomFocusser
                onFocus={(e) => {
                    EditableComponent.active && EditableComponent.active.setState({
                        focus: false
                    })
                    EditableComponent.active = this;
                    EditableComponent.active.setState({
                        focus: true
                    })
                }}>
                <div
                    style={{
                        ...this.state.showOptions ? {
                            border: "aqua 3px solid"
                        } : {}
                    }}>
                    <CustomComponent component={this.props.component}>
                        {(() => this.state.focus && <OptionsMenu component={this.props.component} />
                        )()}
                    </CustomComponent>
                </div>
            </CustomFocusser>
        );
    }

    static Active;
}