import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

import { Button, Form, Input } from 'antd';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const onInputChange = event => {
    event.target.name === 'number'
      ? setNumber(event.target.value)
      : setName(event.target.value);
  };

  const onSubmit = values => {
    const isExisting = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExisting) {
      alert(`${isExisting.name} is already in contacts`);
      return;
    }
    const contactToAdd = {
      name,
      number,
    };

    setName('');
    setNumber('');
    dispatch(addContact(contactToAdd));
    console.log(form);
    form.resetFields(form.basic);
  };

  return (
    <div className={styles.wrapper}>
      <Form
        labelAlign="left"
        form={form}
        onFinish={onSubmit}
        name="basic"
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        className={styles.form}
      >
        <h2>Add a new contact</h2>
        <Form.Item
          className={styles.formItem}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please fill in the field!',
            },
          ]}
        >
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onInputChange}
            placeholder="Enter contact name..."
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Phone"
          name="number"
          rules={[
            {
              required: true,
              message: 'Please fill in the field!',
            },
          ]}
        >
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={onInputChange}
            placeholder="Enter phone number..."
            className={styles.input}
          />
        </Form.Item>

        <Button htmlType="submit" type="primary" className={styles.addButton}>
          Add contact
        </Button>
      </Form>
    </div>
  );
}
