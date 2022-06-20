import React from "react";

import ConfigurableComponent from "../ConfigurableComponent";


export default class Text1 extends ConfigurableComponent {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html:this.props.component.value || ""}} ></div>
        )
    }
}