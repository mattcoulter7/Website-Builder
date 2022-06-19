import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import TipTap from "../TipTap";

import EditComponent from "../EditComponent";


export default class Text1_EDIT extends EditComponent {
    constructor(props){
        super(props)
        
        this.addTabContent("Content",<input className="form-control" value={props.component.value}/>,"Section 1")
        this.addTabContent("Content",<input className="form-control" value={props.component.value}/>)
    }
    mousedownonBlurDirect(e) {}
    mousedownonFocus(e) {
        this.onSelect(true)
    }
    mousemoveonFocus(){
        this.onFilter(true);
    }
    componentDidMount(){
        super.componentDidMount();
    }
    render() {
        return super.render(
            <TipTap value={this.props.component.value} onChange={(e) => {
                this.save({ value: e.editor.getHTML() })
            }} />
        )
    }
}