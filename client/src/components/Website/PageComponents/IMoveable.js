import React from "react";

import { BsThreeDots } from "react-icons/bs"

export default class IMoveable extends React.Component {
    constructor(props) {
        super(props);
        this.movementX = null
        this.movementY = null

        this.dragging = false;
    }
    handleEvent(e) {
        this[e.type] && this[e.type](e);
    }
    mouseup(e) {
        this.onDragEnd(e);
    }
    mousemove(e) {
        this.onDrag(e);
    }
    onDragStart(e) {
        e.preventDefault()
        this.dragging = true;

        e.stopPropagation();

        this.movementX = e.pageX;
        this.movementY = e.pageY;

    }
    move(e) {
        this.movementX = e.pageX - this.movementX;
        this.movementY = e.pageY - this.movementY;

        const dragRect = this.props.dragElement.current.getBoundingClientRect();
        const pageRect = document.body.getBoundingClientRect();

        let pxX = dragRect.x + this.movementX;
        let pxY = dragRect.y + this.movementY;

        let percentX = pxX / pageRect.width * 100;
        let percentY = pxY / pageRect.height * 100;

        this.props.dragElement.current.style.left = `${percentX}%`;
        this.props.dragElement.current.style.top = `${percentY}%`;
    }
    onDrag(e) {
        if (!this.dragging) return;
        e.stopPropagation();

        this.move(e);

        this.movementX = e.pageX;
        this.movementY = e.pageY;
    }
    onDragEnd(e) {
        if (!this.dragging) return;
        e.stopPropagation();

        this.move(e);

        this.movementX = null;
        this.movementY = null;

        this.dragging = false;
    }
    componentDidMount() {
        document.addEventListener("mouseup", this);
        document.addEventListener("mousemove", this);
    }
    componentWillUnmount() {
        document.removeEventListener("mouseup", this);
        document.removeEventListener("mousemove", this);
    }
    render() {
        return (
            <div
                onMouseDown={(e) => this.onDragStart(e)}
            >
                <BsThreeDots />
            </div>)
    }
}