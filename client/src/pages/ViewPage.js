import React, { useState, useEffect } from 'react';
import { Navigate, parsePath, useParams } from 'react-router-dom';

import ComponentDTO from "../DTOs/ComponentDTO"
import ComponentDAO from "../DAOs/ComponentDAO"
import PageDTO from "../DTOs/PageDTO"
import PageDAO from "../DAOs/PageDAO"
import WebsiteDTO from "../DTOs/WebsiteDTO"
import WebsiteDAO from "../DAOs/WebsiteDAO"

import Page from '../layouts/Page';

import PreviewComponent from "../components/Website/PageComponents/PreviewComponent"

export default () => {
    var { _id } = useParams();

    const [components, setComponents] = useState([]);
    const [page, setPage] = useState(null);
    const [website, setWebsite] = useState(null);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        ComponentDAO
            .select()
            .then((components) => {
                return components.filter(p => p.pageId == _id)
            })
            .then((components) => {
                setComponents(components)
            })

        PageDAO
            .selectId(_id)
            .then((page) => {
                setPage(page);
                
                WebsiteDAO
                    .selectId(page.websiteId)
                    .then((website) => {
                        setWebsite(website);
                        
                        PageDAO
                            .select()
                            .then((pages) => {
                                return pages.filter(p => p.websiteId == website._id)
                            })
                            .then((pages) => {
                                setPages(pages);
                            })
                    });
            })
    });

    return (
        <Page>
            {components.map(comp => (
                <PreviewComponent website={website} page={page} pages={pages} component={comp} />
            ))}
        </Page>
    );
}