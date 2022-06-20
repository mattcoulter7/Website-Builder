import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import EditComponent from "../EditComponent";

export default class Navbar1 extends EditComponent {
    render() {
        if (!this.props.website) return null;
        if (this.props.pages.length == 0) return null;
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href={`/page/view?_id=${this.props.pages[0]._id}`}>{this.props.website.companyName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.pages.map(page =>
                                <Nav.Link active={page._id == this.props.page._id} key={page._id} href={`/page/view?_id=${page._id}`}>{page.name}</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}