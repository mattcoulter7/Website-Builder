import React from "react";

import ComponentDAO from "../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../DTOs/ComponentDTO";
import TipTap from "./TipTap";

import FileDAO from "../../../DAOs/FileDAO";

export default class TitlePhoto1_Edit extends React.Component {
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
                <div className="row">
                    <div className="col">
                        <TipTap value={this.props.component.title} onChange={(e) => this.save({ title: e.editor.getHTML() })} />
                    </div>
                    <div className="col">
                        <img src={this.props.component.imageUrl} class="img-fluid" alt="Responsive image" />
                        <input type="file" onChange={(e) => {
                            var file = e.target.files[0];
                            if (!file) return;
                            FileDAO.insert(file)
                                .then((result) => {
                                    this.save({ imageUrl: result })
                                })
                        }} />
                    </div>
                </div>
            </div>
        );
    }
}