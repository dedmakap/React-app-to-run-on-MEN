import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import styled from 'styled-components';

const StyledInputRange = styled.div`
  width: 750px;
  margin-left: 15px;
  && .input-range__label {
    font-size: 15px;
    margin: -5px;
  }
`;

class SearchPanel extends Component {
  constructor(props) {
    super(props);
  }

  onInputChange = (e) => {
    console.log();
    e.preventDefault();
    let value = e.target.value;
    this.props.onSearchNameChange(value);
  }

  onAgeRangeChange = (value) => {
    this.props.onSearchAgeChange(value);
  }

  render() {

    return (
      <React.Fragment>
        <form>
          <FormControl
            id="nameQuery"
            type="text"
            placeholder="Enter text"
            value={this.props.nameQuery}
            onChange={this.onInputChange}
          />
        </form>
        <StyledInputRange>
          <InputRange
            id="ageRange"
            minValue={0}
            maxValue={100}
            value={this.props.ageValue}
            onChange={this.onAgeRangeChange}
          />
        </StyledInputRange>
      </React.Fragment>
    );
  }
}

SearchPanel.propTypes = {
  nameQuery: PropTypes.string.isRequired,
  onSearchNameChange: PropTypes.func.isRequired,
  onSearchAgeChange: PropTypes.func.isRequired,
  ageValue: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired,
};

export default SearchPanel;
