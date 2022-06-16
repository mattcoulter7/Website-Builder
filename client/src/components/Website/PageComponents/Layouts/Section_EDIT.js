import React from "react";

import EditComponent from "../EditComponent";

import ComponentMapping from "../ComponentMapping";

import LayoutsMenu from "../LayoutsMenu";
import OptionsMenu from "../OptionsMenu"

import Section from "./Section";
import NewLine from "../NewLine"

export default class Section_EDIT extends EditComponent {
    render() {
        if (!this.props.page) return null;
        return super.render(
            <div className={`pb-5 pt-5 ${this.state.focus ? "selected" : "deselected"} ${Section.active && Section.active.state.focus ? (Section.active == this ? "filtered-off" : "filtered-off") : "filtered-off"}`}>
                {
                    this.props.component.children
                        .filter(c => c.type == "Row")
                        .map(comp => {
                            const CustomComponent = ComponentMapping[comp.type]
                            return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentState={this.state} />
                        })
                }
                {
                    (() => {
                        return (this.state.focus) ? <div className="col-1">
                            <button className="btn btn-primary" onClick={() => {
                                ComponentMapping.Row.create(this.props.component._id)
                            }}>Add Row</button>
                        </div> : null;
                    })()
                }
            </div>
        )
    }
}