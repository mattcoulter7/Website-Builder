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

import ComponentMapping from "./ComponentMapping"

let componentInits = [

    (values = {}) => new Promise((success, failure) => {
        ComponentMapping.Section.create(undefined, values)
            .then((section) => {
                ComponentMapping.Container.create(section._id)
                    .then((container) => {
                        ComponentMapping.Row.create(container._id)
                            .then((row) => {
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Text1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                            })
                    })
            })
    }),

    (values = {}) => new Promise((success, failure) => {
        ComponentMapping.Section.create(undefined, values)
            .then((section) => {
                ComponentMapping.Container.create(section._id)
                    .then((container) => {
                        ComponentMapping.Row.create(container._id)
                            .then((row) => {
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Text1.create(col._id)
                                            .then((text1) => {
                                            })
                                    })
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Photo1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                            })
                    })
            })
    }),

    (values = {}) => new Promise((success, failure) => {
        ComponentMapping.Section.create(undefined, values)
            .then((section) => {
                ComponentMapping.Container.create(section._id)
                    .then((container) => {
                        ComponentMapping.Row.create(container._id)
                            .then((row) => {
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Photo1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Text1.create(col._id)
                                            .then((text1) => {
                                            })
                                    })
                            })
                    })
            })
    }),

    (values = {}) => new Promise((success, failure) => {
        ComponentMapping.Section.create(undefined, values)
            .then((section) => {
                ComponentMapping.Container.create(section._id)
                    .then((container) => {
                        ComponentMapping.Row.create(container._id)
                            .then((row) => {
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Photo1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Photo1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Photo1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                            })
                    })
            })
    }),

    (values = {}) => new Promise((success, failure) => {
        ComponentMapping.Section.create(undefined, values)
            .then((section) => {
                ComponentMapping.Container.create(section._id)
                    .then((container) => {
                        ComponentMapping.Row.create(container._id)
                            .then((row) => {
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Text1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Text1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                                ComponentMapping.Col.create(row._id)
                                    .then((col) => {
                                        ComponentMapping.Text1.create(col._id)
                                            .then((text1) => {
                                                success(section)
                                            })
                                    })
                            })
                    })
            })
    }),

    (values = {}) => new Promise((success, failure) => {
        ComponentMapping.Section.create(undefined, values)
            .then((section) => {
                ComponentMapping.Navbar1.create(section._id)
                    .then((navbar1) => {
                        success(navbar1)
                    })
            })
    })
]

/*
Promise.all(Window.componentInits.map(ci => ci({
    presetGroup: "DEFAULT"
}))).then(result => console.log("DONE!"))
*/
Window.componentInits = componentInits;

export default componentInits;