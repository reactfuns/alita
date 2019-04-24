import React, {Fragment} from 'react';

const C1 = (props) => {
  return (
    <p>{props.title}</p>
  )
}

export default (props) => (
  <Fragment>
    {/* <p><a href='javacript:void(0);' onClick={() => props.history.push(config.LOCAL_URL.LOGIN_OAUTH)}>Login OAuth</a></p> */}
    <p>This is Home Page</p>
    <C1 title='hi world' />
  </Fragment>
)
 