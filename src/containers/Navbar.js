import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import NavbarBoot from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

class Navbar extends Component {

  signout = () => {
    this.props.logout()
      .then(() => {
        return this.props.history.push('/');
      });

  }


  render() {
    
    let profileLink = '/';
    
    if (this.props.user) {
      profileLink = `/users/userpage/${this.props.user.id}`;
    }
    
    
    return (
      <NavbarBoot className='main-navbar'>
        <NavbarBoot.Header>
          <NavbarBoot.Brand>
            <Link to='/'>React-Bootstrap</Link>
          </NavbarBoot.Brand>
        </NavbarBoot.Header>
        <Nav>
          {this.props.user && (this.props.user.role === 'admin') && (
            <React.Fragment>
              <LinkContainer to="/users">
                <NavItem>
                  Users
                </NavItem>
              </LinkContainer>
            </React.Fragment>
          )}
          {this.props.user && (
            <React.Fragment>
              <LinkContainer to={profileLink}>
                <NavItem>
                  My profile
                </NavItem>
              </LinkContainer>
            </React.Fragment>
          )}
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        {this.props.user ? (
          <div className='login-block'>
            <Button bsStyle='link' onClick={this.signout}>Log out</Button>
          </div>
        ) : (
          <div className='login-block'>
            <Link to='/signin'>Log in</Link>
          </div>
          )}
      </NavbarBoot>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string,
    role: PropTypes.string,
    token: PropTypes.string,
    id: PropTypes.number,
  }),
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Navbar.defaultProps = {
  user: undefined
};

export default withRouter(Navbar);
