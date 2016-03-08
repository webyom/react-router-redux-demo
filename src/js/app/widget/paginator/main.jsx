import React from 'react';
import {autobind} from 'core-decorators';

class Paginator extends React.Component {
  @autobind
  onClick(evt) {
    let page = parseInt($(evt.currentTarget).attr('data-page'));
    if (this.props.onChange) {
      this.props.onChange(page);
    }
  }

  render() {
    let {page, pageSize, pageAside, total} = this.props;
    let totalPages = Math.ceil(total / pageSize);
    let minPage = Math.max(1, Math.min(page - pageAside, totalPages - pageAside * 2));
    let maxPage = Math.min(totalPages, Math.max(page + pageAside, pageAside * 2 + 1));

    return (
      <nav>
        <ul className="pagination">
          {(() => {
            return page > 1 ? <li><a href="javascript:void(0);" data-page={page - 1} onClick={this.onClick}><span>&laquo;</span></a></li> : <li className="disabled"><a href="javascript:void(0);"><span>&laquo;</span></a></li>;
          })()}
          {(() => {
            let res = [];
            for (let p = minPage; p <= maxPage; p++) {
              if (p == page) {
                res.push(<li key={p} className="active"><a href="javascript:void(0);">{p}</a></li>);
              } else {
                res.push(<li key={p}><a href="javascript:void(0);" data-page={p} onClick={this.onClick}>{p}</a></li>);
              }
            }
            return res;
          })()}
          {(() => {
            return page < totalPages ? <li><a href="javascript:void(0);" data-page={page + 1} onClick={this.onClick}><span>&raquo;</span></a></li> : <li className="disabled"><a href="javascript:void(0);"><span>&raquo;</span></a></li>;
          })()}
        </ul>
      </nav>
    );
  }
}

Paginator.propTypes = {
  page: React.PropTypes.number.isRequired,
  pageSize: React.PropTypes.number.isRequired,
  pageAside: React.PropTypes.number,
  total: React.PropTypes.number.isRequired
};

Paginator.defaultProps = {
  pageAside: 3
};

export default Paginator;
