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

export default class LayoutComponent extends React.Component {
    constructor(props) {
        super(props)
        this.layoutRef = React.createRef();
    }
    onDragOver(e) {
        e.preventDefault()
        e.stopPropagation()
        let hovering = getHovering(e, this.layoutRef.current.getBoundingClientRect())

        this.layoutRef.current.style.border = "5px dashed transparent"

        if (!hovering) return;
        this.layoutRef.current.style[`border${hovering[0]}`] = "5px solid black"
    }
    onDragLeave(e) {
        this.layoutRef.current.style.border = "5px solid transparent"
    }
    onDrop(e) {
        this.layoutRef.current.style.border = "5px solid transparent"
    }
    render() {
        return (
            <div
                className={this.props.className}
                ref={this.layoutRef}
                onDragLeave={(e) => this.onDragLeave(e)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}>
                {this.props.children}
            </div>
        )
    }
}