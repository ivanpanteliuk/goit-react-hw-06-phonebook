import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import FilterInput from './FilterInput';
import { nanoid } from 'nanoid';

const initialState = [
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [...initialState]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
    }
  }, [contacts]);

  const addContact = contactObj => {
    if (
      contacts.some(
        storedContact =>
          storedContact.name.toLowerCase() === contactObj.name.toLowerCase()
      )
    ) {
      return alert(`${contactObj.name} is already in contacts.`);
    }
    setContacts(prevContacts => [contactObj, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value.trim());
  };

  const getVisibleContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleDeleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="main-container">
      <h1 className="phonebook">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      {contacts.length !== 0 && (
        <>
          <h2 className="contacts">Contacts</h2>
          <FilterInput value={filter} onChange={changeFilter} />
          <ContactList
            contactsArr={getVisibleContacts()}
            handleDeleteContact={handleDeleteContact}
          />
        </>
      )}
    </div>
  );
}
