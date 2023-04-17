// export const Header = () => {
//   return (
//       );
// }
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { useLocation } from 'react-router-dom';
import axios from "axios";
// import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  let navigate = useNavigate();
  const logout = async () => {
    console.log("logout button (frontend)");
    localStorage.removeItem("email");
    navigate("/login");
    // const res = await axios.get("/logout");
    // if (res.status === 200) {
    //   console.log("Logout Successfully");
    //   navigate("/registration");
    // } else {
    //   console.log("Logout Not Successfully");
    // }
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/registration">Registration</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
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

            <Nav>
              {/* <Nav.Link>Logout</Nav.Link> */}
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => logout()}
              >
                Logout
              </button>
              {/* <Nav.Link href="#deets">Name</Nav.Link> */}
              {/* <Nav.Link eventKey={2} href="#memes">
              Name
            </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <button onClick={() => logout()} >
            Logout
    </button> */}
    </div>
  );
}

export default Header;
