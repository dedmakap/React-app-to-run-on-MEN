import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';


import SignIn from './containers/Signin';
import Register from './containers/Register';
import Navbar from './containers/Navbar';
import Home from './containers/Home';
import Users from './containers/Userslist';
import Userpage from './containers/Userpage';
import Notfound from './components/Notfound';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      loading: true,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const loading = false;
    this.setState({ user, loading });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  logout = () => {
    return new Promise((resolve, reject) => {
      this.setState({ user: undefined }, (err) => {
        if (err) return reject(err);
        localStorage.removeItem('user');
        return resolve();
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ width: '100%' }}>
        <Router>
          <div>
            <Navbar user={this.state.user} logout={this.logout} />
            <Switch>
              <Route path='/signin' component={() => <SignIn user={this.state.user} setUser={this.setUser} />} />
              <Route exact path='/' component={() => <Home user={this.state.user} />} />
              <Route path='/register' component={() => <Register user={this.state.user} setUser={this.setUser} />} />
              <Route exact path='/users' component={() => <Users user={this.state.user} />} />
              <Route exact path='/users/userpage/:id' component={() => <Userpage guest={this.state.user} />} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
