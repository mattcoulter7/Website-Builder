import React from "react"

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import CustomFocusser from "./CustomFocusser"
import LayoutsMenu from "./LayoutsMenu";
import OptionsMenu from "./OptionsMenu";

export const save = (values = {}) => {
    return ComponentDAO
        .update(new ComponentDTO({
            ...this.props.component.toJSON(),
            ...values
        }))
        .then((result) => {
            console.log(result)
        })
}

export default class EditComponent extends React.Component {
    constructor(props, state = {}) {
        super(props);
        this.state = {
            focus: false,
            ...state
        }
    }

    save(values = {}) {
        return ComponentDAO
            .update(new ComponentDTO({
                ...this.props.component.toJSON(),
                ...values
            }))
    }

    render(children) {
        return (
            <CustomFocusser
                onFocus={(e) => {
                    this.setState({
                        focus: true
                    })
                }}
                onBlur={(e) => {
                    this.setState({
                        focus: false
                    })
                }}>
                <div className="row">
                    {
                        (() => {
                            return this.state.focus ?
                                <div className="col-1">
                                    <OptionsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} up={false} down={false} />
                                </div> : null
                        })()
                    }
                    <div className="col">
                        {children}
                    </div>
                    {
                        (() => {
                            return this.state.focus ?
                                <div className="col-1">
                                    <LayoutsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} />
                                </div> : null
                        })()
                    }
                </div>
            </CustomFocusser>
        );
    }
}