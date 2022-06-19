import React from "react";

import ComponentMapping from "../ComponentMapping";
import CustomComponent from "../CustomComponent";

import EditComponent from "../EditComponent";

export default class Row_EDIT extends CustomComponent {
    render() {
        return (
            <div className="row">
                {
                    this.state.children
                        .map(comp => {
                            const CustomComponent = ComponentMapping[comp.type]
                            return <CustomComponent.preview website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} />
                        })
                }
            </div>
        );
    }
}