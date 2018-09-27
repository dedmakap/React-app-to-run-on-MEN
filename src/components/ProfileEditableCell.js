import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import PropTypes from 'prop-types';


class EditableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
    };
  }

  onInputBlur = () => {
    this.setState({editable:false});
    this.props.onInputBlur(this.props.colId);
  }

  onInputChange = (e) => {
    const input = e.target.value;
    this.props.onInputChange(input);
    
  }

  onClick = (e) => {
    const id = e.target.id;
    this.props.onInputClick(id);
    this.setState({editable:true});
  }


  render() {
    if (this.state.editable) {
      return (
        <FormControl
          autoFocus
          id={this.props.colId}
          type="text"
          value={this.props.inputValue}
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
        />
      );
    }
    return (
      <div 
        id={this.props.colId}
        onClick={this.onClick}
      >
        {this.props.divValue}
      </div>
    );
  }

}

EditableCell.propTypes = {
  divValue: PropTypes.string.isRequired,
  colId: PropTypes.string.isRequired,
  onInputClick: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  
};



export default EditableCell;
