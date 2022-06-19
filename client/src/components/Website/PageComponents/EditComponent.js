
import React from "react"
import { TelephoneMinus } from "react-bootstrap-icons";

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import IFocusable from "./IFocusable"
import LayoutsMenu from "./LayoutsMenu";
import OptionsMenu from "./OptionsMenu";

import FunctionDoesSomething from '../../../Utils/FunctionDoesSomething'

export default class EditComponent extends IFocusable {
    constructor(props, state = {}) {
        super(props);
        this.state = {
            focus: false,
            filter: false,
            children: [],
            showMajorMenu: false,
            tabs: [],
            ...state,
            ...this.props.component.toJSON()
        }

        this.handler = this.handler.bind(this)
        this.initializeTabs();
    }

    initializeTabs() {
        this.addTabContent("Layout", <div>test</div>)
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
                return result.filter(c => c.parentId == this.props.component._id)
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
        this.setState({
            children: this.state.children.filter(c => c != child)
        })
    }

    // when a child component has been added
    whenInsert(child) {
        this.setState({
            children: this.state.children.concat(child)
        })
    }

    // this component has been updated, should cause rerender
    whenUpdate(child) {
        let children = this.state.children;
        children[children.findIndex((c) => c._id == child._id)] = child;
        this.setState({
            children: children
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
        this.props.parentContext().whenDelete(this.props.component)
        ComponentDAO
            .delete(this.props.component._id)
            .then(result => {
                console.log(result)
            })
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
        EditComponent.selected = this;
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
            <div className={className}>
                {this.props.component.type}
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
                {
                    (() => {
                        return this.state.showMajorMenu ?
                            <LayoutsMenu tabs={this.preparedTabs} component={this.props.component} onClose={() => {
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
}