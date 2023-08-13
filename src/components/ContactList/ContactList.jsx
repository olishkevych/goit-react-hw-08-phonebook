import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContactToEdit,
  selectContacts,
  selectError,
  selectFilter,
} from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations.js';
import EditContactModal from 'components/EditContactModal/EditContactModal';
import { openEditModal } from 'redux/reducers/contactsSlice';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectContacts);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const contactToEdit = useSelector(selectContactToEdit);

  const [ascSort, setAscSort] = useState(false);
  const [descSort, setDescSort] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleRemoveContact = id => {
    dispatch(deleteContact(id));
  };

  const handleEditContact = contact => {
    dispatch(openEditModal(contact));
  };

  const handleAscSort = () => {
    setAscSort(!ascSort);
    setDescSort(false);
  };
  const handleDescSort = () => {
    setDescSort(!descSort);
    setAscSort(false);
  };

  const filteredContacts = () => {
    if (filter.length > 0) {
      return items.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return items;
    }
  };

  const filtered = () => {
    if (ascSort) {
      return [...filteredContacts()].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (descSort) {
      return [...filteredContacts()].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else {
      return filteredContacts();
    }
  };

  return (
    <div>
      <div className={styles.sortWrap}>
        <h4>Sort</h4>
        <Button
          shape="circle"
          type="secondary"
          className={ascSort ? styles.activeBtn : styles.sortBtn}
          onClick={() => handleAscSort()}
        >
          A-Z
        </Button>
        <Button
          shape="circle"
          type="secondary"
          className={descSort ? styles.activeBtn : styles.sortBtn}
          onClick={() => handleDescSort()}
        >
          Z-A
        </Button>
      </div>
      <ul>
        {error && <p className={styles.warning}>{error}</p>}
        {filtered().length === 0 && !error && !filter && (
          <p className={styles.warning}>No contacts in your Phonebook yet...</p>
        )}
        {filtered().length === 0 && !error && filter && (
          <p className={styles.warning}>No contacts found...</p>
        )}
        {filtered().map(contact => {
          return (
            <li className={styles.item} key={contact.id}>
              <span className={styles.name}>{contact.name} </span>
              <a href={`tel:${contact.number}`} className={styles.phone}>
                {contact.number}
              </a>
              <div className={styles.buttonWrap}>
                <Button
                  shape="circle"
                  type="secondary"
                  className={styles.removeBtn}
                  onClick={() => handleEditContact(contact)}
                >
                  <EditOutlined />
                </Button>
                <Button
                  shape="circle"
                  type="secondary"
                  className={styles.removeBtn}
                  onClick={() => handleRemoveContact(contact.id)}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </li>
          );
        })}
        {contactToEdit && <EditContactModal contact={contactToEdit} />}
      </ul>
    </div>
  );
};
