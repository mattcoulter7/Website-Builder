import React from "react";

export default class CustomFocusser extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handle = this.handle.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handle);
        document.addEventListener("mousemove", this.handle);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handle);
        document.removeEventListener("mousemove", this.handle);
    }

    //#region Custom Override Events
    mousemoveonFocusDirect(e) {
        this.props.mousemoveonFocusDirect && this.props.mousemoveonFocusDirect(e);
    }
    mousemoveonBlurDirect(e) {
        this.props.mousemoveonBlurDirect && this.props.mousemoveonBlurDirect(e);
    }
    mousemoveonFocus(e) {
        this.props.mousemoveonFocus && this.props.mousemoveonFocus(e);
    }
    mousemoveonBlur(e) {
        this.props.mousemoveonBlur && this.props.mousemoveonBlur(e);
    }
    mousedownonFocusDirect(e) {
        this.props.mousedownonFocusDirect && this.props.mousedownonFocusDirect(e);
    }
    mousedownonBlurDirect(e) {
        this.props.mousedownonBlurDirect && this.props.mousedownonBlurDirect(e);
    }
    mousedownonFocus(e) {
        this.props.mousedownonFocus && this.props.mousedownonFocus(e);
    }
    mousedownonBlur(e) {
        this.props.mousedownonBlur && this.props.mousedownonBlur(e);
    }
    //#endregion

    /**
     * Alert if clicked on outside of element
     */
    getFirstFocusserParent(element) {
        while (element && !element.classList.contains('focusser')) {
            element = element.parentElement;
        }
        return element;
    }

    handle(event) {
        const isInside = this.wrapperRef && this.wrapperRef.current.contains(event.target);
        const isDirectContact = this.wrapperRef && this.wrapperRef.current == this.getFirstFocusserParent(event.target);

        if (isInside) {
            if (isDirectContact) {
                // inside the element and mouse directly on it
                this[`${event.type}onFocusDirect`] && this[`${event.type}onFocusDirect`](event);
            } else {
                // inside the element
                this[`${event.type}onFocus`] && this[`${event.type}onFocus`](event);
                // inside the element and mouse not directly on it
                this[`${event.type}onBlurDirect`] && this[`${event.type}onBlurDirect`](event);
            }
        }
        else {
            // outside the element
            this[`${event.type}onBlur`] && this[`${event.type}onBlur`](event);
        }

    }

    render(children) {
        children = children || this.props.children;
        return <div className="focusser" ref={this.wrapperRef}>{children}</div>;
    }
}