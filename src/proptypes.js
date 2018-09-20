import PropTypes from 'prop-types';

export const user = PropTypes.shape({
  fullname: PropTypes.string,
  role: PropTypes.string,
  token: PropTypes.string,
});

export const userFull = PropTypes.shape({
  _id: PropTypes.string,
  firstName: PropTypes.string,
  email: PropTypes.string,
  age: PropTypes.number,
  userName: PropTypes.string,
  role: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
});
