import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div>
      {/* Profile Page */}
      <Wrapper>
        <Logo>
          <Link to="/">WhenWeWork</Link>
        </Logo>
        <Nav>
          <Button as={Link} to="/companies">
            Companies
          </Button>
          <Button as={Link} to="/open">
            Available Shifts
          </Button>
          <Button as={Link} to="/">
            My Shifts
          </Button>
          <Button as={Link} to="/settings">
            Settings
          </Button>
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Wrapper>
      <center><h4>Welcome {user.username} from {user.company.name}!</h4></center>
    </div>

  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: black;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
