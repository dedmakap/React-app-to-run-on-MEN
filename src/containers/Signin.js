import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import Center from '../components/Centralizer';

import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Checkbox from 'react-bootstrap/lib/Checkbox'
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailWrong: false,
      passWrong: false,
      email: '',
      password:'',
    }
  }

  renderEmailErr = () => {
    if (this.state.emailWrong) {
      return (
        <p>That email is not registered!</p>
      )
    }
  }

  renderPassErr = () => {
    if (this.state.passWrong) {
    return (
      <p>That password is incorrect!</p>
    )
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  onInputChange = (e) => {
    e.preventDefault();    
    const { id } = e.target;    
    this.setState({
      [id]: e.target.value,
    })
  }

  render() {
    
    return (
      <Center> 
        <div 
          style={
            { width: '500px',
          }
          }>
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

            <FormGroup controlId="password">
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
              <Link to='/register' >Don't have an account? Create one</Link>
              </Col>
            </FormGroup>
          </Form>
        </div>
       </Center>
    );
  }
}

export default SignIn;