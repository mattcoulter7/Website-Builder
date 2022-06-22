import React from "react";

import ConfigurableComponent from "../ConfigurableComponent";

export default class IFrame1 extends ConfigurableComponent {
    constructor(props) {
        super(props, {}, {
            height: 0
        })
        this.iframeRef = React.createRef(this);
    }
    handleResize() {
        this.iframeRef.current.height = this.iframeRef.current.clientWidth * 9 / 16;
    }
    componentDidMount() {
        super.componentDidMount();
        this.handleResize()
        window.addEventListener("resize", () => this.handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.handleResize());
    }
    render() {
        return (
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" ref={this.iframeRef} src={this.state.src} title="YouTube video player" style={{
                    width: "100%"
                }} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen={true}></iframe>
            </div>
        );
    }
}