import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Promise from 'bluebird';

let formUtilComponent = Wrapped => class FormUtilComponent extends Wrapped {
  get classNames() {
    let res = {'yom-form-util-component': true};
    if (this.props.className) {
      this.props.className.split(/\s+/).forEach(c => c && (res[c] = true));
    }
    return {...super.classNames, ...res};
  }

  validateForm() {
    return new Promise((resolve, reject) => {
      require(['yom-form-util'], (YomFormUtil) => {
        let form = ReactDOM.findDOMNode(this.refs.form || this);
        let valid = YomFormUtil.validate(form);
        if (this.getFormData) {
          valid.data = this.getFormData();
        }
        let subForms = [];
        for (let key in this.refs) {
          if (key.indexOf('formUtilComponent') === 0) {
            subForms.push(key);
          }
        }
        Promise.all(subForms.map((key) => this.refs[key].validateForm())).then((vs) => {
          for (let v of vs) {
            valid.passed = valid.passed && v.passed;
            valid.failList = valid.failList.concat(v.failList);
            valid.helpList = valid.helpList.concat(v.helpList);
            valid.data = {...valid.data, ...v.data};
          }
          resolve(valid);
        }, (err) => reject(err));
      }, (errCode, err, opt) => reject(err));
    });
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

export default formUtilComponent;
