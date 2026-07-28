import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/logo1.png";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto navbar-nav mx-auto mb-2 mb-lg-0">
            <Nav.Link
              as={NavLink}
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/"
            >
              {/* <Link to="/" className="text-decoration-none"> */}
              Accueil
              {/* </Link> */}
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/categories"
            >
              {/* <Link to="/categories" className="text-decoration-none"> */}
              Catégories
              {/* </Link> */}
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/produits"
            >
              {/* <Link to="/produits" className="text-decoration-none"> */}
              Produits
              {/* </Link> */}
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/acheteurs"> */}
            {/* <Link to="/acheteurs" className="text-decoration-none"> */}
            {/* Acheteurs */}
            {/* </Link> */}
            {/* </Nav.Link> */}
          </Nav>
          <Nav>
            {/* <NavDropdown title="Connexion" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
