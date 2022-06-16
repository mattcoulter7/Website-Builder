import React, { useState, useEffect, useRef } from 'react';
import { Navigate, parsePath, useParams } from 'react-router-dom';
import { loremIpsum } from 'react-lorem-ipsum';

import ComponentDTO from "../DTOs/ComponentDTO"
import ComponentDAO from "../DAOs/ComponentDAO"
import PageDTO from "../DTOs/PageDTO"
import PageDAO from "../DAOs/PageDAO"
import WebsiteDTO from "../DTOs/WebsiteDTO"
import WebsiteDAO from "../DAOs/WebsiteDAO"

import Page from '../layouts/Page';

import CustomFocusser from "../components/Website/PageComponents/CustomFocusser"
import ComponentMapping from "../components/Website/PageComponents/ComponentMapping"

import Section from "../components/Website/PageComponents/Layouts/Section"

import { params } from "../Utils/QueryString"

import Panel from '../components/Website/EditWebsite/Panel';


export default class ViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            page: null,
            website: null,
            pages: []
        }
        this._id = null;
        document.addEventListener("keydown", (e) => {
            if (e.key == "Escape") {
                this.onDeselect();
            }
        })
    }
    componentDidMount() {
        this._id = params()._id;

        ComponentDAO
            .select()
            .then((components) => {
                // extract components specific to the page
                return components.filter(c => c.parentId == this._id)
            })
            .then((components) => {
                // store against state
                this.setState({
                    children: components
                })
            })

        PageDAO
            .selectId(this._id)
            .then((page) => {
                this.setState({
                    page: page
                })

                WebsiteDAO
                    .selectId(page.websiteId)
                    .then((website) => {
                        this.setState({
                            website: website
                        })

                        PageDAO
                            .select()
                            .then((pages) => {
                                return pages.filter(p => p.websiteId == website._id)
                            })
                            .then((pages) => {
                                this.setState({
                                    pages: pages
                                })
                            })
                    });
            })
    }

    render() {
        return (
            <Page>
                {
                    this.state.children
                        .filter(c => c.type == "Section")
                        .map(comp => {
                            const CustomComponent = ComponentMapping[comp.type]
                            return (<>
                                <CustomComponent.preview website={this.state.website} page={this.state.page} pages={this.state.pages} component={comp} />
                            </>)
                        })
                }
            </Page>
        );
    }
}