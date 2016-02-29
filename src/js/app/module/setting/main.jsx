import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {routeComponent} from 'app-decorators';
import './style.css';

@routeComponent
class ModuleComponent extends React.Component {
  render() {
    let children = this.props.children;
    return (
      <div className={classNames(this.classNames)}>
        <div>Setting</div>
        <Link to={'/setting'} activeClassName="active">Setting</Link>
        <Link to={'/setting/detail/1'} activeClassName="active">Detail</Link>
        {children}
      </div>
    );
  }
}

export default ModuleComponent;
