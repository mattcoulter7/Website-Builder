import React from "react";

export default class TitlePhoto1 extends React.Component {
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
                        <img src={this.props.component.imageUrl} class="img-fluid" alt="Responsive image" />
                    </div>
                </div>
            </div>
        );
    }

    static _DefaultComponentValues() {
        return {
            type: "TitlePhoto2",
            title: "<h1>Photo Title</h1>",
            imageUrl: `https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg`
        };
    }
}