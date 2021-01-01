import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  Form,
  FormGroup,
  Input,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const AppNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Movies Tracking Application</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/genre">Genre</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/movies">Movies</NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="mr-3">Search</NavbarText>
          <Form inline>
            <FormGroup>
              <Input type="search" name="search" id="search" placeholder="Search" />
            </FormGroup>
          </Form>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNav;