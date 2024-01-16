import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import styles from './Login.module.css'
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useApiCall from "../../common/useApiCall";

function Login() {
  const history = useHistory()
  const {loading, fetchData} = useApiCall()

  return (
    <div className={styles.login}>
      <h1>Online Document viewer</h1>

    <GoogleLogin
  onSuccess={async (credentialResponse) => {
    const res = await fetchData({
      method: 'post',
      path: '/login',
      data: {
        credential: credentialResponse.credential
      }
    });
    localStorage.setItem('token', res.data.data.webToken)
    localStorage.setItem('userData', JSON.stringify(res.data.data.userData))

    history.push('/documents/home')
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
</div>
  );
}

export default Login;
