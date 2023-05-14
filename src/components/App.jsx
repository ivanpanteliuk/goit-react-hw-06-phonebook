import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import FilterInput from './FilterInput';

// const initialState = [
//   { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
//   { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
//   { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
//   { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
// ];

export function App() {
  const contacts = useSelector(getContacts);
  // const [contacts, setContacts] = useState(
  //   () =>
  //     JSON.parse(window.localStorage.getItem('contacts')) ?? [...initialState]
  // );
  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  //   if (contacts.length === 0) {
  //     localStorage.removeItem('contacts');
  //   }
  // }, [contacts]);

  return (
    <div className="main-container">
      <h1 className="phonebook">Phonebook</h1>
      <ContactForm />
      {contacts.length !== 0 && (
        <>
          <h2 className="contacts">Contacts</h2>
          <FilterInput />
          <ContactList />
        </>
      )}
    </div>
  );
}
