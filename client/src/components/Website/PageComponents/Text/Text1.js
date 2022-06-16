import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import TipTap from "../TipTap";

import EditComponent from "../EditComponent";
import CustomComponent from "../CustomComponent";


export default class Text1_EDIT extends CustomComponent {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html:this.props.component.value || ""}} ></div>
        )
    }
}