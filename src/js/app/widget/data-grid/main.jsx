import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import YomDataGrid from 'yom-data-grid';

class DataGrid extends React.Component {
  componentDidMount() {
    this.renderDataGrid();
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(Immutable.fromJS({
      data: nextProps.data,
      state: nextProps.state,
      setting: nextProps.setting
    }), Immutable.fromJS({
      data: this.props.data,
      state: this.props.state,
      setting: this.props.setting
    }));
  }

  componentDidUpdate(props) {
    this.renderDataGrid();
  }

  componentWillUnmount() {
    this.dataGrid.destroy();
  }

  get dataGridInstance() {
    return this.dataGrid;
  }

  renderDataGrid() {
    let props = this.props;
    let container = ReactDOM.findDOMNode(this.refs.container);
    let height = parseInt(props.height);
    let data = props.data;
    this.dataGrid && this.dataGrid.destroy();
    this.dataGrid = new YomDataGrid(container, props.columns, {
      width: 'auto',
      height: height > 0 ? '100%' : 'auto',
      minScrollXColumns: props.minScrollXColumns,
      checkbox: props.checkbox,
      sequence: props.sequence,
      bordered: props.bordered,
      striped: props.striped,
      hightLightRow: props.hightLightRow,
      onSelect: props.onSelect,
      onStateChange: props.onStateChange,
      onSettingChange: props.onSettingChange
    });
    this.dataGrid.render(data, props.state, props.setting);
  }

  render() {
    let props = this.props;
    let height = parseInt(props.height);
    return (
      <div ref="container" style={{height: height > 0 ? '100%' : 'auto'}}></div>
    );
  }
}

export default DataGrid;
