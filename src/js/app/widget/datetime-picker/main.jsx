import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {formUtilComponent} from 'app-decorators';
import 'datetimepicker-zh-cn';

@formUtilComponent
class DatetimePicker extends React.Component {
  componentDidMount() {
    let props = this.props;
    let dom = ReactDOM.findDOMNode(this.refs.datetimepicker);
    $(dom).datetimepicker({
      language: 'zh-CN',
      bootcssVer: 3,
      fontAwesome: true,
      pickerPosition: 'bottom-left',
      autoclose: true,
      todayBtn: true,
      todayHighlight: true,
      minView: props.time ? 0 : 2,
      container: dom
    }).on('changeDate', (evt) => {
      this.setState({value: evt.date.getTime()});
    });
    this.setState({value: props.defaultValue});
  }

  componentWillUnmount() {
    let dom = ReactDOM.findDOMNode(this.refs.datetimepicker);
    $(dom).datetimepicker('remove');
  }

  getFormData() {
    let res = {};
    res[this.props.name] = this.state.value;
    return res;
  }

  render() {
    let props = this.props;
    let format = props.time ? 'yyyy-mm-dd hh:ii:ss' : 'yyyy-mm-dd';
    let initialDate = props.defaultValue && new Date(props.defaultValue) || new Date();
    let initialDateStr = '2016-03-01 15:00:00'; // TODO
    return (
      <div className="validate-group">
        <div ref="datetimepicker" className={classNames('datetimepicker-component input-group date', {disabled: props.disabled})} data-date={initialDateStr} data-date-format={format}>
          <input className="form-control" type="text" name={props.name} defaultValue={props.initialDate && initialDateStr || ''} readOnly disabled={props.disabled} data-validator={props.mandatory && 'mandatory' || ''} />
          <div className="input-group-addon"><i className="fa fa-calendar" /></div>
        </div>
        <span className="help-block help-error"></span>
      </div>
    );
  }
}

export default DatetimePicker;
