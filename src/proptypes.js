import PropTypes from 'prop-types';

export const user = PropTypes.shape({
  fullname: PropTypes.string,
  role: PropTypes.string,
  token: PropTypes.string,
})