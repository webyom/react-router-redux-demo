import React from 'react';
import ReactDOM from 'react-dom';
import YomDataGrid from 'yom-data-grid';

class DataGrid extends React.Component {
  componentDidMount() {
    this.renderDataGrid();
  }

  componentDidUpdate(props) {
    this.renderDataGrid();
  }

  componentWillUnmount() {
    this.dataGrid.destroy();
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
      onStateChange: props.onStateChange,
      onSettingChange: props.onSettingChange
    });
    this.dataGrid.render(data, props.state, props.setting);
  }

  render() {
    let props = this.props;
    let height = parseInt(props.height);
    return (
      <div ref="container" style={{height: height > 0 ? height + 'px' : 'auto'}}></div>
    );
  }
}

export default DataGrid;
