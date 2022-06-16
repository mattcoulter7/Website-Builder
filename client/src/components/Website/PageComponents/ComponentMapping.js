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

class ComponentMap {
    constructor(preview, edit, create, update) {
        this.preview = preview
        this.edit = edit
        this.create = create
        this.update = update
    }
}

const componentMappings = {
    'Text1': new ComponentMap(null, Text1_EDIT, (parentId) => {
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
    'Navbar1': new ComponentMap(null, Navbar1_EDIT, (parentId) => {
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
    'Photo1': new ComponentMap(null, Photo1_EDIT, (parentId) => {
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
    'Carousel1': new ComponentMap(null, Carousel1_EDIT, (parentId) => {
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
    'Col': new ComponentMap(null, Col_EDIT, (parentId) => {
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
    'Row': new ComponentMap(null, Row_EDIT, (parentId) => {
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
    'Section': new ComponentMap(null, Section_EDIT, (parentId) => {
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
    'Container': new ComponentMap(null, Container_EDIT, (parentId) => {
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