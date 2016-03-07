import React from 'react';
import {autobind} from 'core-decorators';
import {routeComponent} from 'app-decorators';
import classNames from 'classnames';
import DataGrid from 'widget/data-grid/main';
import './style.css';

@routeComponent
class ModuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgSelectedLength: 0,
      dgState: {
        sortColumnId: 'a',
        sortOrder: 'desc',
        filterMap: decodeURIComponent('c%2C0%2Cxx%3Bf%2C0%2Czz%3Ba%2C0%2Ca%2Cb')
      },
      dgSetting: {
        lockColumnAmount: 0,
        columnSequence: ['b', 'c', 'f'],
        hiddenColumns: ['b']
      }
    };
  }

  @autobind
  onDgRowSelect() {
    let selected = this.refs.dataGrid.dataGridInstance.getSelectedData();
    this.setState({
      dgSelectedLength: selected.length
    });
  }

  @autobind
  closeDgOp() {
    this.refs.dataGrid.dataGridInstance.setAllSelection(false);
    this.setState({
      dgSelectedLength: 0
    });
  }

  @autobind
  onDgStateChange(state) {
    this.setState({
      dgSelectedLength: 0,
      dgState: state
    });
  }

  @autobind
  onDgSettingChange(setting) {
    this.setState({
      dgSelectedLength: 0,
      dgSetting: setting
    });
  }

  render() {
    let children = this.props.children;
    if (children) {
      return (
        <div>
          {children}
        </div>
      );
    } else {
      let data = [{
        a: '1',
        b: '2',
        c: '3'
      }, {
        a: '4',
        b: '5',
        c: '6'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }, {
        a: 'yy',
        b: 'xx',
        c: 'xx'
      }];
      let columns = [
        {
          id: 'a',
          name: '店铺名称',
          sortable: true,
          filterable: true,
          filterOption: {
            type: 'set',
            options: [
              {
                name: 'A',
                value: 'a'
              },
              {
                name: 'B',
                value: 'b'
              },
              {
                name: 'C',
                value: 'c'
              }
            ]
          },
          width: 200
        },
        {
          id: 'b',
          name: '产品类型',
          sortable: true,
          filterable: true,
          filterOption: {
            type: 'number'
          },
          width: 200
        },
        {
          id: 'c',
          name: '公司名称',
          sortable: true,
          filterable: true,
          width: 200
        },
        {
          id: 'd',
          name: '所在地区',
          sortable: true,
          filterable: true,
          width: 200
        },
        {
          id: 'e',
          name: '申请时间',
          sortable: true,
          filterable: true,
          width: 200
        },
        {
          id: 'f',
          name: '审核状态',
          sortable: true,
          filterable: true,
          width: 200
        },
        {
          id: 'g',
          name: '店铺状态',
          sortable: true,
          filterable: true,
          width: 200
        }
      ];
      let dgState = this.state.dgState;
      let dgSetting = this.state.dgSetting;
      let dgSelectedLength = this.state.dgSelectedLength;
      let editBtn = dgSelectedLength === 1 ? <button className="btn btn-link"><i className="fa fa-pencil" /> 编辑</button> : '';
      return (
        <div>
          <div className="data-grid-component">
            <div className={classNames('header', {'show-op': dgSelectedLength})}>
              <div className="header__title">
                <h3>商户列表</h3>
              </div>
              <div className="header__filter"></div>
              <div className="header__create">
                <button className="btn btn-primary">新建商户</button>
              </div>
              <div className="header-op">
                <span className="selected-note">已选中 <i>{dgSelectedLength}</i> 项</span>
                {editBtn}
                <button className="btn btn-link"><i className="fa fa-trash" /> 删除</button>
                <button className="btn btn-link btn-close" onClick={this.closeDgOp}><i className="fa fa-remove" /></button>
              </div>
            </div>
            <div className="data-grid">
              <DataGrid ref="dataGrid" height="100%" columns={columns} data={data} state={dgState} setting={dgSetting} onStateChange={this.onDgStateChange} onSettingChange={this.onDgSettingChange} onSelect={this.onDgRowSelect} minScrollXColumns="7" sequence={{name: '#'}} checkbox bordered striped hightLightRow  />
            </div>
            <div className="pag">
              <nav>
                <ul className="pagination">
                  <li>
                    <a href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li>
                    <a href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ModuleComponent;
