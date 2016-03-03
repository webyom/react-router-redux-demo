import React from 'react';
import {formUtilComponent} from 'app-decorators';

@formUtilComponent
class ModuleComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label>微信号码</label>
          <input name="wechat" type="text" className="form-control" data-validator="mandatory" />
          <span className="help-block help-error"></span>
        </div>
      </div>
    );
  }
}

export default ModuleComponent;
