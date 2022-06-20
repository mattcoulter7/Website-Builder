import Navbar1_EDIT from "./Navbar/Navbar1_EDIT"
import Navbar1 from "./Navbar/Navbar1"
import Text1_EDIT from "./Text/Text1_EDIT"
import Text1 from "./Text/Text1"
import Photo1_EDIT from "./Image/Photo1_EDIT"
import Photo1 from "./Image/Photo1"
import Carousel1_EDIT from "./Image/Carousel1_EDIT"
import Carousel1 from "./Image/Carousel1"
import Col_EDIT from "./Layouts/Col_EDIT"
import Col from "./Layouts/Col"
import Row_EDIT from "./Layouts/Row_EDIT"
import Row from "./Layouts/Row"
import Section_EDIT from "./Layouts/Section_EDIT"
import Section from "./Layouts/Section"
import Container_EDIT from "./Layouts/Container_EDIT"
import Container from "./Layouts/Container"
import IFrame1_EDIT from "./IFrame/IFrame1_EDIT"
import IFrame1 from "./IFrame/IFrame1"

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import NullComponent from "./NullComponent"

class ComponentMap {
    constructor(preview, edit, create, update) {
        this.preview = preview
        this.edit = edit
        this.create = create
        this.update = update
    }
}

const componentMappings = {
    'Text1': new ComponentMap(Text1, Text1_EDIT, (parentId) => {
        return ComponentDAO.insert(new ComponentDTO({
            parentId: parentId,
            type: "Text1",
            value: "<h1>Example Text</h1>"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            value: "<h1>Example Text</h1>",
            ...comp.toFilteredJSON(),
            type: "Text1"
        }))
    }),
    'Navbar1': new ComponentMap(Navbar1, Navbar1_EDIT, (parentId) => {
        return ComponentDAO.insert(new ComponentDTO({
            parentId: parentId,
            type: "Navbar1"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Navbar1"
        }))
    }),
    'Photo1': new ComponentMap(Photo1, Photo1_EDIT, (parentId) => {
        return ComponentDAO.insert(new ComponentDTO({
            parentId: parentId,
            type: "Photo1",
            src: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            src: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
            ...comp.toFilteredJSON(),
            type: "Photo1"
        }))
    }),
    'CarouselItem1': new ComponentMap(NullComponent, NullComponent, (parentId) => {
        return ComponentDAO.insert(new ComponentDTO({
            parentId: parentId,
            type: "CarouselItem1",
            src: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
            value: "<h3>Image Title</h3><p>Image Caption</p>"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            src: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
            value: "<h3>Image Title</h3><p>Image Caption</p>",
            ...comp.toFilteredJSON(),
            type: "CarouselItem1"
        }))
    }),
    'Carousel1': new ComponentMap(Carousel1, Carousel1_EDIT, (parentId) => {
        return ComponentDAO.insert(new ComponentDTO({
            parentId: parentId,
            type: "Carousel1"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Carousel1"
        }))
    }),
    'Col': new ComponentMap(Col, Col_EDIT, (parentId, index) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                parentId: parentId,
                type: "Col",
                index: index
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Col"
        }))
    }),
    'Row': new ComponentMap(Row, Row_EDIT, (parentId) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                parentId: parentId,
                type: "Row"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Row"
        }))
    }),
    'Section': new ComponentMap(Section, Section_EDIT, (parentId) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                parentId: parentId,
                type: "Section"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Section"
        }))
    }),
    'Container': new ComponentMap(Container, Container_EDIT, (parentId) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                parentId: parentId,
                type: "Container"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Container"
        }))
    }),
    'IFrame1': new ComponentMap(IFrame1, IFrame1_EDIT, (parentId) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                parentId: parentId,
                type: "IFrame1"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "IFrame1"
        }))
    })
}

export default componentMappings;