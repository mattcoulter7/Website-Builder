import React, { useState, useEffect } from 'react';
import { Navigate,parsePath,useParams } from 'react-router-dom';

import Main from '../layouts/Main';

import CreatePageForm from '../components/Website/CreatePageForm'

export default () => {
    var {websiteId} = useParams();
    return (
        <Main>
            <h1>Create Page</h1>
            <CreatePageForm websiteId={websiteId}/>
        </Main>
    );
}