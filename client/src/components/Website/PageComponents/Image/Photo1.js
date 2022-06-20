import React from "react";

import EditComponent from "../EditComponent";

export default class Photo1_Edit extends EditComponent {
    render() {
        return (
            <img src={this.state.src} className="img-fluid" alt="Responsive image" />
        );
    }
}