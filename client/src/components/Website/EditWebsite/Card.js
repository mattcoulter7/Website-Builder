import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';


export default class blah extends React.Component {
    render() {
        return (
            <div className="card shadow p-3 mb-5 bg-white rounded" style={{
                    width: "18rem"
                }}>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                    {this.props.children}
                </div>
            </div>
        )
    }
}