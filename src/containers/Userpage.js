import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Table from 'react-bootstrap/lib/Table';
import PropTypes from 'prop-types';
import { getUserById, putUserField, postUserAvatar } from '../api/user';
import EditableCell from '../components/ProfileEditableCell';


// import Center from '../components/Centralizer';


class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {
        fullname: '',
        email: '',
        age: '',
        username: '',
        Role: {
          title: '',
        },
        avatar: '',
      },
      updatedField: '',
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (!this.props.guest || this.props.guest === undefined) {
        return this.props.history.push('/');
      }
    if (this.props.guest.id !== id && this.props.guest.role !== 'admin') {
      return this.props.history.push('/');
    }
    return getUserById(id)
      .then((data) => {
        this.setState({ loading: false, user: data });
      });
  }

  onFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    this.fileUpload(file)
      .then((data) => {
        console.log(data);
        this.setState({user: data});
      });
    
  }

  

  onMenuItemSelect = (key, e) => {
    const roleId = e.target.id;
    const id = this.props.match.params.id;
    let colId = 'role';
    if (e.target.text.toLowerCase() !== this.state.user.role.name) {
      return putUserField(id, colId, roleId)
        .then((data) => {
          this.setState({ user: data });
        });
    }
  }

  onInputClick = (colId) => {
    this.setState((prevState) => ({
      updatedField: prevState.user[colId]
    }));
  }

  onInputChange = (update) => {
    this.setState({ updatedField: update });
  }

  onInputBlur = (colId) => {
    const id = this.props.match.params.id;
    if (this.state.user[colId] !== this.state.updatedField.trim()) {
      return putUserField(id, colId, this.state.updatedField)
        .then((data) => {
          this.setState({ user: data });
        });
    }
  }
  
  fileUpload(file) {
    const formData = new FormData();
    const id = this.props.match.params.id;
    formData.append('file',file);
    return postUserAvatar(id, formData);
    
  }

  render() {
    const avaPath = this.state.user.avatar ? `http://localhost:3500/images/${this.state.user.avatar}` : "/avatarPlaceholder.png";

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <Grid>
          <Row>
            <h1>Your profile page</h1>
            <h2>
              Hello, 
              {' '}
              {this.state.user.fullname}
              {'!'}
            </h2>
          </Row>
          <Row>
            <Col xs={4} md={4}>
              <Thumbnail
                src={avaPath}
                alt='Your avatar'
              >
                <h3>Your avatar</h3>
                <form>
                  <FormGroup>
                    <HelpBlock>Upload new avatar</HelpBlock>
                    <FormControl
                      id="formControlsFile"
                      type="file"
                      onChange={this.onFileSelect}
                    />
                  </FormGroup>
                </form>
              </Thumbnail>
            </Col>
            <Col mdOffset={4}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Username</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <EditableCell
                        divValue={this.state.user.fullname}
                        colId="firstName"
                        onInputClick={this.onInputClick}
                        onInputChange={this.onInputChange}
                        onInputBlur={this.onInputBlur}
                        inputValue={this.state.updatedField}
                      />
                    </td>
                    <td>
                      <EditableCell
                        divValue={this.state.user.email}
                        colId="email"
                        onInputClick={this.onInputClick}
                        onInputChange={this.onInputChange}
                        onInputBlur={this.onInputBlur}
                        inputValue={this.state.updatedField}
                      />
                    </td>
                    <td>
                      <EditableCell
                        divValue={String(this.state.user.age)}
                        colId="age"
                        onInputClick={this.onInputClick}
                        onInputChange={this.onInputChange}
                        onInputBlur={this.onInputBlur}
                        inputValue={this.state.updatedField}
                      />
                    </td>
                    <td>
                      <EditableCell
                        divValue={this.state.user.username}
                        colId="userName"
                        onInputClick={this.onInputClick}
                        onInputChange={this.onInputChange}
                        onInputBlur={this.onInputBlur}
                        inputValue={this.state.updatedField}
                      />
                    </td>
                    <td>{this.state.user.Role.title}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col mdOffset={11}>
              {this.props.guest.role === 'admin' &&
                (
                  <DropdownButton
                    bsStyle='default'
                    title='Change role'
                    id='change-role-dropdown'
                  >
                    <MenuItem
                      id="1"
                      onSelect={this.onMenuItemSelect}
                    >
                      Admin
                    </MenuItem>
                    <MenuItem 
                      id="2"
                      onSelect={this.onMenuItemSelect}
                    >
                      User
                    </MenuItem>
                  </DropdownButton>
                )
              }
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

Userpage.propTypes = {
  guest: PropTypes.shape({
    fullname: PropTypes.string,
    role: PropTypes.string,
    token: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Userpage);
