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
    getFirstFocusserParent(element){
        while (element && !element.classList.contains('focusser')){
            element = element.parentElement;
        }
        return element;
    }

    handleClickOutside(event) {
        const isInside = this.wrapperRef && this.wrapperRef.current.contains(event.target);
        const isDirectContact = this.wrapperRef && this.wrapperRef.current == this.getFirstFocusserParent(event.target);

        if ((this.props.directContact && isDirectContact) ||
            (!this.props.directContact && isInside)) {
            return this.props.onFocus && this.props.onFocus(event);
        }
        return this.props.onBlur && this.props.onBlur(event);

    }

    render() {
        return <div className={`focusser ${this.props.className}`} style={{
            ...(this.props.style || {})
        }} ref={this.wrapperRef}>{this.props.children}</div>;
    }
}