import React from "react";

export default class blah extends React.Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
                <div className="row">
                    <div className="col">
                        <h1>{this.props.component.title}</h1>
                    </div>
                    <div className="col">
                        <p>{this.props.component.body}</p>
                    </div>
                </div>
            </div>
        );
    }
}