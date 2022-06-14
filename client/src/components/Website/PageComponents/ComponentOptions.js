import React from "react";

import TitleBody1 from "./TitleBody1"

import NewLine from "./NewLine";

const componentMapping = {
    'TitleBody1': TitleBody1
}


export default class blah extends React.Component {
    toggleOptions(enabled) {
        this.setState({
            showOptions:true
        })
    }

    render() {
        var CustomComponent = componentMapping[this.props.component.type];
        if (!CustomComponent) return (<></>);

        return (
            <div onMouseEnter={() => this.toggleOptions(true)} onMouseLeave={() => this.toggleOptions(false)}>
                <CustomComponent component={this.props.component}>
                    {(() => {
                        if (this.state.showOptions){
                            return (
                                <div class="row shadow-sm p-3 mb-5 bg-white rounded">
                                    <div>
                                        
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </CustomComponent>
            </div>
        );
    }
}