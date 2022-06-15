import React, { useState, useEffect } from 'react';
import { Navigate, parsePath, useParams } from 'react-router-dom';

import ComponentDTO from "../DTOs/ComponentDTO"
import ComponentDAO from "../DAOs/ComponentDAO"

import Page from '../layouts/Page';

import PreviewComponent from "../components/Website/PageComponents/PreviewComponent"

export default () => {
    var { _id } = useParams();

    const [components, setComponents] = useState([]);

    useEffect(() => {
        ComponentDAO
            .select()
            .then((components) => {
                return components.filter(p => p.pageId == _id)
            })
            .then((components) => {
                setComponents(components)
            })
    });

    return (
        <Page>
            {components.map(comp => (
                <PreviewComponent component={comp} />
            ))}
        </Page>
    );
}