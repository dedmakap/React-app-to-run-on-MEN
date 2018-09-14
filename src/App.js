import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import SignIn from './containers/Signin'
import Register from './containers/Register'
import Navbar from './containers/Navbar'
import Home from './containers/Home'
import Notfound from './components/Notfound'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined, //JSON.parse(localStorage.getItem('user')),
    }
  }

  setUser = (user) => {
    console.log('set user wow', user);
    this.setState({ user })
  }
  
  componentDidMount() {
    this.setState({user:JSON.parse(localStorage.getItem('user'))})
  }

  render() {
    return (
      <div style={{width:'100%'}}>
      <Router>
          <div>
          <Navbar user={this.state.user} /> 
          <Switch>
          <Route path='/signin' component={SignIn} />
          <Route exact path='/' component={() => <Home user={this.state.user} />} />
          <Route path='/register' component={() => <Register user={this.state.user} setUser={this.setUser} />} />
          <Route component={Notfound}/>
          </Switch>
        </div>
      </Router>
      </div>
    )
  }
}


export default App;
