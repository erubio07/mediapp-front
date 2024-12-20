import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/actions";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const user = useSelector((state) => state.user);
  console.log(user);
  const auth = useAuth();

  useEffect(() => {
    if(userId){
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MediApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/subs">Suscribirse</Nav.Link>
          </Nav>
          {user && (
            <Navbar.Text>
              Signed in as: <Link onClick={() => auth.logOut()}>{user.name} {user.surname}</Link>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
