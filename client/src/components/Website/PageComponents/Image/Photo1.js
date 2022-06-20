import React from "react";

import ConfigurableComponent from "../ConfigurableComponent";

export default class Photo1_Edit extends ConfigurableComponent {
    render() {
        return (
            <img src={this.state.src} className="img-fluid" alt="Responsive image" />
        );
    }
}