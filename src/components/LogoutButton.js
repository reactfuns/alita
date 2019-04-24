import React, {useContext} from 'react';
import { Button } from 'antd-mobile';

import ShopContext from '../context/shop';
import { ACTION_SET } from '../context/shop.reducer';

import { removeKey } from '../lib/persistance';

export default (props) => {
  const shopContext = useContext(ShopContext);

  return (
    <Button {...props} onClick={() => {
      shopContext.dispatch({
        type: ACTION_SET,
        payload: { user: null }
      });
      removeKey('current_user');
    }
    } >Logout</Button>
  )
}
