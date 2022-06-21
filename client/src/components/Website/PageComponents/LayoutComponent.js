import React from "react"
import ComponentMappings from "./ComponentMapping";
import ConfigurableComponent from "./ConfigurableComponent";
import EditableComponent from "./EditableComponent";

import ComponentDAO from "../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../DTOs/ComponentDTO";

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

        let ref = EditableComponent.dragged;
        if (hovering) {
            this[`onDrop${hovering[0]}`](e, ref);
        } else {
            this.onDropBody(e, ref)
        }
    }
    onDropTop(e, ref) {
        if (this.props.onDropTop) {
            return this.props.onDropTop(e, ref);
        }
        let index = this.props.component.index - 1
        this.mountVertically(e, ref, index)
    }
    onDropBottom(e, ref) {
        if (this.props.onDropBottom) {
            return this.props.onDropBottom(e, ref);
        }
        let index = this.props.component.index + 1
        this.mountVertically(e, ref, index)
    }
    mountVertically(e, ref, index) {
        ref.props.parentContext().whenDelete(ref.props.component);
        ref.props.component.parentId = this.props.context().props.parentContext().props.component._id;
        this.props.context().props.parentContext().onUpdateChildIndex(ref.props.component, index)
    }

    onDropLeft(e, ref) {
        if (this.props.onDropLeft) {
            return this.props.onDropLeft(e, ref);
        }

        let index = this.props.context().props.parentContext().props.component.index - 1;
        this.mountHorizontally(e, ref, index);
    }
    onDropRight(e, ref) {
        if (this.props.onDropRight) {
            return this.props.onDropRight(e, ref);
        }

        let index = this.props.context().props.parentContext().props.component.index + 1;
        this.mountHorizontally(e, ref, index);
    }
    mountHorizontally(e, ref, index) {
        // call whenDelete of component parent (removing it)
        ref.props.parentContext().whenDelete(ref.props.component);

        // add column to row that the element resides within
        ComponentMappings.Col.create(this.props.context().props.parentContext().props.parentContext().props.component._id, index)
            .then((col) => {
                // place the component inside of the column
                ComponentDAO.update(new ComponentDTO({
                    ...ref.props.component.toJSON(),
                    parentId: col._id
                }))
                    .then((result) => {
                        // call whenInsert on row to place the column inside it
                        this.props.context().props.parentContext().props.parentContext().onUpdateChildIndex(col, index)
                    })
            })
    }

    onDropBody(e, ref) {
        if (this.props.onDropBody) {
            return this.props.onDropBody(e, ref);
        }
    }
    mountInternally(e, ref, index) {
    }
    componentDidMount() {
        this.layoutRef.current.style.border = "5px solid transparent"
        this.layoutRef.current.style.backgroundColor = ""
    }
    render() {
        return (
            <div
                className={this.props.className}
                ref={this.layoutRef}
                onDragLeave={(e) => this.onDragLeave(e)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}>
                {true ? null : this.props.component.type + " (" + this.props.component._id + ")"}
                {this.props.children}
            </div>
        )
    }
}