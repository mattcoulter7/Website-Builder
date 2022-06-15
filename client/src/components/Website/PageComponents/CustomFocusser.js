import React, { Component } from "react";

export default class CustomFocusser extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        const isOutside = this.wrapperRef && !this.wrapperRef.current.contains(event.target);
        if (isOutside) {
            this.props.onBlur && this.props.onBlur(event);
        } else {
            this.props.onFocus && this.props.onFocus(event);
        }
    }

    render() {
        return <div className={this.props.className} ref={this.wrapperRef}>{this.props.children}</div>;
    }
}