import React, { useState, useEffect } from 'react';
import { Navigate,parsePath,useParams } from 'react-router-dom';

import Main from '../layouts/Main';

import WebsiteDAO from '../DAOs/WebsiteDAO';
import WebsiteDTO from '../DTOs/WebsiteDTO';

import Card from "../components/Website/EditWebsite/Card"
import Grid from "../components/Website/EditWebsite/Grid"

export default (props) => {
    var {_id} = useParams();
    
    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        WebsiteDAO
            .select()
            .then((websites) => {
                return websites; //websites.filter(p => p.owner == props.owner)
            })
            .then((websites) => {
                setWebsites(websites)
            })
    });

    return (
        <Main>
            <h1>My Websites</h1>
            <Grid colCount={2} websiteId={_id}>
                {websites.map(website => 
                    <Card title={website.companyName} description="">
                        <a href={`/website/edit/${website._id}`} className="btn btn-primary">Edit Website</a>
                        <a href={`/website/view/${website._id}`} className="btn btn-secondary">View Website</a>
                    </Card>
                )}
                <Card title="New Website" description="Create a new website">
                    <a href="/website/create" className="btn btn-primary">New Website</a>
                </Card>
            </Grid>
        </Main>
    );
}