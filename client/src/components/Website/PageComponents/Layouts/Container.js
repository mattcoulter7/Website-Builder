import React from "react";

import EditComponent from "../EditComponent";

import ComponentMapping from "../ComponentMapping";
import CustomComponent from "../CustomComponent";

export default class Section_EDIT extends CustomComponent {
    render() {
        if (!this.props.page) return null;
        return (
            <div className="container">
                {
                    this.state.children
                        .map(comp => {
                            const CustomComponent = ComponentMapping[comp.type]
                            return <CustomComponent.preview website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} />
                        })
                }
            </div>
        )
    }
}