import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserThunk } from 'redux/operations';
import { selectLoggedIn, selectLoginError } from 'redux/selectors';

import { Button, Form, Input } from 'antd';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const error = useSelector(selectLoginError);

  const handleLogin = values => {
    dispatch(loginUserThunk(values));
    if (error) {
      toast.error(`We could not find any account with these credentials`);
    }
  };

  if (loggedIn) return <Navigate to="/contacts" />;

  return (
    <div className={styles.formWrapper}>
      <Form
        onFinish={handleLogin}
        name="basic"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        className={styles.form}
      >
        <h1>Log in</h1>
        <Form.Item
          className={styles.formItem}
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input type="email" className={styles.input} />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password className={styles.input} minLength={8} />
        </Form.Item>
        <div className={styles.registerWrapper}>
          <Button htmlType="submit" type="primary">
            Log in
          </Button>
          <div className={styles.register}>
            Don't have an account? <a href="/register">Register here.</a>{' '}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
