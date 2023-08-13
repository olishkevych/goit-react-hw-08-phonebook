import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editContact } from 'redux/operations';
import { closeEditModal } from 'redux/reducers/contactsSlice';

import { Button, Form, Input } from 'antd';
import styles from './EditContactModal.module.css';

const EditContactModal = ({ contact }) => {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const dispatch = useDispatch();
  const id = contact.id;

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        dispatch(closeEditModal());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const applyContactEdit = () => {
    dispatch(editContact({ id, name, number }));
  };

  const cancelContactEdit = () => {
    dispatch(closeEditModal());
  };

  return (
    <div className={styles.backdrop} onClick={cancelContactEdit}>
      <Form className={styles.form} onFinish={applyContactEdit}>
        <h1>Edit contact</h1>
        <Form.Item label="Name">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />{' '}
        </Form.Item>
        <Form.Item label="Number">
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Form.Item>
        <div className={styles.buttonWrap}>
          {' '}
          <Button
            className={styles.cancelBtn}
            htmlType="button"
            type="secondary"
            onClick={cancelContactEdit}
          >
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

EditContactModal.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditContactModal;
