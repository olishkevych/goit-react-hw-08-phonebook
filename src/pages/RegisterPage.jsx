import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUserThunk } from 'redux/operations';
import { selectLoggedIn, selectLoginError } from 'redux/selectors';

import { Button, Form, Input } from 'antd';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const error = useSelector(selectLoginError);

  const handleRegister = ({ name, email, password, retryPassword }) => {
    if (password !== retryPassword) {
      toast.error('Passwords do not match. Try again.');
      return;
    }
    dispatch(registerUserThunk({ name, password, email }));
    if (error) {
      toast.error(
        'This user is already registered. Try with different credentials.'
      );
    }
  };

  if (loggedIn) return <Navigate to="/contacts" />;

  return (
    <div classname={styles.formWrapper}>
      <Form
        onFinish={handleRegister}
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
        <h1>Create a new account</h1>
        <Form.Item
          className={styles.formItem}
          label="Username"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input type="text" className={styles.input} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
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
              message: 'Please input your passwrod!',
            },
          ]}
        >
          <Input type="password" className={styles.input} minLength={8} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Repeat Password"
          name="retryPassword"
          rules={[
            {
              required: true,
              message: 'Please input your passwrod!',
            },
          ]}
        >
          <Input type="password" className={styles.input} minLength={8} />
        </Form.Item>

        <div className={styles.registerWrapper}>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
          <div className={styles.register}>
            Already have an account? <a href="/login">Log in here.</a>{' '}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
