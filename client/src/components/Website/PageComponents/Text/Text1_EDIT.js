import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import TipTap from "../TipTap";

import EditComponent from "../EditComponent";
import LayoutsMenu from "../LayoutsMenu";
import OptionsMenu from "../OptionsMenu";


export default class Text1_EDIT extends EditComponent {
    render() {
        return super.render(
            <TipTap value={this.props.component.value} onChange={(e) => {
                this.save({ value: e.editor.getHTML() })
            }} />
        )
    }
}