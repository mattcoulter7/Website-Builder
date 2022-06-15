import React from "react";

import * as ComponentMapping from "./ComponentMapping";

export default class PreviewComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var CustomComponent = ComponentMapping.Preview[this.props.component.type];
        if (!CustomComponent) return (<></>);

        return (
            <div translate="no" className="ProseMirror" tabindex="0">
                <CustomComponent website={this.props.website} page={this.props.page} pages={this.props.pages} component={this.props.component} />
            </div>
        );
    }
}