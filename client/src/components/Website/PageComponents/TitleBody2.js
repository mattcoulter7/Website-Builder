import React from "react";

export default class TitleBody2 extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div dangerouslySetInnerHTML={{ __html: this.props.component.title }}></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div dangerouslySetInnerHTML={{ __html: this.props.component.body }}></div>
                    </div>
                </div>
            </div>
        );
    }

    static _DefaultComponentValues() {
        return {
            type: "TitleBody2",
            title: "<h1>Example Title</h1>",
            body: `<p>Example Body</p>`
        };
    }
}