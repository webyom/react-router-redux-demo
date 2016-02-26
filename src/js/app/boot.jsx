import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import * as rootRoute from './route';

ReactDOM.render(
  <Router history={hashHistory} routes={rootRoute} />,
  $('.app-wrapper')[0]
);

export default {};
