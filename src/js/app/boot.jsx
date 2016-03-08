import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory as history} from 'react-router';
import * as rootRoute from './route';

ReactDOM.render(
  <Router history={history} routes={rootRoute} />,
  $('.app-wrapper')[0]
);

export default {};
