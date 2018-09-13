import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SignIn from './containers/Signin'
import Register from './containers/Register'
import Navbar from './containers/Navbar'
import Home from './containers/Home'

// const Topics = ({match}) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.path}/:topicId`} component={Topic}/>
//     <Route exact path={match.path} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )

class App extends Component {
  constructor(props) {
    super(props);
    console.log('this is a constructor');
    this.state = {
      flag: true,
    }
  }

  componentWillMount() {
    console.log('willdsmounFDt');
  }
  clickHandler = () => {
    console.log('clicked');
    this.setState({
      flag: false,
    })
  }
  componentDidMount() {
    console.log('didmounfdt');
  }
  render() {
    return (
      <div style={{width:'100%'}}>
      <Router>
          <div>
          <Navbar /> 
          <Route path='/signin' component={SignIn} />
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
        </div>
      </Router>

      </div>
    )
  }
}


export default App;
