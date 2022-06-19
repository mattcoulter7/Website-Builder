import React from "react";

import ComponentMapping from "./ComponentMapping";

export default class PreviewComponent extends React.Component {
    render() {
        var CustomComponent = ComponentMapping[this.props.component.type];
        if (!CustomComponent) return (<></>);

        return (
            <div translate="no" className="ProseMirror" tabIndex="0">
                <CustomComponent.preview website={this.props.website} page={this.props.page} pages={this.props.pages} component={this.props.component} />
            </div>
        );
    }
}