import React from "react";

import EditComponent from "../EditComponent";


export default class Text1 extends EditComponent {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html:this.props.component.value || ""}} ></div>
        )
    }
}