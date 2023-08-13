import { $instance } from './auth-api';

export async function fetchAll() {
  const response = await $instance.get('/contacts');
  return response.data;
}

export async function addNewContact(contactToAdd) {
  const response = await $instance.post(`/contacts`, contactToAdd);
  return response.data;
}

export async function deleteOneContact(contactId) {
  const response = await $instance.delete(`/contacts/${contactId}`);
  return response.data;
}

export async function editSelectedContact(contact) {
  const response = await $instance.patch(`/contacts/${contact.id}`, {
    name: contact.name,
    number: contact.number,
  });
  return response.data;
}
