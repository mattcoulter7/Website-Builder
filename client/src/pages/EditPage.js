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

import NewLine from "../components/Website/PageComponents/NewLine"
import CustomFocusser from "../components/Website/PageComponents/CustomFocusser"
import ComponentMapping from "../components/Website/PageComponents/ComponentMapping"

import Section from "../components/Website/PageComponents/Layouts/Section"

const onDeselect = () => {
    Section.active && Section.active.setState({
        focus: false
    })
}

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") onDeselect();
})

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
                // store the children components
                components.forEach((c1, i, self) => c1.children = self.filter(c2 => c2.parentId == c1._id))

                // extract components specific to the page
                return components.filter(c => c.parentId == _id)
            })
            .then((components) => {
                // store against state
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
            <CustomFocusser
                onBlur={onDeselect}>
                {
                    components
                        .filter(c => c.type == "Section")
                        .map(comp => {
                            const CustomComponent = ComponentMapping[comp.type]
                            return (<>
                                <NewLine onNew={() => ComponentMapping.Section.create(page._id)}></NewLine>
                                <CustomComponent.edit website={website} page={page} pages={pages} component={comp} parentState={{}} />
                            </>)
                        })
                }
                <NewLine onNew={() => ComponentMapping.Section.create(page._id)}></NewLine>
            </CustomFocusser>
        </Page>
    );
}