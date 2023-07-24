import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from "reactstrap";
import logo from "../assets/chikn-tinder-logo.png";

function Header() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Navbar style = {{color: 'blue'}}light>
      <NavbarBrand href="/" className="me-auto">
        <img style={{ height: "3rem" }} src={logo} />
      </NavbarBrand>
      <NavbarToggler
        onClick={() => setCollapsed(!collapsed)}
        className="me-2"
      />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Rate Chickens
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/view">
              View All Chickens
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/map">
              Map Chickens [ BETA ]
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/submit">
              Submit Chicken
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
