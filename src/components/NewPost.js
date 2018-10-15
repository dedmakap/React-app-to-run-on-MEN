import React from 'react';
import {
  Panel,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Form
} from 'react-bootstrap/lib/';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
  padding: 10px;
`;

// class NewPost extends Component {

// }
function NewPost(props) {
  return (
    <Panel>
      <Wrapper>
        <Form onSubmit={props.postSubmit}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Something on your mind? (no more than 250 chars)</ControlLabel>
            <FormControl 
              componentClass="textarea" 
              placeholder="Your post" 
              maxLength={250}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </Wrapper>
    </Panel>
  );
}

NewPost.propTypes = {
  postSubmit: PropTypes.func.isRequired,
};

export default NewPost;
