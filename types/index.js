import PropTypes from "prop-types";

const { shape, number, string, array, object } = PropTypes;

export const commentType = shape({
  id: string,
  username: string.isRequired,
  description: string.isRequired,
  createdAt: string.isRequired,
  issueId: string,
});
