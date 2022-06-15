import React from "react";

export default class blah extends React.Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
                <div className="row">
                    <div className="col" dangerouslySetInnerHTML={{__html: this.props.component.title}}>
                    </div>
                    <div className="col" dangerouslySetInnerHTML={{__html: this.props.component.body}}>
                    </div>
                </div>
            </div>
        );
    }
}