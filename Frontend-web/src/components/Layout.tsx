import { Link, useLocation } from 'react-router-dom';
import { useData } from '../Checker';
import { useCookies } from 'react-cookie';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Layout = () => {
  const { data } = useData();
  const [, , removeCookie] = useCookies();
  const location = useLocation();

  const handleLogout = async () => {
    await removeCookie('Auth_Token');
  };

  const isActive = (pathname: string) => {
    return location.pathname === pathname;
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          WorkFlow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/tasks" className={isActive('/tasks') ? 'active' : ''}>
              Úkoly
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className={isActive('/users') ? 'active' : ''}>
              Uživatelé
            </Nav.Link>
            <Nav.Link as={Link} to="/createevent" className={isActive('/createevent') ? 'active' : ''}>
              Nový úkol
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {data && (
          <Nav>
            <Nav.Link as={Link} to={`/user/${data.username}`} className="text-light">
              {data.firstname} {data.lastname}
            </Nav.Link>
            <Button variant="light" onClick={handleLogout}>
              Odhlásit
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Layout;
