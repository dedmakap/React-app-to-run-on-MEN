import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import { Button, Glyphicon, Panel } from 'react-bootstrap/lib/';
import PropTypes from 'prop-types';
import { user as userPropTypes } from '../proptypes';

const PostBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
`;

const ContentBlock = styled.div`
  margin: 5px;
`;

const LikeBlock = styled.div`
  width: 50px;
  margin: 5px;
`;

const PostHeader = styled.div`
  margin: 5px;
`;

const AuthorHeader = styled.div`
  font-weight: bold;
`;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:3500",
      counter: 1,
    };
  }


  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('addlike', likes => this.setState({ counter: likes }));
  }

  getPostingTime = () => {
    const postingTime = new Date(Date.parse(this.props.postingTime));
    return postingTime;
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('addlike', this.state.counter);

  };

  render() {
    return (
      <PostBlock>
        <Panel>
          <PostHeader>
            <AuthorHeader>
              {this.props.author.fullname}
            </AuthorHeader>
            {` ${this.getPostingTime()}`}
          </PostHeader>
          <ContentBlock>
            {this.props.content}
          </ContentBlock>
          {this.props.user.id && (
            <LikeBlock>
              <Button onClick={this.send}>
                <Glyphicon glyph="heart" />
                {` ${this.props.likes.length}`}
              </Button>
            </LikeBlock>
          )}
        </Panel>
      </PostBlock>
    );
  }
}

Post.propTypes = {
  user: userPropTypes,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    fullname: PropTypes.string,
  }).isRequired,
  likes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  postingTime: PropTypes.string.isRequired,

};

Post.defaultProps = {
  user: {},
};

export default Post;
