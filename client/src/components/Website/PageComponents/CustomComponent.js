import React from "react"

import ComponentDAO from "../../../DAOs/ComponentDAO"

export default class CustomComponent extends React.Component {
    constructor(props, state={}) {
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