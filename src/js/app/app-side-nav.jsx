import {Link} from 'react-router';

let AppSideNav = (props) => {
  return (
    <div className="app-side-nav">
      <ul className="nav nav-pills nav-stacked">
        <li><Link to={'/home'} activeClassName="active">主页</Link></li>
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);">设置 <span className="caret" /></a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><Link to={'/setting'} activeClassName="active">设置</Link></li>
            <li><Link to={'/setting/detail/1'} activeClassName="active">设置详情</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default AppSideNav;
