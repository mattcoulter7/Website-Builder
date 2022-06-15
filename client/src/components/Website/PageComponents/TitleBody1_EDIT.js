import React from "react";

import ComponentDAO from "../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../DTOs/ComponentDTO";
import TipTap from "./TipTap";



export default class blah extends React.Component {
    save(values = {}) {
        ComponentDAO
            .update(new ComponentDTO({
                ...this.props.component.toJSON(),
                ...values
            }))
            .then((result) => {
                console.log(result)
            })
    }
    render() {
        return (
            <div className="container">
                {this.props.children}
                <div className="row">
                    <div className="col">
                        <TipTap value={this.props.component.title} onChange={(e) => this.save({ title: e.editor.getHTML() })} />
                    </div>
                    <div className="col">
                        <TipTap value={this.props.component.body} onChange={(e) => this.save({ body: e.editor.getHTML() })} />
                    </div>
                </div>
            </div>
        );
    }
}