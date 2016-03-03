import React from 'react';
import classNames from 'classnames';

let routeComponent = Wrapped => class RouteComponent extends Wrapped {
  get classNames() {
    let res = {};
    let s = this.props.routes.indexOf(this.props.route);
    res[this.props.routes.reduce((prev, route, i) => {
      let next = prev;
      if (i > s) {
        return next;
      }
      let p = route.path.replace(/^\/+/, '').replace(/\/+:/g, '-_').replace(/\/+/g, '-');
      if (p) {
        next += (next == 'app-module' ? '__' : '--') + p;
      }
      return next;
    }, 'app-module')] = true;
    this.props.routes.reduce((prev, route, i) => {
      let next = prev;
      if (next) {
        next += (next == 'route' ? '__' : '--') + route.path.replace(/\/+:/g, '-_').replace(/\/+/g, '-');
        if (i > s) {
          res[next] = true;
        }
      } else {
        next = 'route';
      }
      return next;
    }, '');
    if (this.props.className) {
      this.props.className.split(/\s+/).forEach(c => c && (res[c] = true));
    }
    return {...super.classNames, ...res};
  }

  render() {
    let ele = super.render();
    let cns = this.classNames;
    if (ele.props && ele.props.className) {
      ele.props.className.split(/\s+/).forEach(c => c && (cns[c] = true));
    }
    return React.cloneElement(ele, {className: classNames(cns)});
  }
};

export default routeComponent;
