import React from "react";

export default class blah extends React.Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
                <div className="row">
                    <div className="col">
                        <div dangerouslySetInnerHTML={{__html: this.props.component.title}}></div>
                    </div>
                    <div className="col">
                        <div dangerouslySetInnerHTML={{__html: this.props.component.body}}></div>
                    </div>
                </div>
            </div>
        );
    }
}