import React from 'react';
import {Link} from 'react-router';

class ModuleComponent extends React.Component {
  render() {
    let children = this.props.children;
    return (
      <div>
        <Link to={'/home'} activeClassName="active">Home</Link>
        <Link to={'/setting'} activeClassName="active">Setting</Link>
        {children}
      </div>
    );
  }
}

export default ModuleComponent;
