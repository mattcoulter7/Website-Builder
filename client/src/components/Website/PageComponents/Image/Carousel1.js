import React from "react";

import { Carousel } from "react-bootstrap";

import EditComponent from "../EditComponent";

import ComponentMapping from "../ComponentMapping";

import FileDAO from "../../../../DAOs/FileDAO";
import TipTap from "../TipTap";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

export default class Carousel1_EDIT extends EditComponent {
    constructor(props) {
        super(props, {
            directContact: false
        })
    }
    onClickNew() {
        ComponentMapping.CarouselItem1.create(this.props.component._id)
            .then((result) => {
                this.onInsert(result)
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
                                                    this.onUpdate(result);
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
                                                this.onUpdate(result);
                                            })
                                    }} />
                                </Carousel.Caption>
                            </Carousel.Item>)
                            //const CustomComponent = ComponentMapping[comp.type]
                            //return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler} />
                        })
                }
            </Carousel>
        );
    }
}