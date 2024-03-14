import { useData } from "../Checker";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Layout = () => {
  const { data } = useData();
  const [, , removeCookie] = useCookies();
  const handleLogout = async () =>{
    await removeCookie("Auth_Token");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      <a className="navbar-brand" href="/">
        TCServis
      </a>
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
            <a className="nav-link" href="/tasks">
              Úkoly
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/users">
              uživatele
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/createevent">
              Nový úkol
            </a>
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
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Layout;
