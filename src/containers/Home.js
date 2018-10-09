import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {Button, Glyphicon} from 'react-bootstrap/lib';
import { user as userPropTypes } from '../proptypes';
import {getHomePage} from '../api/user';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:3500",
      counter: 1,
    };
  }

  componentDidMount() {
    getHomePage()
     .then(data => console.log(data));
    const socket = socketIOClient(this.state.endpoint);
    socket.on('addlike', likes => this.setState({counter: likes}));
  }



  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('addlike', this.state.counter);
    
  }

  render() {
    return (
      <Row>
        <Col mdOffset={3} smOffset={3} xsOffset={3} md={10}>
          <div>
            <h1>
              Hello,
              {' '}
              {this.props.user.fullname}
            </h1>
            <Button onClick={this.send}>
              <Glyphicon glyph="heart" /> 
              {` ${this.state.counter}`}
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

Home.propTypes = {
  user: userPropTypes,
};

Home.defaultProps = {
  user: {
    fullname: 'World!',
  }
};

export default Home;
