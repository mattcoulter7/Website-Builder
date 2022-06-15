import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import PageDAO from "../../../DAOs/PageDAO";

export default class Navbar1 extends React.Component {
    render() {
        if (!this.props.website) return null;
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">{this.props.website.companyName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.pages.map(page => 
                                <Nav.Link key={page._id} href={`/page/edit/${page._id}`}>{page.name}</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}