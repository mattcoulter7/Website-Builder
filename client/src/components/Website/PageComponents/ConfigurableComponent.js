
import React from "react"
import { TelephoneMinus } from "react-bootstrap-icons";

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import IFocusable from "./IFocusable"
import LayoutsMenu from "./LayoutsMenu";
import OptionsMenu from "./OptionsMenu";

import FunctionDoesSomething from '../../../Utils/FunctionDoesSomething'
import ComponentMapping, { deepCreate, deepDelete } from "./ComponentMapping";

export default class ConfigurableComponent extends React.Component {
    constructor(props, state = {}) {
        super(props);
        this.componentRef = React.createRef(); // the specific ref for html component
        this.state = {
            children: [],
            tabs: [],
            ...state,
            ...props.component.toJSON()
        }
    }

    componentDidMount() {
        ComponentDAO.select()
            .then((result) => {
                return result.filter(c => c.parentId == this.props.component._id).sort((a, b) => a.index > b.index ? 1 : -1)
            })
            .then((result) => {
                this.setState({
                    children: result
                })
            })
    }

    // when a child component has been removed
    whenDelete(child) {
        let children = this.state.children.filter(comp => comp != child);
        // delete the component if it doesn't exist
        //if (children.length == 0){
        //    ComponentDAO.delete(this.props.component._id)
        //}
        this.setState({
            children: children
        })
    }

    // when a child component has been added
    whenInsert(child) {
        this.setState({
            children: this.state.children.concat(child).sort((a, b) => a.index > b.index ? 1 : -1)
        });
    }

    // this component has been updated, should cause rerender
    whenUpdate(child) {
        let children = this.state.children;
        children[children.findIndex((c) => c._id == child._id)] = child;
        this.setState({
            children: children
        })
    }

    onUpdateChildIndex(child, index) {
        let children = this.state.children;
        //ensure the child exists if it doesn't already exist
        if (!children.find(c => c._id == child._id)) {
            children.push(child)
        }
        // if the index got bigger (dragged from left to right)
        if (index >= child.index) {
            // get all the children where the index is <= the new index (excluding the child)
            children.filter(c => c.index <= index && c._id != child._id)
                // subtract 1 from their index
                .forEach(c => {
                    c.index -= 1;
                    ComponentDAO.update(c)
                })
        }
        // if the index got smaller (dragger from right to left)
        else if (index < child.index) {
            // get all the children where the index is >= the new index (excluding the child)
            children.filter(c => c.index >= index && c._id != child._id)
                // add 1 to their index
                .forEach(c => {
                    c.index += 1;
                    ComponentDAO.update(c)
                })
        }
        child.index = index;
        ComponentDAO.update(child)
        this.setState({
            children: children.sort((a, b) => a.index > b.index ? 1 : -1)
        })
    }

    save(values = {}) {
        this.setState(values)
        ComponentDAO
            .update(new ComponentDTO({
                ...this.props.component.toJSON(),
                ...values
            }))
            .then(result => {
                console.log(result)
            })
    }
    onNew() { }
    onDelete() {
        // ensure all children are clear from the dom
        this.setState({
            children: []
        })

        // update parent state to rerender
        this.props.parentContext().whenDelete(this.props.component)

        // ensure all children components are deletd
        deepDelete(this.props.component)
    }

    static selected;
    static dragged; // reference to current configurable component which is being dragged
}