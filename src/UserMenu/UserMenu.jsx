import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logoutUserThunk } from 'redux/operations';
import { selectLoggedIn, selectUserEmail } from 'redux/selectors';

import styles from './UserMenu.module.css';
import { Button } from 'antd';

const UserMenu = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const userEmail = useSelector(selectUserEmail);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  if (!loggedIn) return <Navigate to="/" />;

  return (
    <div className={styles.wrapper}>
      <p className={styles.account}>{userEmail}</p>
      <Button ghost onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default UserMenu;
