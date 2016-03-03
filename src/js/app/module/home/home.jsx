import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {routeComponent, formUtilComponent} from 'app-decorators';
import './style.css';

@routeComponent
class ModuleComponent extends React.Component {
  render() {
    return (
      <div>欢迎使用演示系统！</div>
    );
  }
}

export default ModuleComponent;
