import React from "react";

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