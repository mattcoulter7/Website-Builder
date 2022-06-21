import React from "react";

import ConfigurableComponent from "../ConfigurableComponent";

import ComponentMapping from "../ComponentMapping";

import LayoutComponent from "../LayoutComponent";
import EditableComponent from "../EditableComponent";

export default class Section_EDIT extends ConfigurableComponent {
    onNew() {
        ComponentMapping.Container.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result)
            })
    }
    render() {
        if (!this.props.page) return null;
        return (
            <EditableComponent
                onDelete={() => this.onDelete()}
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