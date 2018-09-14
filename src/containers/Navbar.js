import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import NavbarBoot from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import {withRouter} from 'react-router-dom';

class Navbar extends Component {

  signout = () => {
    this.props.logout()
    .then(() => {
      return this.props.history.push('/');
    })
    
  }


  render() {
    return (
      <NavbarBoot className='main-navbar'>
        <NavbarBoot.Header>
          <NavbarBoot.Brand>
            <Link to='/'>React-Bootstrap</Link>
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
        {this.props.user && this.props.user.role === 'admin' ?
        <div className='login-block'>
          <Button bsStyle='link' onClick={this.signout}>Log out</Button>
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

export default withRouter(Navbar);