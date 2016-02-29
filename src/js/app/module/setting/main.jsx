import React from 'react';
import {Link} from 'react-router';
import './style.css';

class ModuleComponent extends React.Component {
  render() {
    let children = this.props.children;
    return (
      <div className="app-module-setting">
        <div>Setting</div>
        <Link to={'/setting'} activeClassName="active">Setting</Link>
        <Link to={'/setting/detail'} activeClassName="active">Detail</Link>
        {children}
      </div>
    );
  }
}

export default ModuleComponent;
