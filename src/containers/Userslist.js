import React, { Component } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/lib/Button';
// import Form from 'react-bootstrap/lib/Form'
// import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl';
// import Col from 'react-bootstrap/lib/Col'
// import ControlLabel from 'react-bootstrap/lib/ControlLabel'
// import Center from '../components/Centralizer';
// import HelpBlock from 'react-bootstrap/lib/HelpBlock'
// import * as userApi from '../api/user';
import { withRouter, Redirect } from 'react-router-dom';
import Table from 'react-bootstrap/lib/Table';
// import Select from 'react-bootstrap/lib/DropdownButton';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const SearchContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
`;

const StyledInputRange = styled.div`
  width: 750px;
  margin-left: 15px;
  && .input-range__label {
    font-size: 15px;
    margin: -5px;
  }
`;

const Wrapper = styled.div`
  margin: 0 50px;
`;

class Userslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageValue: {
        min: 0,
        max: 100,
      },
    };
  }


  renderOptions = (options) => {
    const components = options.map((option) => (
      <option key={option}>{option}</option>
    ));
    return components;
  }



  render() {
    if (!this.props.user || this.props.user === undefined) {
      return <Redirect to="/" />;
    }


    return (
      <React.Fragment>
        <Wrapper>
          <h1>Users list</h1>
          <SearchContainer>
            <form>
              <FormControl
                id="formControlsText"
                type="text"
                label="Text"
                placeholder="Enter text"
              />
            </form>
            <StyledInputRange>
              <InputRange
                minValue={0}
                maxValue={100}
                value={this.state.ageValue}
                onChange={value => this.setState( {ageValue: value} )} 
              
              />
            </StyledInputRange>
          </SearchContainer>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr />
            </tbody>
          </Table>
        </Wrapper>
      </React.Fragment>
    );
  }
}

Userslist.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string,
    role: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};



export default withRouter(Userslist);
