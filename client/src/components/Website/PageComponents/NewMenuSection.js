import React from 'react'

import ComponentMapping, { deepCreate, deepDelete } from './ComponentMapping'

import { Tab } from 'react-bootstrap'

class NewMenuSection extends React.Component {
    render() {
        return (
            <div style={{
                height: "40rem",
                overflowY: "scroll"
            }}>
                {this.props.components.map((comp, i) =>
                    <div class="card" onClick={() => this.props.create2(comp)} style={{
                        cursor:"pointer",
                        width:"100%"
                    }}>
                        <div class="card-body">
                            {
                                (() => {
                                    const CustomComponent = ComponentMapping[comp.type]
                                    return (<CustomComponent.preview
                                        website={this.props.context().state.website}
                                        page={this.props.context().state.page}
                                        pages={this.props.context().state.pages}
                                        component={comp} />)
                                })()
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default NewMenuSection;