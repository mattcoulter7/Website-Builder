import React from "react";

import ComponentMapping from "../ComponentMapping";
import ConfigurableComponent from "../ConfigurableComponent";

export default class Col extends ConfigurableComponent {
    render() {
        return (
            <div className="col">
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