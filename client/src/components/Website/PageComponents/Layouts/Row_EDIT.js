import React from "react";

import ComponentMapping from "../ComponentMapping";

import EditComponent from "../EditComponent";

export default class Row_EDIT extends EditComponent {
    render() {
        return super.render(
            <div className="row">
                {
                    this.props.component.children
                        .filter(c => c.type == "Col")
                        .map(comp => {
                            const CustomComponent = ComponentMapping[comp.type]
                            return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentState={this.state} />
                        })
                }
                {
                    (() => {
                        return (this.state.focus) ? <div className="col-1">
                            <button className="btn btn-primary" onClick={() => { 
                                ComponentMapping.Col.create(this.props.component._id)
                            }}>Add Column</button>
                        </div> : null;
                    })()
                }
            </div>
        );
    }
}