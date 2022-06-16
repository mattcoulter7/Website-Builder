import React from "react";

import { Carousel } from "react-bootstrap";

import EditComponent from "../EditComponent";

import ComponentMapping from "../ComponentMapping";

import FileDAO from "../../../../DAOs/FileDAO";
import TipTap from "../TipTap";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";
import CustomComponent from "../CustomComponent";

export default class Carousel1_EDIT extends CustomComponent {
    render() {
        return (
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
                                <Carousel.Caption>
                                    <div dangerouslySetInnerHTML={{__html:comp.value || ""}}></div>
                                </Carousel.Caption>
                            </Carousel.Item>)
                        })
                }
            </Carousel>
        );
    }
}