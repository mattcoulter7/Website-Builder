
import React from "react"
import { TelephoneMinus } from "react-bootstrap-icons";

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import IFocusable from "./IFocusable"
import LayoutsMenu from "./LayoutsMenu";
import OptionsMenu from "./OptionsMenu";

import FunctionDoesSomething from '../../../Utils/FunctionDoesSomething'
import ComponentMapping from "./ComponentMapping";

export default class EditableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            filter: false,
            tabs: {},
            showMajorMenu: false
        }

        props.tabs && props.tabs((...args) => this.addTabContent(...args));

        this.addTabContent("Content", () =>
            Object.entries(ComponentMapping).map(entry => <button className="btn btn-primary m-1" onClick={(e) => {
                ComponentMapping[entry[0]].update(this.props.component)
                    .then((result) => {
                        this.props.context().props.parentContext().whenUpdate(result)
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
    //#region IFocusable
    mousemoveonFocusDirect(e) {
        if (this.props.mousemoveonFocusDirect) {
            return this.props.mousemoveonFocusDirect(e, this);
        }
        this.onFilter(true)
    }
    mousemoveonBlurDirect(e) {
        if (this.props.mousemoveonBlurDirect) {
            return this.props.mousemoveonBlurDirect(e, this);
        }
        this.onFilter(false)
    }
    mousemoveonBlur(e) {
        if (this.props.mousemoveonBlur) {
            return this.props.mousemoveonBlur(e, this);
        }
        this.onFilter(false)
    }
    mousemoveonFocus(e) {
        if (this.props.mousemoveonFocus) {
            return this.props.mousemoveonFocus(e, this);
        }
    }
    mousedownonFocusDirect(e) {
        if (this.props.mousedownonFocusDirect) {
            return this.props.mousedownonFocusDirect(e, this);
        }
        EditableComponent.selected = this;
        this.onSelect(true)
    }
    mousedownonFocus(e) {
        if (this.props.mousedownonFocus) {
            return this.props.mousedownonFocus(e, this);
        }
    }
    mousedownonBlurDirect(e) {
        if (this.props.mousedownonBlurDirect) {
            return this.props.mousedownonBlurDirect(e, this);
        }
        this.onSelect(false)
    }
    mousedownonBlur(e) {
        if (this.props.mousedownonBlur) {
            return this.props.mousedownonBlur(e, this);
        }
        this.onSelect(false)
    }
    //#endregion
    //#region OptionsMenu
    onNew() {
        if (this.props.onNew) {
            return this.props.onNew();
        }
    }
    onDelete() {
        if (this.props.onDelete) {
            return this.props.onDelete();
        }
    }
    //#endregion

    render() {
        var className = "";
        if (this.state.focus) {
            className += " selected"
        } else {
            className += " deselected"
            if (this.state.filter) {
                className += " hover"
            }
        }

        return (
            <IFocusable
                mousemoveonFocusDirect={(e) => this.mousemoveonFocusDirect(e)}
                mousemoveonBlurDirect={(e) => this.mousemoveonBlurDirect(e)}
                mousemoveonBlur={(e) => this.mousemoveonBlur(e)}
                mousemoveonFocus={(e) => this.mousemoveonFocus(e)}
                mousedownonFocusDirect={(e) => this.mousedownonFocusDirect(e)}
                mousedownonBlurDirect={(e) => this.mousedownonBlurDirect(e)}
                mousedownonFocus={(e) => this.mousedownonFocus(e)}
                mousedownonBlur={(e) => this.mousedownonBlur(e)}
            >
                <div
                    draggable={true}
                    className={className}
                    onDragStart={(e) => {
                        e.stopPropagation();
                        EditableComponent.dragged = this.props.context()
                    }}
                    onDragEnd={() => {
                        EditableComponent.dragged = null
                    }}>
                    {true ? null : this.props.component.type + " (" + this.props.component._id + ")"}
                    {
                        (() => {
                            return this.state.focus ?
                                <OptionsMenu
                                    onDelete={() => this.onDelete()}
                                    onEdit={() =>
                                        this.setState({
                                            showMajorMenu: true
                                        })
                                    }
                                    onAdd={() => this.onNew()}
                                    onUp={() => { }}
                                    onDown={() => { }} /> : null
                        })()
                    }
                    {this.props.children}
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
            </IFocusable>
        );
    }
}