import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  const location = useLocation();

  return (
    <OuterWrapper isAdmin={user.admin}>
      <Wrapper>
        <Logo>
          <Link to="/">WhenWeWork</Link>
        </Logo>
        <Nav>
          {/* <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button> */}
          <Button as={Link} to="/notifications" active={location.pathname === "/notifications"}>
            🔔
          </Button>
          <Button as={Link} to="/settings" active={location.pathname === "/settings"}>
            ⚙️
          </Button>
          <Button as={Link} to="/" active={location.pathname === "/"} onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Wrapper>
      <Nav2>
        {/* <StyledButton as={Link} to="/companies" active={location.pathname === "/companies"}>
          Companies
        </StyledButton> */}
        <StyledButton as={Link} to="/open" active={location.pathname === "/open"}>
          AVAILABLE
        </StyledButton>
        <StyledButton as={Link} to="/" active={location.pathname === "/"}>
          UPCOMING
        </StyledButton>
        {/* <StyledButton as={Link} to="/settings" active={location.pathname === "/settings"}>
          User Settings
        </StyledButton> */}
        <StyledButton as={Link} to="/bigcalendar" active={location.pathname === "/bigcalendar"}>
          ALL
        </StyledButton>
        <StyledButton as={Link} to="/companysettings" active={location.pathname === "/companysettings"}>
          COMPANY
        </StyledButton>
        <StyledButton as={Link} to="/createshift" active={location.pathname === "/createshift"}>
          CREATE
        </StyledButton>
      </Nav2>
      {/* <WelcomeMessage>
        Welcome {user.username} from {user.company.name}!
      </WelcomeMessage> */}
    </OuterWrapper>
  );
}

const OuterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.isAdmin ? "rgb(44, 70, 124)" : "gray"};
  border-bottom: 1px solid black;
  z-index: 1;
  padding-bottom: 40px;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 2rem;
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

const Nav2 = styled.nav`
  display: flex;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%; /* Ensure that the buttons span the entire width of the container */
`;

const StyledButton = styled(Button)`
  flex: 1; /* Make all buttons take up equal space within the parent */
  text-decoration: none;
  border: 1px solid black; /* Add a thin black outline */
  background-color: ${(props) => (props.active ? "#444444" : "transparent")};
  color: ${(props) => (props.active ? "white" : "white")};
  display: flex; /* Use flexbox layout */
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s; /* Add a smooth transition on hover */
  font-size: 16px; /* Adjust the font size as needed */
  ${'' /* font-color: white; */}

  &: hover {
    
    background-color: ${(props) => (props.active ? "#444444" : "#444444")};
    /* Change the background color to a slightly darker shade when the button is hovered */
    /* You can adjust the color value to your desired hover color */
  }
`;

const WelcomeMessage = styled.div`
text - align: center;
padding - top: 30px;
`;

export default NavBar;