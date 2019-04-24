import React from 'react';

export default (props) => {

  /**
    State & Context & Props
   */

  const { match: {params: {type}}} = props;

  /**
    Helper functions
   */

  /**
    Lifecycle
   */

  /**
    render
   */

  return (
    <h1>Exception: {type}</h1>
  );
}
