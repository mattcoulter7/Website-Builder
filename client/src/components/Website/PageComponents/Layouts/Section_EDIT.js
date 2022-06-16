import React from "react";

import EditComponent from "../EditComponent";

import ComponentMapping from "../ComponentMapping";

export default class Section_EDIT extends EditComponent {
    onClickNew() {
        ComponentMapping.Row.create(this.props.component._id)
            .then((result) => {
                this.onInsert(result)
            })
    }
    render() {
        if (!this.props.page) return null;
        return super.render(
            this.state.children
                .map(comp => {
                    const CustomComponent = ComponentMapping[comp.type]
                    return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler} />
                })
        )
    }
}