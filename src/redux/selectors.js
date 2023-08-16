export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectContactToEdit = state => state.contacts.contactToEdit;
export const selectFilter = state => state.filter;
export const selectLoggedIn = state => state.user.loggedIn;
export const selectToken = state => state.user.token;
export const selectLoginError = state => state.user.error;
export const selectUserEmail = state => state.user.userData.email;
export const selectUserLoading = state => state.user.isLoading;
