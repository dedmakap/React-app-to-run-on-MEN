import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form'
import NavbarBoot from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'

class Navbar extends Component {
  render() {
    return (
      <NavbarBoot className='main-navbar'>
        <NavbarBoot.Header>
          <NavbarBoot.Brand>
            <p>React-Bootstrap</p>
          </NavbarBoot.Brand>
        </NavbarBoot.Header>
        <Nav>
          {this.props.user && 
          <React.Fragment>
          <NavItem eventKey={1} href='/users'>
            Users
          </NavItem>
          <NavItem eventKey={2} href='/users/userpage'>
            My profile
          </NavItem>
          </React.Fragment>
          }
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        {this.props.user ?
        <div className='login-block'>
          <Link to='/signout'>Log out</Link>
        </div>
        :
        <div className='login-block'>
          <Link to='/signin'>Log in</Link>
        </div>
        }
      </NavbarBoot>
    )
  }
}

export default Navbar;