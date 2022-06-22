import React from "react";

import ConfigurableComponent from "../ConfigurableComponent";

import ComponentMapping from "../ComponentMapping";

import LayoutComponent from "../LayoutComponent";
import EditableComponent from "../EditableComponent";
import ComponentDTO from "../../../../DTOs/ComponentDTO";
import ComponentDAO from "../../../../DAOs/ComponentDAO";

export default class Section_EDIT extends ConfigurableComponent {
    onSave() {
        ComponentDAO.select().then(result => {
            const duplicateEntirely = (comp, parentId) => {
                // get all the children that will also need to be duplicated
                let children = result.filter(c => c.parentId == comp._id)

                //create a duplicate of the parent
                return ComponentDAO.insert(new ComponentDTO({
                    ...comp.toJSON(),
                    _id: undefined, // ensure no id so it insert a duplciate
                    parentId: parentId,
                    isTemplate: true
                }))
                    .then((dup) => {
                        // create a duplicate of all the children components and link them to the duplicate parent
                        children.forEach((child) => {
                            duplicateEntirely(child, dup._id)
                        })
                        return dup;
                    })
            }
            duplicateEntirely(this.props.component, this.props.website._id);
        })
    }
    onDuplicate() {
        ComponentDAO.select().then(result => {
            const duplicateEntirely = (comp, parentId) => {
                // get all the children that will also need to be duplicated
                let children = result.filter(c => c.parentId == comp._id)

                //create a duplicate of the parent
                return ComponentDAO.insert(new ComponentDTO({
                    ...comp.toJSON(),
                    _id: undefined, // ensure no id so it insert a duplciate
                    parentId: parentId
                }))
                    .then((dup) => {
                        // create a duplicate of all the children components and link them to the duplicate parent
                        children.forEach((child) => {
                            duplicateEntirely(child, dup._id)
                        })
                        return dup;
                    })
            }
            duplicateEntirely(this.props.component, this.props.page._id)
                .then((section) => {
                    this.props.parentContext().whenInsert(section)
                })
        })
    }
    render() {
        if (!this.props.page) return null;
        return (
            <EditableComponent
                onDelete={() => this.onDelete()}
                onDuplicate={() => this.onDuplicate()}
                onSave={() => this.onSave()}
                component={this.props.component}

                context={() => this}>
                <section style={{
                    minHeight: "10rem"
                }}>
                    {
                        this.state.children
                            .map(comp => {
                                const CustomComponent = ComponentMapping[comp.type]
                                return <CustomComponent.edit key={comp._id} website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={() => this} />
                            })
                    }
                </section>
            </EditableComponent>
        )
    }
}