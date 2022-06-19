import React from "react";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import FileDAO from "../../../../DAOs/FileDAO";
import EditComponent from "../EditComponent";

export default class IFrame1_Edit extends EditComponent {
    constructor(props) {
        super(props, {
            height: 0
        })
        this.iframeRef = React.createRef(this);
        this.handleResize = this.handleResize.bind(this);
    }
    handleResize() {
        this.iframeRef.current.height = this.iframeRef.current.clientWidth * 9 / 16;
    }
    componentDidMount() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }
    render() {
        return super.render(
            <>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" ref={this.iframeRef} src={this.props.component.src} title="YouTube video player" style={{
                        width: "100%"
                    }} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen={true}></iframe>
                </div>
                {
                    (() => {
                        return this.state.focus ? <input className="form-control" type="text" value={this.props.component.src} onChange={(e) => {
                            this.save({ src: e.target.value })
                        }} /> : null
                    })()
                }
            </>
        );
    }
}