import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';
import YomAutoComplete from 'yom-auto-complete';

class AutoComplete extends React.Component {
  componentDidMount() {
    let props = this.props;
    let box = ReactDOM.findDOMNode(this.refs.box);
    // TODO
    this.setState({value: props.defaultValue});
  }

  componentWillUnmount() {
    // TODO
  }

  validateForm() {
    return new Promise((resolve, reject) => {
      require(['yom-form-util'], (YomFormUtil) => {
        let box = ReactDOM.findDOMNode(this.refs.box);
        let valid = {};
        valid.passed = false;
        if (valid.passed) {
          YomFormUtil.dehighLight(box);
        } else {
          YomFormUtil.highLight(box, YomFormUtil.getMsg('mandatory'));
        }
        resolve(valid);
      }, (errCode, err, opt) => reject(err));
    });
  }

  render() {
    let props = this.props;
    return (
      <div className="validate-group">
        <input ref="box" className="form-control" type="text" name={props.name} disabled={props.disabled} />
        <span className="help-block help-error"></span>
      </div>
    );
  }
}

export default AutoComplete;
