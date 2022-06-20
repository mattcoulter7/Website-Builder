import React from "react";

import ComponentDAO from "../../../../DAOs/ComponentDAO";
import ComponentDTO from "../../../../DTOs/ComponentDTO";

import FileDAO from "../../../../DAOs/FileDAO";
import ConfigurableComponent from "../ConfigurableComponent";

export default class Photo1_Edit extends ConfigurableComponent {
    initializeTabs() {
        super.initializeTabs();
        this.addTabContent("Content", () => <input className="form-control" id="formFileLg" type="file" onChange={(e) => {
            var file = e.target.files[0];
            if (!file) return;
            FileDAO.insert(file)
                .then((result) => {
                    this.save({ src: result })
                })
        }} />)
    }
    render() {
        return super.render(
            <img src={this.state.src} className="img-fluid" alt="Responsive image" />
        );
    }
}