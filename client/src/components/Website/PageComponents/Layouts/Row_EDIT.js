import React from "react";
import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import ComponentMapping from "../ComponentMapping";

import ConfigurableComponent from "../ConfigurableComponent";
import LayoutComponent from "../LayoutComponent";

export default class Row_EDIT extends LayoutComponent {
    onNew() {
        ComponentMapping.Col.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result);
            })
    }
    onDropRight(e, ref) {
        this.horizontalMount(e, ref, Math.max(...this.state.children.map(c => c.index)) + 1);
    }
    onDropBottom(e, ref) {
        this.verticalMount(e, ref, this.props.component.index + 1);
    }
    onDropLeft(e, ref) {
        this.horizontalMount(e, ref, Math.min(...this.state.children.map(c => c.index)) - 1);
    }
    onDropTop(e, ref) {
        this.verticalMount(e, ref, this.props.component.index - 1);
    }
    verticalMount(e, ref, index) {
        // call whenDelete of component parent (removing it)
        ref.props.parentContext().whenDelete(ref.props.component);

        // add a column to the row
        ComponentMapping.Row.create(this.props.parentContext().props.component._id, index)
            .then((row) => {
                // create a col inside of that row
                ComponentMapping.Col.create(row._id)
                    .then((col) => {
                        // place the component inside of the column
                        ComponentDAO.update(new ComponentDTO({
                            ...ref.props.component.toJSON(),
                            parentId: col._id
                        }))
                            .then((result) => {
                                // call whenInsert of row parent
                                this.props.parentContext().onUpdateChildIndex(row, index)
                            })
                    })
            })
    }
    horizontalMount(e, ref, index) {
        // call whenDelete of component parent (removing it)
        ref.props.parentContext().whenDelete(ref.props.component);

        // add a column to the row
        ComponentMapping.Col.create(this.props.component._id, index)
            .then((col) => {
                // place the component inside of the column
                ComponentDAO.update(new ComponentDTO({
                    ...ref.props.component.toJSON(),
                    parentId: col._id
                }))
                    .then((result) => {
                        // call whenInsert of component parent (self)
                        this.whenInsert(col);
                    })
            })
    }
    render() {
        if (this.state.children.length == 0) return null;
        return super.render({
            className: "row",
            children: this.state.children
                .map(comp => {
                    const CustomComponent = ComponentMapping[comp.type]
                    return <CustomComponent.edit key={comp._id} website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler} />
                })
        })
    }
}