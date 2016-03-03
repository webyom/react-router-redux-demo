import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {routeComponent, formUtilComponent} from 'app-decorators';
import './style.css';

@routeComponent
@formUtilComponent
class ModuleComponent extends React.Component {
  render() {
    return (
      <div>Home</div>
    );
  }
}

export default ModuleComponent;
