import React, { Component } from 'react';
// import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
// import Button from 'react-bootstrap/lib/Button';
// import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Table from 'react-bootstrap/lib/Table';
import PropTypes from 'prop-types';
import { getUserById } from '../api/user';
// import * as userApi from '../api/user';
// import Center from '../components/Centralizer';


class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {
        firstName: '',
        email: '',
        age: '',
        userName: '',
        role: {
          name: '',
        },
      },
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    return getUserById(id)
      .then((data) => {
        console.log(data);
        this.setState({loading: false});
      });
  }


  render() {

    if (!this.props.guest || this.props.guest === undefined) {
      return <Redirect to="/" />;
    }

    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    
    return (
      <React.Fragment>
        <Grid>
          <Row>
            <h1>Your profile page</h1>
          </Row>
          <Row>
            <Col xs={4} md={4}>

              <Thumbnail src="/avatarPlaceholder.png" alt='Your avatar'>
                <h3>Your avatar</h3>
                <form>
                  <FormGroup>
                    <HelpBlock>Upload new avatar</HelpBlock>
                    <FormControl
                      id="formControlsFile"
                      type="file"
                    />
                  </FormGroup>
                </form>
              </Thumbnail>
            </Col>
            <Col mdOffset={4}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Username</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.user.firstName}</td>
                    <td>{this.state.user.email}</td>
                    <td>{this.state.user.age}</td>
                    <td>{this.state.user.userName}</td>
                    <td>{this.state.user.role.name}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

Userpage.propTypes = {
  guest: PropTypes.shape({
    fullname: PropTypes.string,
    role: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape().isRequired,
};

export default withRouter(Userpage);
