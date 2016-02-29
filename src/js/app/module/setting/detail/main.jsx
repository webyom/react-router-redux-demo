import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {routeComponent} from 'app-decorators';
import './style.css';

@routeComponent
class ModuleComponent extends React.Component {
  render() {
    return (
      <div className={classNames(this.classNames)}>
        <div>Detail</div>
      </div>
    );
  }
}

export default ModuleComponent;
