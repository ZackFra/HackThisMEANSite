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
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Hack This MEAN Site</NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Nav className="mr-auto" navbar>
        {/* Challenges menu */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Challenges
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/Challenge0'>
                  Challenge 0
                </DropdownItem>
                <DropdownItem href='/Challenge1'>
                  Challenge 1
                </DropdownItem>
                <DropdownItem href='/Challenge2'>
                  Challenge 2
                </DropdownItem>
                <DropdownItem href='/Challenge3'>
                    Challenge 3
                </DropdownItem>
                <DropdownItem href='/Challenge4'>
                  Challenge 4
                </DropdownItem>
                <DropdownItem href='/Challenge5'>
                  Challenge 5
                </DropdownItem>
                <DropdownItem href='/Challenge6'>
                  Challenge 6
                </DropdownItem>
                <DropdownItem href='/Challenge7'>
                  Challenge 7
                </DropdownItem>
                <DropdownItem href='/Challenge8'>
                  Challenge 8
                </DropdownItem>
                <DropdownItem href='/Challenge9'>
                  Challenge 9
                </DropdownItem>
                <DropdownItem href='/Challenge10'>
                  Challenge 10
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink href='/Forums'>Forum</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/ZackFra/HackThisMEANSite">GitHub</NavLink>
            </NavItem>

          </Nav>
          <NavbarText>
            <NavLink href='/Login'>Login</NavLink>
          </NavbarText>
      </Navbar>
    </div>
  );
}

export default Navi;