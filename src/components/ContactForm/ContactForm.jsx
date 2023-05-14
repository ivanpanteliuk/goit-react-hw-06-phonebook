import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Input, Button, Form, Label } from './ContactForm.styled';

function ContactForm(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const telInputId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const resetInput = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    props.onSubmit({ id: nanoid(), name, number });

    resetInput();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>Name</Label>
      <Input
        id={nameInputId}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        autoComplete="off"
        onChange={handleChange}
      />
      <Label htmlFor={telInputId}>Number</Label>
      <Input
        id={telInputId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        autoComplete="off"
        value={number}
        onChange={handleChange}
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
