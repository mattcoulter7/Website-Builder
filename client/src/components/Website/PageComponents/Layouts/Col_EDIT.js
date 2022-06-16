import React from "react";

import ComponentMapping from "../ComponentMapping";
import EditComponent from "../EditComponent";

export default class Col_EDIT extends EditComponent {
    render() {
        let comp = this.props.component.children[0];
        if (!comp) return null;
        let CustomComponent = ComponentMapping[comp.type];
        return (
            <div className="col">
                {super.render(<CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentState={this.state} />)}
            </div>
        );
    }
}