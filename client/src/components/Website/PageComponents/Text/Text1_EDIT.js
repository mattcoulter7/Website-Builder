import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import TipTap from "../TipTap";

import EditComponent from "../EditComponent";


export default class Text1_EDIT extends EditComponent {
    constructor(props){
        super(props)
    }
    mousedownonBlurDirect(e) {}
    mousedownonFocus(e) {
        this.onSelect(true)
    }
    render() {
        return super.render(
            <TipTap value={this.props.component.value} onChange={(e) => {
                this.save({ value: e.editor.getHTML() })
            }} />
        )
    }
}