import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './App';
import FilesListApp from './FilesList';
import TestApp from './Test';
import './index.css';

import { Router, Route, hashHistory } from 'react-router'

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/files/" component={FilesListApp}/>
    <Route path="/test/" component={TestApp}/>
  </Router>
), document.getElementById('root'))