import React from 'react';
import ReactDOM from 'react-dom';
import {autobind} from 'core-decorators';
import {routeComponent, formUtilComponent} from 'app-decorators';
import YomFormUtil from 'yom-form-util';
import SubFormComponent from './sub-form';
import 'datetimepicker';
import './style.css';

@routeComponent
@formUtilComponent
class ModuleComponent extends React.Component {
  componentDidMount() {
    $('#datetimepicker').datetimepicker({
      bootcssVer: 3,
      fontAwesome: true,
      pickerPosition: 'bottom-left',
      autoclose: true,
      container: $('#datetimepicker')
    });
  }

  @autobind
  async submit(evt) {
    evt.preventDefault();
    try {
      let valid = await this.validateForm();
      if (!valid.passed) {
        YomFormUtil.focus(ReactDOM.findDOMNode(this), true);
      }
      console.log(valid);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
      <h4>设置详情</h4>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label>电子邮箱</label>
            <input name="email" type="text" className="form-control" data-validator="mandatory email" />
            <span className="help-block help-error"></span>
          </div>
          <div className="form-group">
            <label>手机号码</label>
            <input name="mobile" type="text" className="form-control" data-validator="mandatory" />
            <span className="help-block help-error"></span>
          </div>
          <div className="form-group">
            <label>出生日期</label>
            <div id="datetimepicker" className="datetimepicker-component input-group date" data-date="12-02-2012" data-date-format="dd-mm-yyyy">
              <input className="form-control" size="16" type="text" defaultValue="12-02-2012" />
              <div className="input-group-addon"><i className="fa fa-calendar" /></div>
            </div>
            <span className="help-block help-error"></span>
          </div>
          <SubFormComponent ref="formUtilComponentSubForm" />
          <div className="checkbox validate-group">
            <label>
              <input type="checkbox" data-validator="mandatory" /> 同意协议
              <span className="help-block help-error"></span>
            </label>
          </div>
          <button type="submit" className="btn btn-primary">提交</button>
        </form>
      </div>
    );
  }
}

export default ModuleComponent;
