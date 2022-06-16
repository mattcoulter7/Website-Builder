import React from "react";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import FileDAO from "../../../../DAOs/FileDAO";
import EditComponent from "../EditComponent";

export default class TitlePhoto2_Edit extends EditComponent {
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
        return super.render(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={this.props.component.imageUrl} className="img-fluid" alt="Responsive image" />
                        <input className="form-control" id="formFileLg" type="file" onChange={(e) => {
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