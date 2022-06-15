import React, { useState, useEffect } from 'react';
import { Navigate,parsePath,useParams } from 'react-router-dom';
import { loremIpsum } from 'react-lorem-ipsum';

import ComponentDTO from "../DTOs/ComponentDTO"
import ComponentDAO from "../DAOs/ComponentDAO"

import Page from '../layouts/Page';

import EditableComponent from "../components/Website/PageComponents/EditableComponent"
import NewLine from "../components/Website/PageComponents/NewLine"

export default () => {
    var {_id} = useParams();
    
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

    const onNewComponent = () => {
        ComponentDAO
            .insert(new ComponentDTO({
                pageId:_id,
                type: "TitleBody1",
                title: "<h1>Example Title</h1>",
                body: `<p>Example Body</p>`
            }))
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <Page>
            {components.map(comp => (
                <>
                    <NewLine onNew={() => onNewComponent()}></NewLine>
                    <EditableComponent component={comp}/>
                </>
            ))}
            <NewLine onNew={() => onNewComponent()}></NewLine>
        </Page>
    );
}