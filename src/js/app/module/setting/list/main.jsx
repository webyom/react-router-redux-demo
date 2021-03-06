import React from 'react';
import {hashHistory as history} from 'react-router';
import {autobind} from 'core-decorators';
import {routeComponent} from 'app-decorators';
import {StdDataGrid} from 'widget/data-grid/main';
import columns from './data-grid-columns';
import './style.css';

let data = [{
  a: '选项A',
  b: '100',
  c: '字符串'
}, {
  a: '选项B',
  b: '100',
  c: '字符串'
}, {
  a: '选项C',
  b: '100',
  c: '字符串'
}, {
  a: '选项A',
  b: '100',
  c: '字符串'
}, {
  a: '选项B',
  b: '100',
  c: '字符串'
}, {
  a: '选项C',
  b: '100',
  c: '字符串'
}, {
  a: '选项A',
  b: '100',
  c: '字符串'
}, {
  a: '选项B',
  b: '100',
  c: '字符串'
}, {
  a: '选项C',
  b: '100',
  c: '字符串'
}, {
  a: '选项A',
  b: '100',
  c: '字符串'
}, {
  a: '选项B',
  b: '100',
  c: '字符串'
}, {
  a: '选项C',
  b: '100',
  c: '字符串'
}, {
  a: '选项A',
  b: '100',
  c: '字符串'
}, {
  a: '选项B',
  b: '100',
  c: '字符串'
}, {
  a: '选项C',
  b: '100',
  c: '字符串'
}, {
  a: '选项A',
  b: '100',
  c: '字符串'
}, {
  a: '选项B',
  b: '100',
  c: '字符串'
}, {
  a: '选项C',
  b: '100',
  c: '字符串'
}, {
  a: '选项A',
  b: '100',
  c: '字符串'
}, {
  a: '选项B',
  b: '100',
  c: '字符串'
}];

@routeComponent
class ModuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let dataGridInstance = this.refs.dataGrid.dataGridInstance;
    let params = this.props.params;
    this.setState({
      dgState: {
        sortColumnId: params.sortColumnId,
        sortOrder: params.sortOrder,
        filterMap: dataGridInstance.parseFilterMap(params.filterMap)
      }
    });
  }

  @autobind
  onChange(params) {
    history.push(`/setting/list/${params.page}/${params.sortColumnId}/${params.sortOrder}/${encodeURIComponent(params.filterMap)}`);
  }

  render() {
    return (
      <div>
        <StdDataGrid ref="dataGrid" name="setting" title={`设置列表（${200}）`} columns={columns} data={data} state={this.state.dgState} page={parseInt(this.props.params.page) || 1} pageSize={20} total={200} onChange={this.onChange} />
      </div>
    );
  }
}

export default ModuleComponent;
