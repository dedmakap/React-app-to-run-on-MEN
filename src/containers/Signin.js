import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PropTypes from 'prop-types';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FBLoginButton from 'react-facebook-login';
import * as userApi from '../api/user';
import Center from '../components/Centralizer';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailWrong: false,
      passWrong: false,
      passInputError: null,
      email: '',
      password: '',
    };
  }

  componentDidMount() {

  }

  responseFacebook = (response) => {
    console.log(response);

    const guest = {};
    if (response.birthday){
    let birthDate = response.birthday.split('/');
      guest.age = this.ageCalculator(birthDate);
    }

    guest.email = response.email;
    guest.password = 'Logged via Facebook';
    guest.firstName = response.name;


    userApi.signIn(guest)
      .then((data) => {
        this.props.setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.props.history.push('/');
      });
  };

  ageCalculator = (birthday) => {
    const today = new Date();
    const todayObj = {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    };
    let age;
    if ((todayObj.month + 1) > Number(birthday[0])) {
      return age = todayObj.year - birthday[2];
    }
    if ((todayObj.month + 1) < Number(birthday[0])) {
      return age = todayObj.year - birthday[2] - 1;
    }
    if ( todayObj.day >= Number(birthday[1]) ) {
      return age = todayObj.year - birthday[2];
    }
    return age = todayObj.year - birthday[2] - 1;
  }

  onInputChange = (e) => {
    e.preventDefault();
    const { id } = e.target;
    this.setState({
      [id]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const validForm = this.validateForm();
    if (!validForm) return;
    const guest = {
      email: this.state.email,
      password: this.state.password,
    };
    userApi.signIn(guest)
      .then((data) => {
        if (data.emailWrong) {
          return this.setState({
            emailWrong: true,
          });
        }
        if (data.passWrong) {
          return this.setState({
            passWrong: true,
          });
        }
        console.log(data);
        this.props.setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.props.history.push('/');
      });
  }

  validateForm = () => {
    const err = {};

    if (this.state.password.length < 3) {
      err.passInputError = 'error';
    }

    this.setState(err);
    if (Object.keys(err).length) return false;
    return true;
  }



  renderEmailErr = () => {
    if (this.state.emailWrong) {
      return (
        <p style={{ color: 'red' }}>That email is not registered!</p>
      );
    }
  }

  renderPassErr = () => {
    if (this.state.passWrong) {
      return (
        <p style={{ color: 'red' }}>That password is incorrect!</p>
      );
    }
  }


  render() {
    if (this.props.user || this.props.user !== undefined) {
      return <Redirect to="/" />;
    }


    return (
      <Center>
        <div
          style={
            {
              width: '500px',
            }
          }
        >
          <h1>Please Sign in</h1>
          <Form horizontal onSubmit={this.onSubmit}>
            <FormGroup controlId="email">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl
                  type="email"
                  placeholder="Email"
                  onChange={this.onInputChange}
                  value={this.state.email}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="password" validationState={this.state.passInputError}>
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  onChange={this.onInputChange}
                  value={this.state.password}
                />
                {this.state.passInputError &&
                  <HelpBlock>Password is too short!</HelpBlock>
                }
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                {this.renderEmailErr()}
                {this.renderPassErr()}
                <Button type="submit">Sign in</Button>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Link to='/register'>Don't have an account? Create one</Link>
              </Col>
            </FormGroup>
          </Form>
          <Col mdOffset={2} md={10}>
            <FBLoginButton
              appId="2166905770249416"
              fields="name,email,picture,birthday"
              scope="public_profile, email, user_birthday"
              callback={this.responseFacebook}
            />
          </Col>
        </div>
      </Center>
    );
  }
}

SignIn.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string,
    role: PropTypes.string,
    token: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

SignIn.defaultProps = {
  user: undefined,
};

export default withRouter(SignIn);
