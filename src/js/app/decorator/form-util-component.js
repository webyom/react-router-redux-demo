import React from 'react';
import classNames from 'classnames';

let formUtilComponent = Wrapped => class FormUtilComponent extends Wrapped {
  get classNames() {
    let res = {'yom-form-util-component': true};
    if (this.props.className) {
      this.props.className.split(/\s+/).forEach(c => c && (res[c] = true));
    }
    return {...super.classNames, ...res};
  }

  validateForm() {

  }

  render() {
    let ele = super.render();
    let cns = this.classNames;
    if (ele.props.className) {
      ele.props.className.split(/\s+/).forEach(c => c && (cns[c] = true));
    }
    return React.cloneElement(ele, {className: classNames(cns)});
  }
};

export default formUtilComponent;
