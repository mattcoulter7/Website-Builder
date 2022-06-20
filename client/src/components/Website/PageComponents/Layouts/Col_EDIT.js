import React from "react";

import ComponentMapping from "../ComponentMapping";
import ConfigurableComponent from "../ConfigurableComponent";

const pointInRect = (pt, rect) => {
    return rect.x <= pt[0] && pt[0] <= rect.x + rect.width &&
        rect.y <= pt[1] && pt[1] <= rect.y + rect.height;
}

const getEdgeSegments = (bounds, segmentWidth) => {
    return {
        'borderTop': new DOMRect(bounds.x + segmentWidth, bounds.y, bounds.width - segmentWidth / 2, segmentWidth),
        'borderLeft': new DOMRect(bounds.x, bounds.y + segmentWidth, segmentWidth, bounds.height - segmentWidth / 2),
        'borderRight': new DOMRect(bounds.right - segmentWidth, bounds.y + segmentWidth, segmentWidth, bounds.height - segmentWidth / 2),
        'borderBottom': new DOMRect(bounds.x + segmentWidth, bounds.bottom - segmentWidth, bounds.width - segmentWidth / 2, segmentWidth),
    }
}

const getHovering = (dragEvent, clientRect, tolerance = 20) => {
    let pt = [dragEvent.clientX, dragEvent.clientY];
    let edgeSegments = getEdgeSegments(clientRect, tolerance);
    let hovering = Object.entries(edgeSegments).find(pair => pointInRect(pt, pair[1]))
    return hovering;
}

export default class Col_EDIT extends ConfigurableComponent {
    constructor(props) {
        super(props)
        this.layoutRef = React.createRef();
    }
    onDragOver(e) {
        e.preventDefault()
        let hovering = getHovering(e, this.layoutRef.current.getBoundingClientRect())

        this.layoutRef.current.style.border = ""

        if (!hovering) return;
        this.layoutRef.current.style[hovering[0]] = "solid black 5px"

        console.log(hovering)
    }

    onDragLeave(e) {
        this.layoutRef.current.style.border = ""
    }

    onDrop(e) {
        this.layoutRef.current.style.border = ""
    }

    onNew() {
        ComponentMapping.Text1.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result);
            })
    }
    render() {
        return (
            <div
                ref={this.layoutRef}
                className="col"
                onDragLeave={(e) => this.onDragLeave(e)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}
                style={{
                    minHeight: "5rem"
                }}>
                {
                    super.render(
                        this.state.children
                            .map(comp => {
                                const CustomComponent = ComponentMapping[comp.type]
                                return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler} />
                            })
                    )
                }
            </div>
        )
    }
}