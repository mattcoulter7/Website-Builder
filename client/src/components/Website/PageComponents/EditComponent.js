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
    constructor(props,options = {}) {
        super(props);
        this.state = {
            focus: false,
            children: []
        }
        this.options = {
            directContact:true,
            ...options
        }

        this.handler = this.handler.bind(this)
    }

    handler() {
        return this;
    }

    // when a child component has been removed
    onDelete(child) {
        this.setState({
            children: this.state.children.filter(c => c != child)
        })
    }

    // when a child component has been added
    onInsert(child) {
        this.setState({
            children: this.state.children.concat(child)
        })
    }

    // this component has been updated, should cause rerender
    onUpdate(child) {
        let children = this.state.children;
        children[children.findIndex((c) => c._id == child._id)] = child;
        this.setState({
            children: children
        })
    }

    save(values = {}) {
        ComponentDAO
            .update(new ComponentDTO({
                ...this.props.component.toJSON(),
                ...values
            }))
            .then(result => {
                this.props.parentContext().onUpdate(result);
            })
    }

    componentDidMount() {
        ComponentDAO.select()
            .then((result) => {
                return result.filter(c => c.parentId == this.props.component._id)
            })
            .then((result) => {
                this.setState({
                    children: result
                })
            })
    }

    render(children) {
        var className = "";
        if (this.state.focus) {
            className += " selected"
        } else {
            className += " deselected"
        }
        if (!EditComponent.selected) {
            className += " filtered-off"
        } else {
            if (EditComponent.selected == this) {
                className += " filtered-off"
            } else {
                className += " filtered-off"
            }
        }

        return (
            <>
                <CustomFocusser
                    directContact={this.options.directContact}
                    className={className}
                    onFocus={(e) => {
                        EditComponent.selected = this;
                        this.setState({
                            focus: true
                        })
                    }}
                    onBlur={(e) => {
                        this.setState({
                            focus: false
                        })
                    }}>

                    {this.props.component.type}
                    <div className="row">
                        {
                            (() => {
                                return this.state.focus ?
                                    <div className="col-2">
                                        <OptionsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} up={false} down={false} parentContext={this.handler} />
                                    </div> : null
                            })()
                        }
                        <div className="col">
                            {children}
                        </div>
                        {
                            (() => {
                                return this.state.focus ?
                                    <div className="col-2">
                                        <LayoutsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} parentContext={this.handler} />
                                    </div> : null
                            })()
                        }
                    </div>
                </CustomFocusser>
            </>
        );
    }

    static selected;
}