import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {autobind} from 'core-decorators';
import {routeComponent, formUtilComponent} from 'app-decorators';
import './style.css';

@routeComponent
@formUtilComponent
class ModuleComponent extends React.Component {
  @autobind
  async submit() {
    try {
      let x = await this.validateForm();
      console.log(x);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div onClick={this.submit}>Detail</div>
    );
  }
}

export default ModuleComponent;
