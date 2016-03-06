import React from 'react';
import ReactDOM from 'react-dom';
import {autobind} from 'core-decorators';
import {routeComponent, formUtilComponent} from 'app-decorators';
import YomFormUtil from 'yom-form-util';
import SubFormComponent from './sub-form';
import DatetimePicker from 'widget/datetime-picker/main';
import AutoComplete from 'widget/auto-complete/main';
import './style.css';

@routeComponent
@formUtilComponent
class ModuleComponent extends React.Component {
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
            <DatetimePicker ref="formUtilComponentBirthday" name="birthday" mandatory />
          </div>
          <div className="form-group">
            <label>兴趣爱好</label>
            <AutoComplete ref="formUtilComponentHabit" name="habit" mandatory dataSource={[
              {id: '1', name: '篮球'},
              {id: '2', name: '足球'},
              {id: '3', name: '乒乓球'}
            ]} defaultValue={{id: '1', name: '篮球'}} getSelectedItem={item => item.id} maxSelection="2" />
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
