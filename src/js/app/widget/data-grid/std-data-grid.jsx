import $ from 'jquery';
import React from 'react';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import {DataGrid} from './data-grid';
import Paginator from 'widget/paginator/main';
import './std-data-grid.css';

class StdDataGrid extends React.Component {
  constructor(props) {
    super(props);
    let dgSetting = this.getStoredSetting();
    this.state = {
      filterHint: [],
      dgSelectedLength: 0,
      dgState: null,
      dgSetting: dgSetting
    };
  }

  componentDidMount() {
    this.setFilterHint();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setDgState(nextProps.state, true);
    }
  }

  getStoredSetting() {
    let name = this.props.name;
    if (name) {
      let s = localStorage.getItem('data_grid_setting_' + name);
      if (s) {
        return JSON.parse(s);
      }
    }
    return null;
  }

  setStoredSetting(setting) {
    let name = this.props.name;
    if (name) {
      localStorage.setItem('data_grid_setting_' + name, JSON.stringify(setting));
    }
  }

  setDgState(dgState, noTriggerChange) {
    if (!dgState) {
      return;
    }
    let newDgState = {...this.state.dgState, ...dgState};
    this.setState({
      dgSelectedLength: 0,
      dgState: newDgState
    });
    if (!noTriggerChange && this.props.onChange) {
      this.props.onChange({
        sortColumnId: newDgState.sortColumnId || '',
        sortOrder: newDgState.sortOrder || '',
        filterMap: this.refs.dataGrid.dataGridInstance.getFilterMapString(newDgState.filterMap || ''),
        page: 1
      });
    }
  }

  get dataGridInstance() {
    return this.refs.dataGrid && this.refs.dataGrid.dataGridInstance;
  }

  @autobind
  onPageChange(page) {
    if (this.props.onChange) {
      let dgState = this.state.dgState || {};
      this.props.onChange({
        sortColumnId: dgState.sortColumnId || '',
        sortOrder: dgState.sortOrder || '',
        filterMap: this.refs.dataGrid.dataGridInstance.getFilterMapString(dgState.filterMap || ''),
        page: page
      });
    }
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
  onDgStateChange(dgState) {
    this.setDgState(dgState);
  }

  @autobind
  onDgSettingChange(setting) {
    this.setState({
      dgSelectedLength: 0,
      dgSetting: setting
    });
    this.setStoredSetting(setting);
  }

  @autobind
  clearSorting() {
    this.setDgState({
      sortColumnId: '',
      sortOrder: ''
    });
  }

  @autobind
  removeFilter(evt) {
    let id = $(evt.currentTarget).closest('[data-id]').attr('data-id');
    let dgState = this.state.dgState;
    let filterMap = {...dgState.filterMap};
    delete filterMap[id];
    this.setDgState({
      filterMap: filterMap
    });
  }

  @autobind
  showFilterPanel(evt) {
    let target = evt.currentTarget;
    let id = $(target).closest('[data-id]').attr('data-id');
    let column = this.refs.dataGrid.dataGridInstance.getColumnById(id);
    this.refs.dataGrid.dataGridInstance.showFilterPanel(column, target);
  }

  getSortHint() {
    let dgState = this.state.dgState;
    if (dgState && dgState.sortColumnId) {
      return this.props.columns.reduce((prev, column) => {
        if (column.id == dgState.sortColumnId) {
          return (
            <div key={'sort_' + column.id} className="header__filter-item">
              <i className={classNames('fa', dgState.sortOrder == 'desc' ? 'fa-sort-alpha-desc' : 'fa-sort-alpha-asc')} /> {column.name} <a href="javascript:void(0);" onClick={this.clearSorting}><i className="fa fa-remove" /></a>
            </div>
          );
        } else {
          return prev;
        }
      }, null);
    } else {
      return null;
    }
  }

  setFilterHint() {
    this.setState({
      filterHint: this.getFilterHint()
    });
  }

  getFilterHint() {
    let hints = [];
    let dgState = this.state.dgState;
    let dataGridInstance = this.refs.dataGrid && this.refs.dataGrid.dataGridInstance;
    let sortHint = this.getSortHint();
    if (sortHint) {
      hints.push(sortHint);
    }
    if (dataGridInstance) {
      if (dgState && dgState.filterMap) {
        let filterMap = dataGridInstance.parseFilterMap(dgState.filterMap);
        for (let id in filterMap) {
          let filter = filterMap[id];
          let column = dataGridInstance.getColumnById(id);
          let filterOption = column.filterOption || {};
          // console.log(filter, filterOption);
          hints.push(
            <div key={'filter_' + id} className="header__filter-item" data-id={id}>
              <a href="javascript:void(0);" onClick={this.showFilterPanel}><i className="fa fa-filter" /></a> {column.name} <a href="javascript:void(0);" onClick={this.removeFilter}><i className="fa fa-remove" /></a>
            </div>
          );
        }
      }
    }
    return hints;
  }

  render() {
    let props = this.props;
    let dgState = this.state.dgState;
    let dgSetting = this.state.dgSetting;
    let dgSelectedLength = this.state.dgSelectedLength;
    let editBtn = dgSelectedLength === 1 ? <button className="btn btn-link"><i className="fa fa-pencil" /> 编辑</button> : '';
    let filterHint = this.getFilterHint() || this.state.filterHint;
    let noDataMsg = '';
    if (!props.data || !props.data.length) {
      noDataMsg = <div className="no-data-msg">
        没有相关数据
      </div>;
    }
    return (
      <div className="data-grid-component">
        <div className={classNames('header', {'show-op': dgSelectedLength})}>
          <div className="header__content">
            <div className="header__title" style={{width: '50px'}}>
              <h3>{props.title}</h3>
            </div>
            <div className="header__filter">
              {filterHint}
            </div>
            <div className="header__create">
              <button className="btn btn-link"><i className="fa fa-plus" /></button>
            </div>
          </div>
          <div className="header-op">
            <span className="selected-note">已选中 <i>{dgSelectedLength}</i> 项</span>
            {editBtn}
            <button className="btn btn-link"><i className="fa fa-trash" /> 删除</button>
            <button className="btn btn-link btn-close" onClick={this.closeDgOp}><i className="fa fa-remove" /></button>
          </div>
        </div>
        <div className="data-grid">
          <DataGrid ref="dataGrid" height="100%" columns={props.columns} data={props.data} state={dgState} setting={dgSetting} onStateChange={this.onDgStateChange} onSettingChange={this.onDgSettingChange} onSelect={this.onDgRowSelect} minScrollXColumns="7" sequence={{name: '#'}} checkbox bordered striped hightLightRow  />
          {noDataMsg}
        </div>
        <div className="pag">
          <Paginator page={props.page} pageSize={props.pageSize} total={props.total} onChange={this.onPageChange} />
        </div>
      </div>
    );
  }
}

StdDataGrid.propTypes = {
  title: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  state: React.PropTypes.object,
  page: React.PropTypes.number.isRequired,
  pageSize: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
};

StdDataGrid.defaultProps = {
  title: '列表'
};

export {StdDataGrid};
