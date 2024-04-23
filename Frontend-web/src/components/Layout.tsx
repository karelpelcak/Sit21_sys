import { Link, useLocation } from 'react-router-dom';
import { useData } from '../Checker';
import { useCookies } from 'react-cookie';

const Layout = () => {
  const { data } = useData();
  const [, , removeCookie] = useCookies();
  const location = useLocation();

  const handleLogout = async () => {
    await removeCookie('Auth_Token');
  };

  const isActive = (pathname: any) => {
    return location.pathname === pathname;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      <Link className="navbar-brand" to="/">
        WorkFlow
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/tasks') ? 'active' : ''}`} to="/tasks">
              Úkoly
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/users') ? 'active' : ''}`} to="/users">
              uživatele
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/createevent') ? 'active' : ''}`} to="/createevent">
              Nový úkol
            </Link>
          </li>
        </ul>
      </div>
      {data && (
        <div className="navbar ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-light" to={`/user/${data.username}`}>
                {data.firstname} {data.lastname}
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-light" onClick={handleLogout}>
                Odhlásit
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Layout;
