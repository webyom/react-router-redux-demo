import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {routeComponent} from 'app-decorators';
import './style.css';

@routeComponent
class ModuleComponent extends React.Component {
  render() {
    let children = this.props.children;
    if (children) {
      return (
        <div>
          {children}
        </div>
      );
    } else {
      return (
        <div>
          设置向导
        </div>
      );
    }
  }
}

export default ModuleComponent;
