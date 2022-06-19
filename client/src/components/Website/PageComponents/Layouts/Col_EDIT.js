import React from "react";

import ComponentMapping from "../ComponentMapping";
import EditComponent from "../EditComponent";

export default class Col_EDIT extends EditComponent {
    onNew() {
        ComponentMapping.Text1.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result);
            })
    }
    render() {
        return (
            <div className="col">
                {
                    super.render(
                        this.state.children
                            .map(comp => {
                                const CustomComponent = ComponentMapping[comp.type]
                                return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler}/>
                            })
                    )
                }
            </div>
        )
    }
}