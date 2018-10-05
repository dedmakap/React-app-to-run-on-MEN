import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import React from 'react';

function Center(props) {
  return (
    <Row>
      <Col mdOffset={4} smOffset={4} xsOffset={4}>
        {props.children}
      </Col>
    </Row>
  );
}


export default Center;
