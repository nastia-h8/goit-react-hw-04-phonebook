import { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';

import { GlobalStyle } from 'components/GlobalStyle';
import { Layout } from 'components/Layout';
import { MainTitle, Title, Message } from './App.styled';

const CONTACTS_LS_KEY = 'contacts';
const getInitialContacts = () => {
  const savedContacts = localStorage.getItem(CONTACTS_LS_KEY);
  return JSON.parse(savedContacts) ?? [];
};

export function App() {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = newContact => {
    const isNameInContactList = checkContactName(newContact.name);
    const isNumberInContactList = checkContactNumber(newContact.number);

    if (isNameInContactList) {
      toast.error(`${newContact.name} is already in contacts`);
    } else if (isNumberInContactList) {
      toast.error(
        `This number is already saved in contacts as ${isNumberInContactList.name}`
      );
    } else {
      setContacts(state => {
        return [...state, { id: nanoid(), ...newContact }];
      });
    }
  };

  const changeNameFilter = name => setFilter(name);

  const deleteContacts = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const checkContactName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );
  };

  const checkContactNumber = number => {
    const regex = /\D/g;
    return contacts.find(
      contact =>
        contact.number.replace(regex, '') === number.trim().replace(regex, '')
    );
  };

  const visibleContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <Layout>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onFormSubmit={handleFormSubmit} />
      <Title>Contacts</Title>
      <ContactFilter onFilterNameChange={changeNameFilter} />

      {contacts.length > 0 ? (
        <ContactList
          contacts={visibleContacts}
          onContactsDelete={deleteContacts}
        />
      ) : (
        <Message>No contacts found</Message>
      )}

      <Toaster />
      <GlobalStyle />
    </Layout>
  );
}
