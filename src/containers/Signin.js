import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import Center from '../components/Centralizer';
import {withRouter} from 'react-router-dom';
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import * as userApi from '../api/user';

import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Checkbox from 'react-bootstrap/lib/Checkbox'
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailWrong: false,
      passWrong: false,
      passInputError: null,
      email: '',
      password:'',
    }
  }
  
  componentDidMount() {
    if (this.props.user) {
      this.props.history.push('/')
    }
  }

  onInputChange = (e) => {
    e.preventDefault();    
    const { id } = e.target;    
    this.setState({
      [id]: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const validForm = this.validateForm()
    if (!validForm) return;
    const guest = {
      email: this.state.email,
      password: this.state.password,
    }
    userApi.signIn(guest)
    .then((data) => {
      if (data.passWrong) {
        return this.setState({
          passWrong: true,
        })
      }
      this.props.setUser(data)
      localStorage.setItem('user',JSON.stringify(data))
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const err = {}

    if (this.state.password.length < 3) {
      err.passInputError = 'error'
    }

    this.setState(err)
    if (Object.keys(err).length) return false;  
    return true;
  }



  renderEmailErr = () => {
    if (this.state.emailWrong) {
      return (
        <p style={{color:'red'}}>That email is not registered!</p>
      )
    }
  }

  renderPassErr = () => {
    if (this.state.passWrong) {
    return (
      <p style={{color:'red'}}>That password is incorrect!</p>
    )
    }
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
              <Link to='/register' >Don't have an account? Create one</Link>
              </Col>
            </FormGroup>
          </Form>
        </div>
       </Center>
    );
  }
}

export default withRouter(SignIn);