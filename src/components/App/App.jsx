import { Component } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';

import { GlobalStyle } from 'components/GlobalStyle';
import { Layout } from 'components/Layout';
import { MainTitle, Title } from './App.styled';

const CONTACTS_LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(CONTACTS_LS_KEY);
    if (savedContacts !== null)
      this.setState({ contacts: JSON.parse(savedContacts) });
  }

  componentDidUpdate(_, prevState) {
    const currentContacts = this.state.contacts;
    if (currentContacts !== prevState.contacts)
      localStorage.setItem(CONTACTS_LS_KEY, JSON.stringify(currentContacts));
  }

  handleFormSubmit = newContact => {
    const isNameInContactList = this.checkContactName(newContact.name);
    const isNumberInContactList = this.checkContactNumber(newContact.number);

    if (isNameInContactList) {
      toast.error(`${newContact.name} is already in contacts`);
    } else if (isNumberInContactList) {
      toast.error(
        `This number is already saved in contacts as ${isNumberInContactList.name}`
      );
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(), ...newContact }],
      }));
    }
  };

  checkContactName = name => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );
  };

  checkContactNumber = number => {
    const regex = /\D/g;
    return this.state.contacts.find(
      contact =>
        contact.number.replace(regex, '') === number.trim().replace(regex, '')
    );
  };

  changeNameFilter = name => {
    this.setState({ filter: name });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getFilteredContacts();
    return (
      <Layout>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onFormSubmit={this.handleFormSubmit} />

        <Title>Contacts</Title>
        <ContactFilter onFilterNameChange={this.changeNameFilter} />
        <ContactList
          contacts={visibleContacts}
          onContactsDelete={this.deleteContacts}
        />
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
