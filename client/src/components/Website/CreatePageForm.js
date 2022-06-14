import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import PageDAO from "../../DAOs/PageDAO"
import PageDTO from "../../DTOs/PageDTO"

export default class blah extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            companyName: ""
        }
    }
    onFormSubmit(){
        PageDAO
            .insert(new PageDTO({
                name:this.state.name,
                websiteId: this.props.websiteId
            }))
            .then((result) => {
                debugger;
                window.location.href = `/website/edit/${this.props.websiteId}`
            })
    }
    render() {
        return (
            <form>
                <div className="col-md-4 mb-3">
                    <label htmlFor="companyName">Page Name</label>
                    <input id="companyName" type="text" required value={this.state.name} className="form-control" onChange={(e) => {
                        this.setState({
                            name:e.target.value
                        })
                    }} />
                </div>
                <button className="btn btn-primary" onClick={() => this.onFormSubmit()}>Create Page!</button>
            </form>
        );
    }
}