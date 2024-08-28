import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import axios from 'axios';

const GoogleSignUp = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '811616439063-dtskl32vubr14hkipt3m9egffqt4u060.apps.googleusercontent.com',
        redirect_uri: 'http://localhost:8000/social_auth/google/',
        response_type: 'token',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const responseGoogle = async (response) => {
    const { tokenId } = response;
    try {
      if (!tokenId) {
        throw new Error('Google sign in failed: Invalid token');
      }
      const authToken = tokenId.toString();
      const res = await axios.post('http://localhost:8000/social_auth/google/', { auth_token: authToken });
      console.log(res.data.token);
    } catch (error) {
      if (error.response) {
        console.error('Request failed with status code:', error.response.status);
        console.error('Error data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const onFailureGoogle = (error) => {
    if (error.error === 'popup_closed_by_user') {
      console.log('Google sign in canceled by user.');
    } else {
      console.log('Google sign in failed:', error);
    }
  };

  return (
    <GoogleLogin
      clientId='811616439063-dtskl32vubr14hkipt3m9egffqt4u060.apps.googleusercontent.com'
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={onFailureGoogle}
      cookiePolicy={'single_host_origin'}
      scope='https://www.googleapis.com/auth/drive.metadata.readonly'
    />
  );
};

export default GoogleSignUp;