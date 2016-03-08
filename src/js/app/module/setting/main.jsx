import React from 'react';
import {routeComponent} from 'app-decorators';
import './style.css';

@routeComponent
class ModuleComponent extends React.Component {
  render() {
    let children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default ModuleComponent;
