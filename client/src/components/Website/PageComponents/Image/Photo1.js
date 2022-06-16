import React from "react";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import FileDAO from "../../../../DAOs/FileDAO";
import EditComponent from "../EditComponent";
import CustomComponent from "../CustomComponent";

export default class Photo1_Edit extends CustomComponent {
    render() {
        return (
            <img src={this.props.component.src} className="img-fluid" alt="Responsive image" />
        );
    }
}