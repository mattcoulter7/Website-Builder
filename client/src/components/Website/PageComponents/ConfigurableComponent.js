
import React from "react"
import { TelephoneMinus } from "react-bootstrap-icons";

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import IFocusable from "./IFocusable"
import LayoutsMenu from "./LayoutsMenu";
import OptionsMenu from "./OptionsMenu";

import FunctionDoesSomething from '../../../Utils/FunctionDoesSomething'
import ComponentMapping from "./ComponentMapping";

export default class ConfigurableComponent extends IFocusable {
    constructor(props, state = {}) {
        super(props);
        this.state = {
            focus: false,
            filter: false,
            children: [],
            showMajorMenu: false,
            tabs: [],
            ...state,
            ...props.component.toJSON()
        }

        this.handler = this.handler.bind(this)
        this.initializeTabs();
    }

    initializeTabs() {
        this.addTabContent("Content", () =>
            Object.entries(ComponentMapping).map(entry => <button className="btn btn-primary m-1" onClick={(e) => {
                ComponentMapping[entry[0]].update(this.props.component)
                    .then((result) => {
                        this.props.parentContext().whenUpdate(result)
                    })
            }}>{entry[0]}</button>)
            , "Change Type")
    }

    addTabContent(tabName, content, sectionName = "") {
        this.state.tabs[tabName] = this.state.tabs[tabName] || {
            name: tabName,
            content: [],
            sections: {}
        };

        if (sectionName) {
            this.state.tabs[tabName].sections[sectionName] = this.state.tabs[tabName].sections[sectionName] || {
                name: sectionName,
                content: []
            }
            this.state.tabs[tabName].sections[sectionName].content.push(content)
        } else {
            this.state.tabs[tabName].content.push(content);
        }
    }

    get preparedTabs() {
        return Object.values(this.state.tabs).map(tab => ({
            ...tab,
            sections: Object.values(tab.sections)
        }))
    }

    handler() {
        return this;
    }

    componentDidMount() {
        super.componentDidMount()
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
    componentWillUnmount() {
        super.componentWillUnmount()
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

        //circular delete all children that branch from this component
        ComponentDAO.select()
            .then((result) => {
                const deleteEntirely = (comp) => {
                    ComponentDAO.delete(comp._id)
                    result.filter(c => c.parentId == comp._id)
                        .forEach(deleteEntirely)
                }
                deleteEntirely(this.props.component)
            });
    }

    onFilter(on) {
        this.setState({
            filter: on
        })
    }

    onSelect(on) {
        this.setState({
            focus: on,
            showMajorMenu: on ? this.state.showMajorMenu : false
        })
    }

    mousemoveonFocusDirect(e) {
        this.onFilter(true)
    }
    mousemoveonBlurDirect(e) {
        this.onFilter(false)
    }
    mousemoveonBlur(e) {
        this.onFilter(false)
    }

    mousedownonFocusDirect(e) {
        ConfigurableComponent.selected = this;
        this.onSelect(true)
    }
    mousedownonBlurDirect(e) {
        this.onSelect(false)
    }
    mousedownonBlur(e) {
        this.onSelect(false)
    }

    render(children, tabs) {
        var className = "";
        if (this.state.focus) {
            className += " selected"
        } else {
            className += " deselected"
            if (this.state.filter) {
                className += " hover"
            }
        }

        return super.render(
            <div>
                <div draggable={true} onDragStart={(e) => {
                    e.stopPropagation();
                    ConfigurableComponent.dragged = this
                }} onDragEnd={() => ConfigurableComponent.dragged = null} className={className}>
                    {this.props.component.type + " (" + this.props.component._id + ")"}
                    {
                        (() => {
                            return this.state.focus ?
                                <OptionsMenu
                                    onDelete={() => {
                                        this.onDelete()
                                    }}
                                    onEdit={() => {
                                        this.setState({
                                            showMajorMenu: true
                                        })
                                    }}
                                    onAdd={FunctionDoesSomething(this.onNew) ? () => {
                                        this.onNew()
                                    } : null}
                                    onUp={() => {

                                    }}
                                    onDown={() => {

                                    }} /> : null
                        })()
                    }
                    {children}
                </div>
                {
                    (() => {
                        return this.state.showMajorMenu ?
                            <LayoutsMenu tabs={this.preparedTabs} style={{
                                right: "20%",
                                top: "40%"
                            }} component={this.props.component} onClose={() => {
                                this.setState({
                                    showMajorMenu: false
                                })
                            }} /> : null
                    })()
                }
            </div>
        );
    }

    static selected;
    static dragged; // reference to current configurable component which is being dragged
}