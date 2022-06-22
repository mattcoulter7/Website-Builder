import React from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

import ComponentMapping, { deepCreate, deepDelete } from './ComponentMapping'
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
        deepCreate(userDefinedComponent, this.props.page._id)
            .then((result) => {
                this.props.context().whenInsert(result)
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
                        <div style={{
                            height: "40rem",
                            overflowY: "scroll"
                        }}>
                            {
                                TemplateMapping.map((temp) =>
                                    <div class="card">
                                        <img src="https://photographytraining.tpub.com/14208/img/14208_31_1.jpg" class="card-img-top" alt="Section Layout" />
                                        <div class="card-body">

                                            <button className="btn btn-primary" onClick={() => this.createDefaultTemplate(temp)}>{temp.name}</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="1" title="User Defined Layouts">
                        <div style={{
                            height: "40rem",
                            overflowY: "scroll"
                        }}>
                            {this.state.userDefinedComponents.map((temp, i) =>
                                <div class="card">
                                    <div class="card-body">
                                        {
                                            (() => {
                                                const CustomComponent = ComponentMapping[temp.type]
                                                return (<CustomComponent.preview website={this.props.context().state.website} page={this.props.context().state.page} pages={this.props.context().state.pages} component={temp} />)
                                            })()
                                        }
                                        <button className="btn btn-primary" onClick={() => this.createUserDefinedTemplate(temp)}>User Defined Template {i}</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default NewMenu;