import React from "react"

import ComponentDAO from "../../../DAOs/ComponentDAO"
import ComponentDTO from "../../../DTOs/ComponentDTO"

import CustomFocusser from "./CustomFocusser"
import LayoutsMenu from "./LayoutsMenu";
import OptionsMenu from "./OptionsMenu";

export default class CustomComponent extends React.Component {
    constructor(props, state={},options = {}) {
        super(props);
        this.state = {
            ...state,
            children: [],
        }
    }

    componentDidMount() {
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

    static selected;
}