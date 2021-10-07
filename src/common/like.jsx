import React from 'react';

const Like = (props) => {
  let classes = `fa fa-heart${props.liked ? '' : '-o'}`;
  return (
    <i
      style={{ cursor: 'pointer' }}
      onClick={props.onLikeClick}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
