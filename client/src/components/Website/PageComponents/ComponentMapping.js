import Navbar1_EDIT from "./Navbar/Navbar1_EDIT"

import Text1_EDIT from "./Text/Text1_EDIT"

import Photo1_EDIT from "./Image/Photo1_EDIT"
import Carousel1_EDIT from "./Image/Carousel1_EDIT"

import Col_EDIT from "./Layouts/Col_EDIT"
import Row_EDIT from "./Layouts/Row_EDIT"

import Section_EDIT from "./Layouts/Section_EDIT"
import Container_EDIT from "./Layouts/Container_EDIT"

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
    'Text1': new ComponentMap(NullComponent, Text1_EDIT, (parentId) => {
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
    'Navbar1': new ComponentMap(NullComponent, Navbar1_EDIT, (parentId) => {
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
    'Photo1': new ComponentMap(NullComponent, Photo1_EDIT, (parentId) => {
        return ComponentDAO.insert(new ComponentDTO({
            parentId: parentId,
            type: "Photo1",
            src:"https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            src:"https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
            ...comp.toFilteredJSON(),
            type: "Photo1"
        }))
    }),
    'CarouselItem1': new ComponentMap(NullComponent, NullComponent, (parentId) => {
        return ComponentDAO.insert(new ComponentDTO({
            parentId: parentId,
            type: "CarouselItem1",
            src:"https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
            value:"<h3>Image Title</h3><p>Image Caption</p>"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            src:"https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
            value:"<h3>Image Title</h3><p>Image Caption</p>",
            ...comp.toFilteredJSON(),
            type: "CarouselItem1"
        }))
    }),
    'Carousel1': new ComponentMap(NullComponent, Carousel1_EDIT, (parentId) => {
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
    'Col': new ComponentMap(NullComponent, Col_EDIT, (parentId) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                parentId: parentId,
                type: "Col"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Col"
        }))
    }),
    'Row': new ComponentMap(NullComponent, Row_EDIT, (parentId) => {
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
    'Section': new ComponentMap(NullComponent, Section_EDIT, (parentId) => {
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
    'Container': new ComponentMap(NullComponent, Container_EDIT, (parentId) => {
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
    })
}

export default componentMappings;