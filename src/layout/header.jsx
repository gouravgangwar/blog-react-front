import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    getUserDetails();
  }, [token]);

  function getUserDetails() {
    const val = JSON.parse(localStorage.getItem("UserDetails"));
    if (val) {
      const { user, token } = val;
      setUser(user);
      setToken(token);
    }
    console.log(val);
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Blogging
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to="/createpost">
                Add Post 
              </Nav.Link>
              <Nav.Link as={Link} to="/listpost">
                All Post 
              </Nav.Link>
              <Nav.Link as={Link} to="/role">
                Role
              </Nav.Link> */}
              {token && (
                <>
                  <Nav.Link as={Link} to="/createpost">
                    Add Post
                  </Nav.Link>
                  <Nav.Link as={Link} to="/listpost">
                    All Post
                  </Nav.Link>
                  <Nav.Link as={Link} to="/role">
                    Role
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav>
            {!token && (
              <Nav.Link as={Link} to="/login">
                Log in
              </Nav.Link>
               )}
              {token && (
              <Nav.Link as={Link} >
                Log Out
              </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
