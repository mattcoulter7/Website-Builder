import React from "react";

import ConfigurableComponent from "../ConfigurableComponent";

import ComponentMapping, { deepCreate, deepDelete } from "../ComponentMapping";

import LayoutComponent from "../LayoutComponent";
import EditableComponent from "../EditableComponent";
import ComponentDTO from "../../../../DTOs/ComponentDTO";
import ComponentDAO from "../../../../DAOs/ComponentDAO";

import html2png from '../../../../Utils/html2png'

import FileDAO from "../../../../DAOs/FileDAO";

export default class Section_EDIT extends ConfigurableComponent {
    onSave() {
        deepCreate(this.props.component, this.props.website._id, {
            isTemplate: true
        })
    }
    onDuplicate() {
        deepCreate(this.props.component, this.props.page._id)
            .then((section) => {
                this.props.parentContext().whenInsert(section)
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
                <section ref={this.componentRef} style={{
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