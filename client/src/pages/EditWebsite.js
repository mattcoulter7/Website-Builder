import React, { useState, useEffect } from 'react';
import { Navigate,parsePath,useParams } from 'react-router-dom';

import Main from '../layouts/Main';

import PageDAO from '../DAOs/PageDAO';
import PageDTO from '../DTOs/PageDTO';

import Card from "../components/Website/EditWebsite/Card"
import Grid from "../components/Website/EditWebsite/Grid"

export default (props) => {
    var {_id} = useParams();
    
    const [pages, setPages] = useState([]);

    useEffect(() => {
        PageDAO
            .select()
            .then((pages) => {
                return pages.filter(p => p.websiteId == _id)
            })
            .then((pages) => {
                setPages(pages)
            })
    });

    return (
        <Main>
            <h1>Edit Website</h1>
            <Grid colCount={2} websiteId={_id}>
                {pages.map(page => 
                    <Card title={page.name} description="">
                        <a href={`/page/edit?_id=${page._id}`} className="btn btn-primary">Edit Page</a>
                        <a href={`/page/view/${page._id}`} className="btn btn-secondary">View Page</a>
                        <button onClick={() => PageDAO.delete(page._id)} className="btn btn-danger">Delete Page</button>
                    </Card>
                )}
                <Card title="New Page" description="Create a new page">
                    <a href={`/page/create/${_id}`} className="btn btn-primary">New Page</a>
                </Card>
            </Grid>
        </Main>
    );
}