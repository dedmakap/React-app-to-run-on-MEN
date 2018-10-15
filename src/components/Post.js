import React, { Component } from 'react';
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
      likesCount: this.props.likes.length,
    };
  }


  componentDidMount() {
    this.props.socket.on('addlike', (likes, postID) => {
      if (postID === this.props.postID) {
      this.setState({ likesCount: likes });
    }
    });
    
  }

  componentDidUpdate() {
  }

  getPostingTime = () => {
    const postingTime = new Date(Date.parse(this.props.postingTime));
    return postingTime;
  }

  likeClick = () => {
   console.log(this.props);
   const { postID } = this.props;
   const userID = this.props.user.id;
   this.props.postPutLike(postID, userID)
    .then(newLikesCount => {
      console.log(newLikesCount);
      return this.setState({likesCount: newLikesCount});
    });
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
              <Button onClick={this.likeClick}>
                <Glyphicon glyph="heart" />
                {` ${this.state.likesCount}`}
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
  postID: PropTypes.number.isRequired,
  postPutLike: PropTypes.func.isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func,
  }).isRequired,
};

Post.defaultProps = {
  user: {},
};

export default Post;
