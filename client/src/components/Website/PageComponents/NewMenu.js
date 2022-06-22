import React from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

import ComponentMapping, { deepCreate, deepDelete } from './ComponentMapping'
import IMoveable from './IMoveable';

import { Tabs, Tab, Accordion } from 'react-bootstrap'

import NewMenuSection from './NewMenuSection';

class NewMenu extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            "Section Layouts": [],
            "User Defined Layouts": []
        }
    }
    componentDidMount() {
        return ComponentDAO.select()
            .then((components) => {
                this.setState({
                    "Section Layouts": components.filter(comp => comp.presetGroup == 'DEFAULT'),
                    "User Defined Layouts": components.filter(comp => comp.presetGroup == 'USER')
                })
            })
    }

    createTemplate(template) {
        deepCreate(template, this.props.page._id)
            .then((section) => {
                this.props.context().whenInsert(section)
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
                    {
                        Object.entries(this.state).map((pair, i) =>
                            <Tab eventKey={`${i}`} title={pair[0]}>
                                <NewMenuSection
                                    components={pair[1]}
                                    create2={(comp) => this.createTemplate(comp)}
                                    context={() => this.props.context()} />
                            </Tab>)
                    }
                </Tabs>
            </div>
        )
    }
}

export default NewMenu;