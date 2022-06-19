import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import TipTap from "../TipTap";

import EditComponent from "../EditComponent";


export default class Text1_EDIT extends EditComponent {
    initializeTabs() {
        super.initializeTabs()
        this.addTabContent("Content", () => <input className="form-control" onChange={(e) => {
            this.save({
                value: e.target.value
            })
        }} value={this.state.value} />)
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
    render() {
        return super.render(
            <>
                <TipTap value={this.state.value} onChange={(e) => {
                    this.save({ value: e.editor.getHTML() })
                }} />
            </>
        )
    }
}