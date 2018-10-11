import {Col, Row}  from 'react-bootstrap/lib/';
import React from 'react';
import { user as userPropTypes } from '../proptypes';
import PostsFeed from './PostsFeed';



function Home(props) {
    return (
      <Row>
        <Col mdOffset={3} smOffset={3} xsOffset={3} md={10}>
          <div>
            <h1>
              Hello,
              {' '}
              {props.user.fullname}
            </h1>
            <h2>Posts feed</h2>
            <PostsFeed user={props.user} />
          </div>
        </Col>
      </Row>
    );
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
