import React, {useState} from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Navi = (props) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Hack This MEAN Site</NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Nav className="mr-auto" navbar>
        {/* Challenges menu */}
            <UncontrolledDropdown nav inNavbar>
              <NavItem>
                <DropdownToggle nav caret>
                  Challenges
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/Challenge0'>
                    Challenge 0
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 1
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 2
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 3
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 4
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 5
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 6
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 7
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 8
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 9
                  </DropdownItem>
                  <DropdownItem>
                    Challenge 10
                  </DropdownItem>
                </DropdownMenu>
              </NavItem>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink href="https://github.com/ZackFra/test_forum">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Yeet!</NavbarText>
      </Navbar>
    </div>
  );
}

export default Navi;