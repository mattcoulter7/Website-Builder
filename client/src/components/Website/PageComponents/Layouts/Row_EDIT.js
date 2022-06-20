import React from "react";

import ComponentMapping from "../ComponentMapping";

import ConfigurableComponent from "../ConfigurableComponent";
import LayoutComponent from "../LayoutComponent";

export default class Row_EDIT extends ConfigurableComponent {
    onNew() {
        ComponentMapping.Col.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result);
            })
    }
    render() {
        return super.render(
            <LayoutComponent className="row">
                {
                    this.state.children
                        .map(comp => {
                            const CustomComponent = ComponentMapping[comp.type]
                            return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler} />
                        })
                }
            </LayoutComponent>
        )
    }
}