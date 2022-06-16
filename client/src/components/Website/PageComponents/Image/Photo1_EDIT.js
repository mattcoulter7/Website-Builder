import React from "react";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import FileDAO from "../../../../DAOs/FileDAO";
import EditComponent from "../EditComponent";

export default class Photo1_Edit extends EditComponent {
    render() {
        return super.render(
            <>
                <img src={this.props.component.src} className="img-fluid" alt="Responsive image" />
                {
                    (() => {
                        return this.state.focus ? <input className="form-control" id="formFileLg" type="file" onChange={(e) => {
                            var file = e.target.files[0];
                            if (!file) return;
                            FileDAO.insert(file)
                                .then((result) => {
                                    this.save({ src: result })
                                })
                        }} /> : null
                    })()
                }
            </>
        );
    }
}