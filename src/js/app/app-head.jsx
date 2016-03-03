import {Link} from 'react-router';

let AppHead = (props) => {
  return (
    <div className="app-head">
      <div className="app-head__logo">
        <h1>演示系统</h1>
      </div>
      <ul className="app-head__actions">
        <li>您好，Admin</li>
        <li><a href="#"><i className="fa fa-sign-out"></i> 退出</a></li>
      </ul>
    </div>
  );
};

export default AppHead;
