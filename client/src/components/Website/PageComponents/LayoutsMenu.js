import React from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import ComponentDAO from '../../../DAOs/ComponentDAO';
import ComponentDTO from '../../../DTOs/ComponentDTO';

import ComponentMapping from './ComponentMapping'
import IMoveable from './IMoveable';

import { Tabs, Tab, Accordion } from 'react-bootstrap'

class LayoutsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }
    render() {
        if (!this.props.component) return;

        const buttons = Object.entries(ComponentMapping).map(pair =>
            <button
                className="btn btn-primary btn-sm m-1"
                onClick={() => {
                    pair[1].update(this.props.component)
                        .then((result) => {
                            let thisComponent = this.props.parentContext();
                            let thisComponentContainer = thisComponent.props.parentContext();
                            if (thisComponentContainer) {
                                thisComponentContainer.onUpdate(result)
                            }
                        })
                }}
            >
                {pair[0]}
            </button>
        )
        return (
            <div ref={this.wrapperRef} class="card shadow-sm bg-white rounded" style={{
                width: "20rem",
                position:"fixed",
                top:"50%",
                right:"30rem"
            }}>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => {
                    this.props.parentContext().setState({
                        showMajorMenu: false
                    })
                }}></button>
                <IMoveable dragElement={this.wrapperRef} />
                <Tabs
                    defaultActiveKey="0"
                    transition={false}
                    className="mb-3 nav-fill"
                >
                    {this.props.tabs.map((tab, i) =>
                        <Tab eventKey={i} title={tab.name}>
                            <Accordion defaultActiveKey="0">
                                <div style={{
                                    height: "20rem",
                                    overflowY: "scroll"
                                }}>
                                    {tab.content}
                                    {tab.sections.map((section, i) => (
                                        <Accordion.Item eventKey={`${i}`} >
                                            <Accordion.Header>{section.name}</Accordion.Header>
                                            <Accordion.Body style={{
                                                maxHeight: "20rem",
                                                overflowY: "scroll"
                                            }}>
                                                {section.content}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </div>
                            </Accordion>
                        </Tab>
                    )}
                </Tabs>
            </div>
        )
    }
}

export default LayoutsMenu;