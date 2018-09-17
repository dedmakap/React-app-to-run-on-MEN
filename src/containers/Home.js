import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import React from 'react';
import { user as userPropTypes } from '../proptypes';



const Home = (props) => {
  return (
    <Row>
      <Col mdOffset={3} smOffset={3} xsOffset={3} md={10}>
        <div>
          <h1>
            Hello,
            {' '}
            {props.user.fullname}
          </h1>
        </div>
      </Col>
    </Row>
  );
};

Home.propTypes = {
  user: userPropTypes,
};

Home.defaultProps = {
  user: {
    fullname: 'World!',
  }
};

export default Home;
