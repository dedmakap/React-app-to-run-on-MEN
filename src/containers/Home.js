import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col mdOffset={3} smOffset={3} xsOffset={3} md={10}>
        <div><h1>Hello, World!</h1></div>
        </Col>
      </Row>
    );
  }
}

export default Home;