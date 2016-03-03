import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {routeComponent} from 'app-decorators';
import AppHead from './app-head';
import AppSideNav from './app-side-nav';

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

let prevRoutes = [];

@routeComponent
class ModuleComponent extends React.Component {
  render() {
    let routes = this.props.routes;
    let back = routes.every((route, i) => route == prevRoutes[i]);
    prevRoutes = routes;
    return (
      <CSSTransitionGroup
        component="div"
        transitionName={back ? 'transition-back' : 'transition-forward'}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        <AppHead />
        <AppSideNav />
        {React.cloneElement(this.props.children, {
          key: this.props.location.pathname,
          className: 'app-content'
        })}
      </CSSTransitionGroup>
    );
  }
}

export default ModuleComponent;
