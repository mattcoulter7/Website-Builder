import React from "react";

import { Carousel } from "react-bootstrap";

import ConfigurableComponent from "../ConfigurableComponent";

import ComponentMapping from "../ComponentMapping";

import FileDAO from "../../../../DAOs/FileDAO";
import TipTap from "../TipTap";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";
import LayoutComponent from "../LayoutComponent";
import EditableComponent from "../EditableComponent";

export default class Carousel1_EDIT extends ConfigurableComponent {
    onNew() {
        ComponentMapping.CarouselItem1.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result)
            })
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
                onNew={() => this.onNew()}
                onDelete={() => this.onDelete()}
                component={this.props.component}
                
                context={() => this}>
                <LayoutComponent
                    component={this.props.component}
                    onDropBottom={(e, ref) => this.onDropBottom(e, ref)}
                    onDropTop={(e, ref) => this.onDropTop(e, ref)}
                    context={() => this}
                >
                    <Carousel>
                        {
                            this.state.children
                                .filter((c) => c.type == "CarouselItem1")
                                .map(comp => {

                                    return (<Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={comp.src}
                                            alt={comp.src}
                                        />
                                        <input className="form-control" id="formFileLg" type="file" onChange={(e) => {
                                            var file = e.target.files[0];
                                            if (!file) return;
                                            FileDAO.insert(file)
                                                .then((result) => {
                                                    ComponentDAO
                                                        .update(new ComponentDTO({
                                                            ...comp.toJSON(),
                                                            src: result
                                                        }))
                                                        .then(result => {
                                                            this.whenUpdate(result);
                                                        })
                                                })
                                        }} />
                                        <Carousel.Caption>
                                            <TipTap value={comp.value} onChange={(e) => {
                                                ComponentDAO
                                                    .update(new ComponentDTO({
                                                        ...comp.toJSON(),
                                                        value: e.editor.getHTML()
                                                    }))
                                                    .then(result => {
                                                        this.whenUpdate(result);
                                                    })
                                            }} />
                                        </Carousel.Caption>
                                    </Carousel.Item>)
                                })
                        }
                    </Carousel>
                </LayoutComponent>
            </EditableComponent>
        );
    }
}