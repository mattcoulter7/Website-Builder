import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import ConfigurableComponent from "../ConfigurableComponent";

export default class Navbar1 extends ConfigurableComponent {
    render() {
        if (!this.props.website) return null;
        return super.render(
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">{this.props.website.companyName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.pages.map(page => 
                                <Nav.Link active={page._id == this.props.page._id} key={page._id} href={`/page/edit?_id=${page._id}`}>{page.name}</Nav.Link>
                            )}
                            <Nav.Link href={`/page/create/${this.props.website._id}`}>New Page</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}