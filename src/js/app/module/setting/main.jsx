import React from 'react';
import {routeComponent} from 'app-decorators';
import DataGrid from 'widget/data-grid/main';
import './style.css';

@routeComponent
class ModuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgState: {
        sortColumnId: 'a',
        sortOrder: 'desc',
        filterMap: decodeURIComponent('c%2C0%2Cxx%3Bf%2C0%2Czz%3Ba%2C0%2Ca%2Cb')
      },
      dgSetting: {
        lockColumnAmount: 2,
        columnSequence: ['b', 'c', 'f'],
        hiddenColumns: ['b']
      }
    };
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
      let state = this.state.dgState;
      let setting = this.state.dgSetting;
      return (
        <div>
          <DataGrid columns={columns} data={data} state={state} setting={setting} onStateChange={state => this.setState({dgState: state})} onSettingChange={setting => this.setState({dgSetting: setting})} sequence={{name: '#'}} checkbox bordered striped hightLightRow  />
        </div>
      );
    }
  }
}

export default ModuleComponent;
