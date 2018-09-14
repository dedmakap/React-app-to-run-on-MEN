import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Center from '../components/Centralizer';
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import * as userApi from '../api/user';
import {withRouter} from 'react-router-dom';

const LoginContainer = styled.div`
  width: 500px;
`
const RedButton = styled(Button)`
  background-color: lightgray;
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
      ageError: null,
      fullnameError: null,
      usernameError: null,
      passError: null,
      fullname: '',
      username: '',
      email: '',
      age: '',
      password: '',
    }
  }
  
  componentDidMount() {
    if (this.props.user) {
      this.props.history.push('/')
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const validForm = this.validateForm()
    if (!validForm) return;
    const user = {
      fullname: this.state.fullname,
      username: this.state.username,
      email: this.state.email,
      age: this.state.age,
      password:this.state.password,
    }
    userApi.register(user)
    .then(data => {
      console.log(data);
      if (data.emailWrong) {
        this.setState({
          emailError: true,
        })
      }
      this.props.setUser(data)
      localStorage.setItem('user',JSON.stringify(data))
      this.props.history.push('/')
    })
    .catch((err) => {
      console.log(err);
    })

  }

  onInputChange = (e) => {
    e.preventDefault();
    const { id } = e.target;
    this.setState({
      [id]: e.target.value,
  })
}

  renderEmailErr = () => {
    if (this.state.emailError) {
      return (
        <p style={{color:'red'}}>That email is already registered!</p>
      )
    }
  }

  validateForm = () => {
    const err = {}
    console.log(this.state.age);
    if (Number(this.state.age) <= 0 || typeof Number(this.state.age) !== 'number' )  {
      
      err.ageError = 'error'
    }
    if (this.state.fullname.length < 3) {
      err.fullnameError = 'error'
    }
    if (this.state.username.length < 3) {
      err.usernameError = 'error'
    }
    if (this.state.password.length < 3) {
      err.passError = 'error'
    }

    this.setState(err, ()=> {console.log('clb', this.state);} )
    if (Object.keys(err).length) return false;  
    return true;
  }


  render() {
    return (
      <Center>
      <LoginContainer>
      <Form horizontal onSubmit={this.onSubmit}>

        <FormGroup controlId="fullname" validationState={this.state.fullnameError} >
          <Col componentClass={ControlLabel} sm={2}>
            Your full name
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder="Full name"
              onChange={this.onInputChange}
              value={this.state.fullname}
              
            />
          {this.state.fullnameError && 
          <HelpBlock>Name is too short!</HelpBlock>
          }
          </Col>
        </FormGroup>

        <FormGroup controlId="username" validationState={this.state.usernameError}>
          <Col componentClass={ControlLabel} sm={2}>
            Your nickname
          </Col>
          <Col sm={10}>
            <FormControl 
              type="text" 
              placeholder="Username" 
              onChange={this.onInputChange}
              value={this.state.username}
              />
            {this.state.usernameError && 
            <HelpBlock>Username is too short!</HelpBlock>
            }
          </Col>
        </FormGroup>

        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={2}>
            Your Email
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

        <FormGroup controlId="age" validationState={this.state.ageError}>
          <Col componentClass={ControlLabel} sm={2}>
            Your age
          </Col>
          <Col sm={10}>
            <FormControl 
              type="text" 
              placeholder="Age"
              onChange={this.onInputChange}
              value={this.state.age}
              />
          {this.state.ageError && 
          <HelpBlock>Age is incorrect!</HelpBlock>
          }
          </Col>
        </FormGroup>

        <FormGroup controlId="password" validationState={this.state.passError}>
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col  sm={10}>
            <FormControl 
              type="password" 
              placeholder="Password"
              onChange={this.onInputChange}
              value={this.state.password}
            />
            {this.state.passError && 
            <HelpBlock>Password is too short!</HelpBlock>
            }
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            {this.renderEmailErr()}
            <RedButton type="submit" block>Register</RedButton>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
          <Link to='/signin' >To login page</Link>
          </Col>
        </FormGroup>
      </Form>
      </LoginContainer>
      </Center>
    );
  }
}

export default withRouter(Register);