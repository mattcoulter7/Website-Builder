import React from "react";

import EditComponent from "../EditComponent";

import ComponentMapping from "../ComponentMapping";

export default class Section_EDIT extends EditComponent {
    onNew() {
        ComponentMapping.Container.create(this.props.component._id)
            .then((result) => {
                this.whenInsert(result)
            })
    }
    mousemoveonFocus(){
        this.onSelect(true);
    }
    mousemoveonFocusDirect(){
        this.onSelect(true);
    }
    mousedownonBlurDirect(){

    }
    mousedownonFocus(){
        this.onSelect(true);
    }
    mousemoveonBlur(){
        super.mousemoveonBlur();
        this.onSelect(false);
    }
    render() {
        if (!this.props.page) return null;
        return super.render(
            this.state.children
                .map(comp => {
                    const CustomComponent = ComponentMapping[comp.type]
                    return <CustomComponent.edit website={this.props.website} page={this.props.page} pages={this.props.pages} component={comp} parentContext={this.handler}/>
                })
        )
    }
}