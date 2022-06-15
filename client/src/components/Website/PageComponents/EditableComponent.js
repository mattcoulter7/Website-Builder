import React from "react";

import * as ComponentMapping from "./ComponentMapping";

import ComponentDAO from "../../../DAOs/ComponentDAO";
import OptionsMenu from "./OptionsMenu";
import LayoutsMenu from "./LayoutsMenu"

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
            <CustomFocusser className={`pb-5 pt-5 ${this.state.focus ? "selected" : "deselected"} ${EditableComponent.active && EditableComponent.active.state.focus ? (EditableComponent.active == this ? "filtered-off" : "filtered-on") : "filtered-off"}`}
                onFocus={(e) => {
                    EditableComponent.active && EditableComponent.active.setState({
                        focus: false
                    })
                    EditableComponent.active = this;
                    EditableComponent.active.setState({
                        focus: true
                    })
                }}>
                <div className="row">
                    <div className="col-1">
                        <OptionsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} />
                    </div>
                    <div className="col-10">
                        <CustomComponent website={this.props.website} page={this.props.page} pages={this.props.pages} component={this.props.component} />
                    </div>
                    <div className="col-1">
                        <LayoutsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} />
                    </div>
                </div>
            </CustomFocusser>
        );
    }

    static active;
}