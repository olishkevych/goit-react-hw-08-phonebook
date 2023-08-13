import { Routes, Route, NavLink } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import styles from './App.module.css';
import styled from 'styled-components';

import { Loader } from './Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectLoggedIn,
  selectToken,
  selectUserLoading,
} from 'redux/selectors';
import { refreshUserThunk } from 'redux/operations';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import UserMenu from './UserMenu/UserMenu';

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));

const StyledNavLink = styled(NavLink)`
  color: #e7eaf6;

  &.active {
    color: #8ecdeb;
  }
`;

export const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);
  const isUserLoading = useSelector(selectUserLoading);

  useEffect(() => {
    if (!token || loggedIn) return;
    dispatch(refreshUserThunk());
  }, [dispatch, token, loggedIn]);

  return (
    <div className={styles.wrapper}>
      <header>
        <nav className={styles.navbar}>
          <StyledNavLink to="/" className={styles.navLink}>
            Home
          </StyledNavLink>
          {loggedIn ? (
            <>
              <StyledNavLink to="/contacts" className={styles.navLink}>
                Contacts
              </StyledNavLink>
              <UserMenu className={styles.userMenu}></UserMenu>
            </>
          ) : (
            <div className={styles.loginWrapper}>
              <StyledNavLink to="/register" className={styles.navLogin}>
                Sign up
              </StyledNavLink>
              <StyledNavLink to="/login" className={styles.navLogin}>
                Log in
              </StyledNavLink>
            </div>
          )}
        </nav>
      </header>

      <main>
        {isLoading && <Loader />}
        {isUserLoading && <Loader />}

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <ContactsPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};