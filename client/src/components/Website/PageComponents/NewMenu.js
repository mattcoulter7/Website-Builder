import React from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

import ComponentMapping from './ComponentMapping'
import IMoveable from './IMoveable';

import { Tabs, Tab, Accordion } from 'react-bootstrap'

import TemplateMapping from './TemplateMapping';

class NewMenu extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            userDefinedComponents: []
        }
    }
    componentDidMount() {
        return ComponentDAO.select()
            .then((components) => {
                return components.filter(comp => comp.isTemplate && comp.parentId == this.props.website._id)
            })
            .then((components) => {
                this.setState({
                    userDefinedComponents: components
                })
            })
    }

    createDefaultTemplate(template) {
        template.create(this.props.page._id)
            .then((section) => {
                this.props.context().whenInsert(section)
            })
    }

    createUserDefinedTemplate(userDefinedComponent) {
        ComponentDAO.select()
            .then((components) => {
                const createEntirely = (comp, parentId) => {
                    // find all children of the parent components
                    let children = components.filter(c => c.parentId == comp._id)

                    //create a duplicate of the parent
                    return ComponentDAO.insert(new ComponentDTO({
                        ...comp.toJSON(),
                        _id: undefined, // ensure no id so it insert a duplciate
                        parentId: parentId
                    }))
                        .then((dup) => {
                            // create a duplicate of all the children components and link them to the duplicate parent
                            children.forEach((child) => {
                                createEntirely(child, dup._id)
                            })
                            return dup;
                        })
                }
                createEntirely(userDefinedComponent, this.props.page._id)
                    .then(result => {
                        this.props.context().whenInsert(result)
                    })
            })
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="card shadow-sm bg-white rounded" style={{
                ...this.props.style || {},
                width: "40rem",
                position: "fixed",
                zIndex: 10000
            }}>
                <button type="button" className="btn-close" aria-label="Close" onClick={this.props.onClose}></button>
                <IMoveable dragElement={this.wrapperRef} />
                <Tabs
                    defaultActiveKey="0"
                    transition={false}
                    className="mb-3 nav-fill">
                    <Tab eventKey="0" title="Section Layouts">
                        {
                            TemplateMapping.map((temp) =>
                                <div class="card" style={{
                                    width: "18rem"
                                }}>
                                    <img src="https://photographytraining.tpub.com/14208/img/14208_31_1.jpg" class="card-img-top" alt="Section Layout" />
                                    <div class="card-body">

                                        <button className="btn btn-primary" onClick={() => this.createDefaultTemplate(temp)}>{temp.name}</button>
                                    </div>
                                </div>
                            )
                        }
                    </Tab>
                    <Tab eventKey="1" title="User Defined Layouts">
                        {this.state.userDefinedComponents.map((comp, i) =>
                            <div class="card" style={{
                                width: "18rem"
                            }}>
                                <img src="https://photographytraining.tpub.com/14208/img/14208_31_1.jpg" class="card-img-top" alt="Section Layout" />
                                <div class="card-body">

                                    <button className="btn btn-primary" onClick={() => this.createUserDefinedTemplate(comp)}>User Defined Template {i}</button>
                                </div>
                            </div>
                        )}
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default NewMenu;