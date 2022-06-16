import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import WebsiteDAO from "../../DAOs/WebsiteDAO"
import WebsiteDTO from "../../DTOs/WebsiteDTO"

export default class blah extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            companyName: ""
        }
    }
    onFormSubmit(){
        WebsiteDAO
            .insert(new WebsiteDTO({
                companyName:this.state.companyName
            }))
            .then((result) => {
                window.location.href = `/website/edit/${result._id}`
            })
    }
    render() {
        return (
            <>
                <div className="col-md-4 mb-3">
                    <label htmlFor="companyName">Company Name</label>
                    <input id="companyName" type="text" required value={this.state.companyName} className="form-control" onChange={(e) => {
                        this.setState({
                            companyName:e.target.value
                        })
                    }} />
                </div>
                <button className="btn btn-primary" onClick={() => this.onFormSubmit()}>Create Website!</button>
            </>
        );
    }
}