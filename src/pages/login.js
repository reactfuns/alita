import React, {Fragment, useContext, useEffect} from 'react';
import { Button, Toast } from 'antd-mobile';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import InputField from '../components/InputField';

import { browserInfo } from '../lib/runtime';
import ShopContext from '../context/shop';

const fnCrypto = require('crypto');

const LoginPage = (props) => {

  /**
    State & Context & Props
   */

  const { values, errors, touched, isSubmitting, setSubmitting, resetForm } = props;  // from Formik
  const shopContext = useContext(ShopContext);

  /**
    Helper functions
   */

  const toLogin = async (payload = null) => {
    setSubmitting(true);
    const result = await shopContext.login(payload);
    if (result instanceof Error) Toast.fail(result.message);
    setSubmitting(false);
    resetForm();
  }

  const toLoginWithCredential = () => {
    toLogin({
      credential: values.credential, 
      password  : fnCrypto.createHash('md5').update(values.password).digest('hex')
    });
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('LoginPage::useEffect: ', {shopContext, browserInfo});
    if (browserInfo.name === 'Wechat') { toLogin(); }
  }, [shopContext.user]);

  /**
    render
   */

  if (browserInfo.name === 'Wechat') {
    return <p>获取微信用户授权...</p>
  }
  return (
    <Fragment>
      {/* <div>[{browserInfo.name}][{browserInfo.type}][{browserInfo.ua}]</div> */}
      <Field type='text'     name='credential'  placeholder="credential"  label='登陆账号' component={InputField} style={{'text-align': 'right'}} ></Field>
      <Field type='password' name='password'    placeholder="password"    label='账号密码' component={InputField} style={{'text-align': 'right'}} ></Field>
      <Button disabled={(_.isEmpty(touched)) || (!_.isEmpty(errors)) || isSubmitting} style={{marginTop:20}} type="primary" onClick={toLoginWithCredential}>登录</Button>
    </Fragment>
  );
}

export default withFormik({
    mapPropsToValues({ credential, password }) {
      return {
        credential   : credential || '',
        password     : password   || '',
      }
    },
    validationSchema: Yup.object().shape({
      credential: Yup.string().required('请输入账号'),
      password  : Yup.string().required('请输入密码')
    }),
})(LoginPage);
