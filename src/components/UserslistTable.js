import React, { Component } from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';
import Table from 'react-bootstrap/lib/Table';
import PropTypes from 'prop-types';
import PaginationItem from 'react-bootstrap/lib/PaginationItem';
import { Link, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components';
import { userFull as userPropTypes } from '../proptypes';

const StyledTableHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class UsersTable extends Component {
  constructor(props) {
    super(props);

  }
  
  

  createTable = () => {
    const { users } = this.props;
    if (!users) return null;
    return users.map((user) => (
      <tr key={user._id}>
        <td><Link to={`users/userpage/${user._id}`}>{user._id}</Link></td>
        <td>{user.firstName}</td>
        <td>{user.email}</td>
        <td>{user.age}</td>
        <td>{user.userName}</td>
        <td>{user.role.name}</td>
      </tr>
    )
    );
  }

  onPageClick = (e,symbol) => {
    e.preventDefault();
    let current = null;
    if (!symbol) {
      const key = Number(e.target.text);
      current = key;
    }
    if (symbol === 'next') {
      current = this.props.current + 1;
    }
    if (symbol === 'prev') {
      current = this.props.current - 1;
    }
    if (symbol === 'first') {
      current = 1;
    }
    if (symbol === 'last') {
      current = this.props.pages;
    }
    this.props.onClick(current);
    
  }

  onSorterClick = (e) => {
    e.preventDefault();
    const sorter = {};
    sorter.direction = e.target.dataset.dir;
    sorter.target = e.target.id;
    return this.props.onSortClick(sorter);
    
  }

  createPagination = (current, pages, size) => {
    let childrenPages = [];
    const disabled = this.props.loading;
    //pages lesser then size case
    if (pages < size) {
      for (let i = 1; i < pages + 1; i++) {
        if (i === current) {                  //check if page is current
          childrenPages.push(
            <Pagination.Item active key="active">
              {i}
            </Pagination.Item>
          );
        }
        else {
          childrenPages.push(
            <Pagination.Item 
              key={i} 
              disabled={disabled}
              onClick={this.onPageClick}
            >
              {i}
            </Pagination.Item>
          );
        }
      }
      return childrenPages;
    }
    //first [size] pages
    if (current < size - 1) {
      for (let i = 1; i < size; i++) {
        if (i === current) {
          childrenPages.push(
            <Pagination.Item active key="active">
              {i}
            </Pagination.Item>);
        }
        else {
          childrenPages.push(
            <Pagination.Item 
              key={i} 
              disabled={disabled}
              onClick={this.onPageClick}
            >
              {i}
            </Pagination.Item>);
        }
      }
      childrenPages.push(
        <PaginationItem
          key={size} 
          onClick={this.onPageClick} 
          disabled={disabled}
        >
          {size}
        </PaginationItem>);
      //check if we need next and last buttons
      if (pages > size) {
        childrenPages.push(
          <Pagination.Next
            key="next"
            onClick={(ev) => this.onPageClick(ev, 'next')}
            disabled={disabled}
          />,
          <Pagination.Last
            key="last"
            onClick={(ev) => this.onPageClick(ev, 'last')}
            disabled={disabled}
          />
        );
      }
      return (childrenPages);
    }
    //last [size] pages
    if (current > (pages - size + 2)) {
      childrenPages.push(
        <Pagination.First 
          key="first" 
          disabled={disabled}
          onClick={(ev) => this.onPageClick(ev, 'first')}
        />,
        <Pagination.Prev
          key="prev" 
          disabled={disabled}
          onClick={(ev) => this.onPageClick(ev, 'prev')} 
        />,
      );
      for (let i = current - 2; i < pages + 1; i++) {
        if (i === current) {
          childrenPages.push(
            <Pagination.Item active key="active">
              {i}
            </Pagination.Item>
          );
        }
        else {
          childrenPages.push(
            <Pagination.Item 
              key={i} 
              disabled={disabled}
              onClick={this.onPageClick}
            >
              {i}
            </Pagination.Item>
          );
        }
      }
      return (childrenPages);
    }
    //other cases (regular in-the-middle pagination)
    childrenPages.push(
      <Pagination.First 
        key="first" 
        disabled={disabled}
        onClick={(ev) => this.onPageClick(ev, 'first')} 
      />,
      <Pagination.Prev 
        key="prev" 
        disabled={disabled}
        onClick={(ev) => this.onPageClick(ev, 'prev')} 
      />,
    );
    for (let i = current - (size - 3); i < current + size - 2; i++) {
      if (i === current) {
        childrenPages.push(
          <Pagination.Item active key="active">
            {i}
          </Pagination.Item>);
      }
      else {
        childrenPages.push(
          <Pagination.Item 
            key={i} 
            disabled={disabled}
            onClick={this.onPageClick}
          >
            {i}
          </Pagination.Item>);
      }
    }
    childrenPages.push(
      <Pagination.Next 
        key="next" 
        disabled={disabled}
        onClick={(ev) => this.onPageClick(ev, 'next')} 
      />, 
      <Pagination.Last 
        key="last" 
        disabled={disabled}
        onClick={(ev) => this.onPageClick(ev, 'last')} 
      />
    );
    return (childrenPages);
  }

  render() {
    const sortBy = this.props.sortBy;
    const sortDir = this.props.sortDir;
    const downArrow = String.fromCodePoint(0x25BC);
    const upArrow = String.fromCodePoint(0x25B2);
    return (
      <React.Fragment>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>
                <StyledTableHead>
                  id
                  <Button
                    id="_id"
                    data-dir={sortBy === '_id' && sortDir === 'asc' ? 
                    'desc' : 'asc'
                    }
                    onClick={this.onSorterClick}
                  >
                    {sortBy === '_id' && sortDir === 'asc' ? 
                      upArrow : downArrow  
                    }
                  </Button>
                </StyledTableHead>
              </th>
              <th>
                <StyledTableHead>
                  Full name
                  <Button
                    id="firstName"
                    data-dir={sortBy === 'firstName' && sortDir === 'asc' ? 
                    'desc' : 'asc'
                    }
                    onClick={this.onSorterClick}
                  >
                    {sortBy === 'firstName' && sortDir === 'asc' ? 
                      upArrow : downArrow  
                    }
                  </Button>
                </StyledTableHead>
              </th>
              <th>
                <StyledTableHead>
                  Email
                  <Button
                    id="email"
                    data-dir={sortBy === 'email' && sortDir === 'asc' ? 
                    'desc' : 'asc'
                    }
                    onClick={this.onSorterClick}
                  >
                    {sortBy === 'email' && sortDir === 'asc' ? 
                      upArrow : downArrow  
                    }
                  </Button>
                </StyledTableHead>
              </th>
              <th>
                <StyledTableHead>
                  Age
                  <Button
                    id="age"
                    data-dir={sortBy === 'age' && sortDir === 'asc' ? 
                    'desc' : 'asc'
                    }
                    onClick={this.onSorterClick}
                  >
                    {sortBy === 'age' && sortDir === 'asc' ? 
                      upArrow : downArrow  
                    }
                  </Button>
                </StyledTableHead>
              </th>
              <th>
                <StyledTableHead>
                  Username
                  <Button
                    id="userName"
                    data-dir={sortBy === 'userName' && sortDir === 'asc' ? 
                    'desc' : 'asc'
                    }
                    onClick={this.onSorterClick}
                  >
                    {sortBy === 'userName' && sortDir === 'asc' ? 
                      upArrow : downArrow  
                    }
                  </Button>
                </StyledTableHead>
              </th>
              <th>
                <StyledTableHead>
                  Role
                  <Button
                    id="role"
                    data-dir={sortBy === 'role' && sortDir === 'asc' ? 
                    'desc' : 'asc'
                    }
                    onClick={this.onSorterClick}
                  >
                    {sortBy === 'role' && sortDir === 'asc' ? 
                      upArrow : downArrow  
                    }
                  </Button>
                </StyledTableHead>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.createTable()}
          </tbody>
        </Table>
        <Pagination>
          {this.createPagination(this.props.current, this.props.pages, 5)}
        </Pagination>
      </React.Fragment>
    );
  }
}
UsersTable.propTypes = {
  current: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onSortClick: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(userPropTypes).isRequired,
  sortBy: PropTypes.string,
  sortDir: PropTypes.string,

};

UsersTable.defaultProps = {
  loading: true,
  sortBy: 'role',
  sortDir: 'desc',

};

export default withRouter(UsersTable);
