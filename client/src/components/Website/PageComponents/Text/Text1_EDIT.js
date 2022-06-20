import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import TipTap from "../TipTap";

import ConfigurableComponent from "../ConfigurableComponent";
import ComponentMappings from "../ComponentMapping";
import LayoutComponent from "../LayoutComponent";
import ComponentDAO from "../../../../DAOs/ComponentDAO";


export default class Text1_EDIT extends ConfigurableComponent {
    initializeTabs() {
        super.initializeTabs()
        this.addTabContent("Content", () => <input className="form-control" onChange={(e) => {
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
    mousedownonBlurDirect(e) { }
    mousedownonFocus(e) {
        this.onSelect(true)
    }
    mousemoveonFocus() {
        this.onFilter(true);
    }
    componentDidMount() {
        super.componentDidMount();
    }
    mountVertically(e, ref, index) {
        ref.props.parentContext().whenDelete(ref.props.component);
        ref.props.component.parentId = this.props.parentContext().props.component._id;
        this.props.parentContext().onUpdateChildIndex(ref.props.component, index)
    }
    render() {
        return super.render(
            <LayoutComponent website={this.state.website} page={this.state.page} pages={this.state.pages} component={this.props.component} parentContext={() => this.props.parentContext()}
                onDropTop={(e, ref) => {
                    let index = this.props.component.index - 1
                    this.mountVertically(e, ref, index)
                }}
                onDropBottom={(e, ref) => {
                    let index = this.props.component.index + 1
                    this.mountVertically(e, ref, index)
                }}
            >
                <TipTap value={this.state.value} onChange={(e) => {
                    this.save({ value: e.editor.getHTML() })
                }} />
            </LayoutComponent>
        )
    }
}