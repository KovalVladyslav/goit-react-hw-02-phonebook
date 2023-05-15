import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

let contactsName = [];

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  formSubmitData = ({ name, number }) => {
    this.state.contacts.forEach(contact => {
      contactsName.push(contact.name);
    });

    if (contactsName.includes(name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.addContacts(name, number);
    }
  };

  changeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#010101',
          paddingTop: 20,
        }}
      >
        <div className={css.mainBlock}>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitData} />

          <h2>Contacts</h2>
          <Filter filter={filter} changeFilter={this.changeFilter} />

          <ContactList
            visibleContact={visibleContact}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
