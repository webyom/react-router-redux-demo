import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';
import YomAutoComplete from 'yom-auto-complete';

class AutoComplete extends React.Component {
  componentDidMount() {
    let props = this.props;
    let box = ReactDOM.findDOMNode(this.refs.box);
    this.autoComplete = new YomAutoComplete(box, {
      maxSelection: props.maxSelection,
      freeInput: props.freeInput,
      dataSource: props.dataSource,
      getMatchedList: props.getMatchedList,
      getStdItem: props.getStdItem,
      initData: Array.isArray(props.defaultValue) ? props.defaultValue : props.defaultValue ? [props.defaultValue] : [],
      richSelectionResult: true,
      noResultMsg: '找不到结果'
    });
  }

  componentWillUnmount() {
    this.autoComplete.destroy();
  }

  getSelectedItem(item, getter) {
    if (getter) {
      return getter(item);
    } else if (item.id) {
      return item.id;
    } else {
      return item;
    }
  }

  validateForm() {
    return new Promise((resolve, reject) => {
      require(['yom-form-util'], (YomFormUtil) => {
        let props = this.props;
        let box = ReactDOM.findDOMNode(this.refs.box);
        let data = {};
        let valid;
        let selectedDataList = this.autoComplete.getSelectedDataList();
        if (props.mandatory && !selectedDataList.length) {
          let failItem = {
            failType: 'mandatory',
            failMsg: YomFormUtil.getMsg('mandatory'),
            item: box
          };
          valid = {
            passed: false,
            failList: [failItem],
            helpList: [failItem],
            data: data
          };
        } else {
          if (props.maxSelection == '1') {
            data[props.name] = this.getSelectedItem(selectedDataList[0], props.getSelectedItem);
          } else {
            data[props.name] = selectedDataList.map(item => this.getSelectedItem(item, props.getSelectedItem));
          }
          valid = {
            passed: true,
            failList: [],
            helpList: [],
            data: data
          };
        }
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
