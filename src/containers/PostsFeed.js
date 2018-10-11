import React, { Component } from 'react';
import styled from 'styled-components';
import { Panel } from 'react-bootstrap/lib/';
import { getHomePage } from '../api/user';
import Post from '../components/Post';
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
    };
  }

  componentDidMount() {
    getHomePage()
      .then(data => {
        this.setState({ posts: data });
        console.log(this.state.posts);
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
                content={post.content}
                author={post.User}
                likes={post.Likes}
                postingTime={post.createdAt}
                user={this.props.user}
              />
            );
          })}
        </Panel>
      </StyledFeed>
    );
  }
}

Feed.propTypes = {
  user: userPropTypes,
};

Feed.defaultProps = {
  user: {},
};

export default Feed;
