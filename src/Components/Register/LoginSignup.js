import React, { useEffect, useState } from 'react';
import registerStyle from "./Register.module.css";
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const LoginSignup = (props) => {
  const [state, setState] = useState("Login");

  useEffect(() => {
    document.body.classList.add(registerStyle['no-scroll']);
    return () => {
      document.body.classList.remove(registerStyle['no-scroll']);
    };
  }, []);

  useEffect(() => {
    // Load Google Sign-In library
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '99792771550-83uho0lrn49rl2ulga2ta9hvk2v92cll.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large' }
        );
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    const id_token = response.credential;
    console.log('ID Token:', id_token);

    // Handle sign-in (send ID token to your backend, etc.)
  };

  return (
    <div className={registerStyle['login-popup']}>
      <form className={registerStyle['login-form']}>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', delay: 0.2, damping: 10, stiffness: 120 }}
          className={registerStyle['login-title']}
        >
          <h2>{state}</h2>
          <img onClick={() => props.onClose()} src={assets.cross_icon} alt='cross' />
        </motion.div>

        <div className={registerStyle['login-inputs']}>
          {state !== 'Login' && <input type='text' placeholder='Your name' required />}
          <input type='email' placeholder='Your email' required />
          <input type='password' placeholder='Password' required />
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 0.3, damping: 10, stiffness: 120 }}
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </motion.button>

        <div className={registerStyle['login-condition']}>
          <input type='checkbox' required />
          <p>I agree terms and conditions</p>
        </div>

        {state === 'Login' ?
          <p>Create an account <span onClick={() => setState('Signup')}>Click here</span></p> :
          <p>Already have an account? <span onClick={() => setState('Login')}>Login</span></p>
        }

        {/* Google Sign-In Button */}
        <div id="google-signin-button"></div>
      </form>
    </div>
  );
}

export default LoginSignup;
