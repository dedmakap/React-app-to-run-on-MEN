import React, { Component } from 'react';
import styled from 'styled-components';
import { Panel } from 'react-bootstrap/lib/';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
import { getHomePage, postNewPost, putLike, getFeed } from '../api/user';
import Post from '../components/Post';
import NewPost from '../components/NewPost';
import { user as userPropTypes } from '../proptypes';

const StyledFeed = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
`;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      socket: socketIOClient("http://localhost:3500"),
    };
  }

  componentDidMount() {
    if (this.props.oneAuthor) {
      return getFeed(this.props.authorID)
        .then(data => {
          this.setState({posts: data});
        });
    }
    return getHomePage()
      .then(data => {
        this.setState({ posts: data });
      });
  }

  postSubmit = (e) => {
    e.preventDefault();
    const textWindow = document.getElementById('formControlsTextarea');
    const postContent = textWindow.value;
    if (!postContent) return;
    const author = this.props.user;
    const newPost = {postContent, author};
    postNewPost(newPost)
      .then(data => {
        this.setState({ posts: data });
        textWindow.value = '';
      });
  }

  postPutLike = (postID, userID) => {
    console.log(postID, userID);
    return putLike(postID, userID)
      .then(data => {
        this.state.socket.emit('addlike', data.length, postID);
        return data.length;
      });
  }


  render() {
    return (
      <StyledFeed>
        <Panel>
          {this.state.posts.map(post => {
            return (
              <Post
                key={post.id}
                postID={post.id}
                content={post.content}
                author={post.User}
                likes={post.Likes}
                postingTime={post.createdAt}
                user={this.props.user}
                postPutLike={this.postPutLike}
                socket={this.state.socket}
              />
            );
          })}
        </Panel>
        {
          this.props.user.id && (
            <NewPost
              postSubmit={this.postSubmit}
            />
          )}
      </StyledFeed>
    );
  }
}

Feed.propTypes = {
  user: userPropTypes,
  oneAuthor: PropTypes.bool,
  authorID: PropTypes.number,

};

Feed.defaultProps = {
  user: {},
  oneAuthor: false,
  authorID: null,
};

export default withRouter(Feed);
