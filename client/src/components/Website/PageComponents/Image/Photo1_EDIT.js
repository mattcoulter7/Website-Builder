import React from "react";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import FileDAO from "../../../../DAOs/FileDAO";
import ConfigurableComponent from "../ConfigurableComponent";
import LayoutComponent from "../LayoutComponent";
import EditableComponent from "../EditableComponent";

export default class Photo1_Edit extends ConfigurableComponent {
    initializeTabs(context) {
        context("Content", () => <input className="form-control" id="formFileLg" type="file" onChange={(e) => {
            var file = e.target.files[0];
            if (!file) return;
            FileDAO.insert(file)
                .then((result) => {
                    this.save({ src: result })
                })
        }} />)
    }
    onDropTop(e, ref) {
        let index = this.props.component.index - 1
        this.mountVertically(e, ref, index)
    }
    onDropBottom(e, ref) {
        let index = this.props.component.index + 1
        this.mountVertically(e, ref, index)
    }
    mountVertically(e, ref, index) {
        ref.props.parentContext().whenDelete(ref.props.component);
        ref.props.component.parentId = this.props.parentContext().props.component._id;
        this.props.parentContext().onUpdateChildIndex(ref.props.component, index)
    }
    render() {
        return (
            <EditableComponent
                onDelete={() => this.onDelete()}
                component={this.props.component}
                context={() => this}
                tabs={(context) => this.initializeTabs(context)}
            >
                <LayoutComponent
                    component={this.props.component}
                    context={() => this}>
                    <img src={this.state.src} className="img-fluid" alt="Responsive image" />
                </LayoutComponent>
            </EditableComponent>
        );
    }
}