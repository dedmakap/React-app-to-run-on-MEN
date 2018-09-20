import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getUsersList } from '../api/user';
import 'react-input-range/lib/css/index.css';
import UsersTable from '../components/UserslistTable';
import SeacrhPanel from '../components/UserslistSearch';

const SearchContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
`;



const Wrapper = styled.div`
  margin: 0 50px;
`;

class Userslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameQuery: '',
      ageValue: {
        min: 0,
        max: 100,
      },
      current: 1,
      pages: 10,
      users: [],
      sortDirection: 'desc',
      sortTarget: 'role',
    };

    this.requestToServer = _.debounce(this.requestToServer, 500);
  }

  componentDidMount() {
    this.requestToServer();
  }

  onSearchAgeChange = (keys) => {
    console.log(keys);

    this.setState({ ageValue: keys });
    this.requestToServer();
  }

  onSearchNameChange = (keys) => {
    console.log(keys);

    this.setState({ nameQuery: keys });
    this.requestToServer();
  }

  onPageClick = (current) => {
    this.requestToServer(current);
  }

  onSortClick = (sorter) => {
    this.setState({
      sortDirection: sorter.direction,
      sortTarget: sorter.target,
    });
    this.requestToServer();
  }

  requestToServer = (newPage) => {
    this.setState({ loading: true });
    const query = {
      name: this.state.nameQuery,
      age: this.state.ageValue,
      page: newPage,
      sortDirection: this.state.sortDirection,
      sortTarget: this.state.sortTarget,
    };
    return getUsersList(query)
      .then((data) => {
        this.setState({
          ...data,
          loading: false,
        });
      });
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
            <SeacrhPanel
              nameQuery={this.state.nameQuery}
              onSearchAgeChange={this.onSearchAgeChange}
              onSearchNameChange={this.onSearchNameChange}
              ageValue={this.state.ageValue}
            />
          </SearchContainer>
          <UsersTable
            onClick={this.onPageClick}
            current={this.state.current}
            pages={this.state.pages}
            loading={this.state.loading}
            users={this.state.users}
            onSortClick={this.onSortClick}
            sortBy={this.state.sortTarget}
            sortDir={this.state.sortDirection}
          />
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
