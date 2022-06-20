import React from "react";

import { Carousel } from "react-bootstrap";

import ConfigurableComponent from "../ConfigurableComponent";

import ComponentMapping from "../ComponentMapping";

import FileDAO from "../../../../DAOs/FileDAO";
import TipTap from "../TipTap";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

export default class Carousel1_EDIT extends ConfigurableComponent {
    onNew() {
        ComponentMapping.CarouselItem1.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result)
            })
    }
    render() {
        return super.render(
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
        );
    }
}