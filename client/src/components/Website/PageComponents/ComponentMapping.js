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

export default {
    'Text1': new ComponentMap(Text1, Text1_EDIT, (parentId, values = {}) => {
        return ComponentDAO.insert(new ComponentDTO({
            ...values,
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
    'Navbar1': new ComponentMap(Navbar1, Navbar1_EDIT, (parentId, values = {}) => {
        return ComponentDAO.insert(new ComponentDTO({
            ...values,
            parentId: parentId,
            type: "Navbar1"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Navbar1"
        }))
    }),
    'Photo1': new ComponentMap(Photo1, Photo1_EDIT, (parentId, values = {}) => {
        return ComponentDAO.insert(new ComponentDTO({
            ...values,
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
    'CarouselItem1': new ComponentMap(NullComponent, NullComponent, (parentId, values = {}) => {
        return ComponentDAO.insert(new ComponentDTO({
            ...values,
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
    'Carousel1': new ComponentMap(Carousel1, Carousel1_EDIT, (parentId, values = {}) => {
        return ComponentDAO.insert(new ComponentDTO({
            ...values,
            parentId: parentId,
            type: "Carousel1"
        }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Carousel1"
        }))
    }),
    'Col': new ComponentMap(Col, Col_EDIT, (parentId, values = {}) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                ...values,
                parentId: parentId,
                type: "Col"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Col"
        }))
    }),
    'Row': new ComponentMap(Row, Row_EDIT, (parentId, values = {}) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                ...values,
                parentId: parentId,
                type: "Row"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Row"
        }))
    }),
    'Section': new ComponentMap(Section, Section_EDIT, (parentId, values = {}) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                ...values,
                parentId: parentId,
                type: "Section"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Section"
        }))
    }),
    'Container': new ComponentMap(Container, Container_EDIT, (parentId, values = {}) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                ...values,
                parentId: parentId,
                type: "Container"
            }))
    }, (comp) => {
        return ComponentDAO.update(new ComponentDTO({
            ...comp.toFilteredJSON(),
            type: "Container"
        }))
    }),
    'IFrame1': new ComponentMap(IFrame1, IFrame1_EDIT, (parentId, values = {}) => {
        return ComponentDAO
            .insert(new ComponentDTO({
                ...values,
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

export const deepDelete = (comp) => {
    return new Promise((success, failure) => {
        ComponentDAO.select()
            .then((result) => {
                const deleteEntirely = (comp) => {
                    let children = result.filter(c => c.parentId == comp._id)
                    children.forEach(deleteEntirely)
                    return ComponentDAO.delete(comp._id)
                }
                deleteEntirely(comp)
                    .then((result) => {
                        success(result)
                    })
            });
    })
}

export const deepCreate = (comp, parentId, values = {}) => {
    return new Promise((success, failure) => {
        ComponentDAO.select()
            .then((components) => {
                const createEntirely = (comp, parentId, values = {}) => {
                    // find all children of the parent components
                    let children = components.filter(c => c.parentId == comp._id)

                    //create a duplicate of the parent
                    return ComponentDAO.insert(new ComponentDTO({
                        ...comp.toJSON(),
                        _id: undefined, // ensure no id so it insert a duplciate
                        presetGroup: undefined, // if created from a presetGroup it should be cleared for the actual scene object instance
                        parentId: parentId,
                        ...values
                    }))
                        .then((dup) => {
                            // create a duplicate of all the children components and link them to the duplicate parent
                            children.forEach((child) => {
                                createEntirely(child, dup._id)
                            })
                            return dup;
                        })
                }
                createEntirely(comp, parentId, values)
                    .then(result => {
                        success(result)
                    })
            })
    })
}