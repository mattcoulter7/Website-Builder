import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import TipTap from "../TipTap";

import ConfigurableComponent from "../ConfigurableComponent";
import ComponentMappings from "../ComponentMapping";
import ComponentDAO from "../../../../DAOs/ComponentDAO";
import LayoutComponent from "../LayoutComponent";
import EditableComponent from "../EditableComponent";


export default class Text1_EDIT extends ConfigurableComponent {
    initializeTabs(context) {
        context("Content", () => <input className="form-control" onChange={(e) => {
            this.save({
                value: e.target.value
            })
        }} value={this.state.value} />)
    }
    onNew() {
        let index = this.props.component.index + 1
        ComponentMappings.Text1.create(this.props.parentContext().props.component._id, index)
            .then((text) => {
                this.props.parentContext().onUpdateChildIndex(text, index);
            })
    }
    mousedownonBlurDirect(e, context) { }
    mousedownonFocus(e, context) {
        context.onSelect(true)
    }
    mousemoveonFocus(e, context) {
        context.onFilter(true);
    }
    render() {
        return (
            <EditableComponent
                onNew={() => this.onNew()}
                onDelete={() => this.onDelete()}
                mousedownonBlurDirect={(e, context) => this.mousedownonBlurDirect(e, context)}
                mousedownonFocus={(e, context) => this.mousedownonFocus(e, context)}
                mousemoveonFocus={(e, context) => this.mousemoveonFocus(e, context)}
                component={this.props.component}
                context={() => this}
                tabs={(context) => this.initializeTabs(context)}
            >


                <LayoutComponent
                    component={this.props.component}
                    context={() => this}>
                    <TipTap value={this.state.value} onChange={(e) => {
                        this.save({ value: e.editor.getHTML() })
                    }} />
                </LayoutComponent>
            </EditableComponent>
        )
    }
}