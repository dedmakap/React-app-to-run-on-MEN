import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Center from '../components/Centralizer';
import HelpBlock from 'react-bootstrap/lib/HelpBlock'


class Register extends Component {
  constructor(props) {
    super(props);
    console.log('this is a constructor');
    this.state = {
      emailError: false,
      ageError: false,
      fullnameError: false,
      usernameError: false,
      passError: false,
      fullname: '',
      username: '',
      email: '',
      age: '',
      password: '',
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.fullname.length);

  }

  onInputChange = (e) => {
    e.preventDefault();
    //console.log('121211', e.target.id);
    
    const { id } = e.target;
    this.setState({
      [id]: e.target.value,
  })
}

  renderEmailErr = () => {
    if (this.state.emailWrong) {
      return (
        <p style={{color:'red'}}>That email is already registered!</p>
      )
    }
  }

  validateForm = () => {
    const err = {}
    if (this.state.age <= 0) {
      err.ageError = true
    }
    if (this.state.fullname.length < 3) {
      err.fullnameError = true
    }
    if (this.state.username.length < 3) {
      err.usernameError = true
    }
    if (this.state.password.length < 3) {
      err.passError = true
    }
    this.setState(err)
  }

  validateAge = (age) => {
    return age >= 0
  }

  validateName = (name) => {
    return name.length > 2
  }

  render() {
    return (
      <Center>
      <div style={{width: '500px'}}>
      <Form horizontal onSubmit={this.onSubmit}>

        <FormGroup controlId="fullname" validationState={null} >
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
          </Col>
        </FormGroup>

        <FormGroup controlId="username">
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

        <FormGroup controlId="age">
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
          </Col>
        </FormGroup>

        <FormGroup controlId="password">
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
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            {this.renderEmailErr()}
            <Button type="submit" block>Register</Button>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
          <Link to='/signin' >To login page</Link>
          </Col>
        </FormGroup>
      </Form>
      </div>
      </Center>
    );
  }
}

export default Register;