import React from "react";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import FileDAO from "../../../../DAOs/FileDAO";

import { Carousel } from "react-bootstrap";
import EditComponent from "../EditComponent";
import LayoutsMenu from "../LayoutsMenu";
import OptionsMenu from "../OptionsMenu";

export default class Carousel1_EDIT extends EditComponent {
    render() {
        return super.render(
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={this.props.component.src}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={this.props.component.src}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={this.props.component.src}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}