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
import { verify } from 'jsonwebtoken';
import env from '../.env';

function Navi(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }

  // generates either login or logout button
  function setLog() {
    const token = localStorage.getItem('token');
    try { 
      verify(token, env.jwtseed);
      return (
        <NavLink onClick={logout} href='/'>
          Log out
        </NavLink>
      ); 
    } catch(e) {
      return <NavLink href='/Login'>Login</NavLink>
    }
  }
  

  return (
    <div>
      <Navbar className='nav-bg nav-font' style={{height: '12vh'}} dark expand="md">
        <NavbarBrand href="/">Hack This MEAN Site</NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Nav className="mr-auto" navbar>
        {/* Challenges menu */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Challenges
              </DropdownToggle>
              <DropdownMenu className='dropdown-font'>
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

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Forums
              </DropdownToggle>
              <DropdownMenu className='dropdown-font'>
                <DropdownItem href='/OffTopic'>
                  Off Topic
                </DropdownItem>
                <DropdownItem href='/Challenge0Forum'>
                  Challenge 0
                </DropdownItem>
                <DropdownItem href='/Challenge1Forum'>
                  Challenge 1
                </DropdownItem>
                <DropdownItem href='/Challenge2Forum'>
                  Challenge 2
                </DropdownItem>
                <DropdownItem href='/Challenge3Forum'>
                    Challenge 3
                </DropdownItem>
                <DropdownItem href='/Challenge4Forum'>
                  Challenge 4
                </DropdownItem>
                <DropdownItem href='/Challenge5Forum'>
                  Challenge 5
                </DropdownItem>
                <DropdownItem href='/Challenge6Forum'>
                  Challenge 6
                </DropdownItem>
                <DropdownItem href='/Challenge7Forum'>
                  Challenge 7
                </DropdownItem>
                <DropdownItem href='/Challenge8Forum'>
                  Challenge 8
                </DropdownItem>
                <DropdownItem href='/Challenge9Forum'>
                  Challenge 9
                </DropdownItem>
                <DropdownItem href='/Challenge10Forum'>
                  Challenge 10
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="https://github.com/ZackFra/HackThisMEANSite">GitHub</NavLink>
            </NavItem>

          </Nav>
          <NavbarText>
            {setLog()}
          </NavbarText>
      </Navbar>
    </div>
  );
}

export default Navi;