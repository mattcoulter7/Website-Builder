import React from "react"
import { TelephoneMinus } from "react-bootstrap-icons";

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import CustomFocusser from "./CustomFocusser"
import LayoutsMenu from "./LayoutsMenu";
import OptionsMenu from "./OptionsMenu";

export default class EditComponent extends CustomFocusser {
    constructor(props, options = {}, state = {}) {
        super(props);
        this.options = {
            directContact: true,
            ...options
        }
        this.state = {
            focus: false,
            filter: false,
            children: [],
            ...state
        }

        this.handler = this.handler.bind(this)
    }

    handler() {
        return this;
    }

    componentDidMount() {
        super.componentDidMount()
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
    componentWillUnmount() {
        super.componentWillUnmount()
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

    onFilter(on) {
        this.setState({
            filter: on
        })
    }

    onSelect(on) {
        this.setState({
            focus: on
        })
    }

    mousemoveonFocusDirect(e) {
        this.onFilter(true)
    }
    mousemoveonBlurDirect(e) {
        this.onFilter(false)
    }
    mousemoveonBlur(e) {
        this.onFilter(false)
    }

    mousedownonFocusDirect(e) {
        EditComponent.selected = this;
        this.onSelect(true)
    }
    mousedownonBlurDirect(e) {
        this.onSelect(false)
    }
    mousedownonBlur(e) {
        this.onSelect(false)
    }

    render(children) {
        var className = "";
        if (this.state.focus) {
            className += " selected"
        } else {
            className += " deselected"
            if (this.state.filter) {
                className += " hover"
            }
        }

        return super.render(
            <div className={className}>
                {this.props.component.type}
                {
                    (() => {
                        return this.state.focus ?
                            <OptionsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} up={false} down={false} parentContext={this.handler} /> : null
                    })()
                }
                {children}
                {
                    (() => {
                        return this.state.focus ?
                            <LayoutsMenu className={this.state.focus ? "visible-fade" : "invisible-fade"} component={this.props.component} parentContext={this.handler} /> : null
                    })()
                }
            </div>
        );
    }

    static selected;
}