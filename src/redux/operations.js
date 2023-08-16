import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsAPI from '../services/contacts-api';
import * as userAPI from '../services/auth-api';

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const user = await userAPI.register(userData);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const user = await userAPI.login(userData);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const user = await userAPI.logout();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    if (!token) {
      return thunkAPI.rejectWithValue(null);
    }

    try {
      userAPI.setToken(token);
      const user = await userAPI.refresh();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await contactsAPI.fetchAll();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactToAdd, thunkAPI) => {
    try {
      console.log(contactToAdd);
      const contacts = await contactsAPI.addNewContact(contactToAdd);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const contacts = await contactsAPI.deleteOneContact(contactId);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, thunkAPI) => {
    try {
      const contacts = await contactsAPI.editSelectedContact(contact);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
