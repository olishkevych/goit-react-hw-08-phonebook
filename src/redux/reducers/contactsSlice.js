import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from '../operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    contactToEdit: null,
  },
  reducers: {
    openEditModal(state, action) {
      state.contactToEdit = action.payload;
    },
    closeEditModal(state) {
      state.contactToEdit = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(addContact.pending, handlePending)
      .addCase(deleteContact.pending, handlePending)
      .addCase(editContact.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(addContact.rejected, handleRejected)
      .addCase(editContact.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contactToEdit = null;
        const editedContact = state.items.find(
          item => item.id === action.payload.id
        );
        editedContact.name = action.payload.name;
        editedContact.number = action.payload.number;
      });
  },
});

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSliceReducer = contactsSlice.reducer;
export const { openEditModal, closeEditModal } = contactsSlice.actions;
