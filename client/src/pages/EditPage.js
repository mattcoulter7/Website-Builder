import React, { useState, useEffect } from 'react';
import { Navigate, parsePath, useParams } from 'react-router-dom';
import { loremIpsum } from 'react-lorem-ipsum';

import ComponentDTO from "../DTOs/ComponentDTO"
import ComponentDAO from "../DAOs/ComponentDAO"

import Page from '../layouts/Page';

import EditableComponent from "../components/Website/PageComponents/EditableComponent"
import NewLine from "../components/Website/PageComponents/NewLine"
import CustomFocusser from "../components/Website/PageComponents/CustomFocusser"

import TitleBody1 from "../components/Website/PageComponents/TitleBody1"



const onDeselect = () => {
    EditableComponent.active && EditableComponent.active.setState({
        focus: false
    })
}

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") onDeselect();
})

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

    const onNewComponent = () => {
        ComponentDAO
            .insert(new ComponentDTO({
                ...TitleBody1._DefaultComponentValues(),
                pageId: _id
            }))
    }

    return (
        <Page>
            <CustomFocusser
                onBlur={onDeselect}>
                {components.map(comp => (
                    <>
                        <NewLine onNew={() => onNewComponent()}></NewLine>
                        <EditableComponent component={comp} />
                    </>
                ))}
                <NewLine onNew={() => onNewComponent()}></NewLine>
            </CustomFocusser>
        </Page>
    );
}