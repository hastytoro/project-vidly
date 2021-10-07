import React from 'react';

const Like = ({ liked, onLike }) => {
  let classes = `fa fa-heart${liked ? '' : '-o'}`;
  return (
    <i
      style={{ cursor: 'pointer' }}
      onClick={onLike}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
