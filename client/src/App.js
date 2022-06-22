import './App.css';

import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'

import CreateWebsite from './pages/CreateWebsite';
import ViewWebsites from './pages/ViewWebsites';
import ViewWebsite from './pages/ViewWebsite';
import EditWebsite from './pages/EditWebsite';

import CreatePage from './pages/CreatePage';
import ViewPage from './pages/ViewPage';
import EditPage from './pages/EditPage';

import TemplateMapping from './components/Website/PageComponents/TemplateMapping'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/website'>
          <Route path='/website/view' element={<ViewWebsites />} />
          <Route path='/website/view/:_id' element={<ViewWebsite />} />
          <Route path='/website/edit/:_id' element={<EditWebsite />} />
          <Route path='/website/create' element={<CreateWebsite />} />
        </Route>
        <Route path='/page'>
          <Route path='/page/view' element={<ViewPage />} />
          <Route path='/page/edit' element={<EditPage />} />
          <Route path='/page/create/:websiteId' element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
