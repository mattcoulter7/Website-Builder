import React from "react";

import ComponentMapping from "../ComponentMapping";
import ConfigurableComponent from "../ConfigurableComponent";
import LayoutComponent from "../LayoutComponent";

import ComponentDTO from "../../../../DTOs/ComponentDTO";
import ComponentDAO from "../../../../DAOs/ComponentDAO";

export default class Col_EDIT extends LayoutComponent {
    onNew() {
        ComponentMapping.Text1.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result);
            })
    }
    onDropLeft(e, ref) {
        this.mountHorizontally(e, ref, this.props.component.index - 1)
    }
    onDropRight(e, ref) {
        this.mountHorizontally(e, ref, this.props.component.index + 1)
    }
    mountHorizontally(e, ref, index) {
        // call whenDelete of component parent (removing it)
        ref.props.parentContext().whenDelete(ref.props.component);

        // add a column to the row
        ComponentMapping.Col.create(this.props.parentContext().props.component._id, index)
            .then((col) => {
                // place the component inside of the column
                ComponentDAO.update(new ComponentDTO({
                    ...ref.props.component.toJSON(),
                    parentId: col._id
                }))
                    .then((result) => {
                        // call whenInsert of component parent (self)
                        this.props.parentContext().onUpdateChildIndex(col, index)
                    })
            })
    }
    mountVertically(e, ref, index) {

    }
    render() {
        if (this.state.children.length == 0) return null;
        return super.render({
            className: "col",
            children: this.state.children
                .map(comp => {
                    const CustomComponent = ComponentMapping[comp.type]
                    return <CustomComponent.edit key={comp._id} website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler} />
                })
        }
        )
    }
}