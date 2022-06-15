import React from "react";
import './Component.css';

import * as ComponentMapping from "./ComponentMapping";



export default class PreviewComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var CustomComponent = ComponentMapping.Preview[this.props.component.type];
        if (!CustomComponent) return (<></>);

        return (
            <CustomComponent component={this.props.component} />
        );
    }
}