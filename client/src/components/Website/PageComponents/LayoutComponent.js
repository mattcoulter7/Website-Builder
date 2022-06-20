import React from "react"
import ConfigurableComponent from "./ConfigurableComponent";

const pointInRect = (pt, rect) => {
    return rect.x <= pt[0] && pt[0] <= rect.x + rect.width &&
        rect.y <= pt[1] && pt[1] <= rect.y + rect.height;
}

const getEdgeSegments = (bounds, segmentWidth) => {
    return {
        'Top': new DOMRect(bounds.x + segmentWidth, bounds.y, bounds.width - segmentWidth / 2, segmentWidth),
        'Left': new DOMRect(bounds.x, bounds.y + segmentWidth, segmentWidth, bounds.height - segmentWidth / 2),
        'Right': new DOMRect(bounds.right - segmentWidth, bounds.y + segmentWidth, segmentWidth, bounds.height - segmentWidth / 2),
        'Bottom': new DOMRect(bounds.x + segmentWidth, bounds.bottom - segmentWidth, bounds.width - segmentWidth / 2, segmentWidth),
    }
}

const getHovering = (dragEvent, clientRect, tolerance = 20) => {
    let pt = [dragEvent.clientX, dragEvent.clientY];
    let edgeSegments = getEdgeSegments(clientRect, tolerance);
    let hovering = Object.entries(edgeSegments).find(pair => pointInRect(pt, pair[1]))
    return hovering;
}

export default class LayoutComponent extends ConfigurableComponent {
    constructor(props) {
        super(props)
        this.layoutRef = React.createRef();
    }
    onDragOver(e) {
        e.preventDefault()
        e.stopPropagation()
        let hovering = getHovering(e, this.layoutRef.current.getBoundingClientRect())

        this.layoutRef.current.style.border = "5px dashed #eeeeee"
        this.layoutRef.current.style.backgroundColor = ""

        if (hovering) {
            this.layoutRef.current.style[`border${hovering[0]}`] = "5px solid navy"
        } else {
            this.layoutRef.current.style.backgroundColor = "rgb(250,250,250)"
        }
    }
    onDragLeave(e) {
        this.layoutRef.current.style.border = "5px solid transparent"
        this.layoutRef.current.style.backgroundColor = ""
    }
    onDrop(e) {
        e.preventDefault()
        e.stopPropagation()

        this.layoutRef.current.style.border = "5px solid transparent"
        this.layoutRef.current.style.backgroundColor = ""

        let hovering = getHovering(e, this.layoutRef.current.getBoundingClientRect())

        let ref = ConfigurableComponent.dragged;
        if (hovering) {
            this[`onDrop${hovering[0]}`](e, ref);
        } else {
            this.onDropBody(e, ref)
        }
    }
    onDropLeft(e) {

    }
    onDropRight(e) {

    }
    onDropTop(e) {

    }
    onDropBottom(e) {

    }
    onDropBody(e) {

    }
    render(props) {
        props = props || this.props;
        return (
            <div
                className={props.className}
                ref={this.layoutRef}
                onDragLeave={(e) => this.onDragLeave(e)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}>
                {true ? null : this.props.component.type + " (" + this.props.component._id + ")"}
                {props.children}
            </div>
        )
    }
}