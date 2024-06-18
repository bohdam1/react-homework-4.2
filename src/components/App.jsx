import React, { useState, useEffect } from 'react';
import { FormBook } from './form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from "./Filter/Filter";


export const App = () => {

  const [contacts, setcontacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
  const [filter, setfilter] = useState("");
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setname(value);
    } else if (name === 'number') {
      setnumber(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
      alert(`${name} is already in the contact list.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };

    setcontacts(prevState => ([...prevState, newContact]));
    setname(""); // Очищення поля після додавання контакту
    setnumber(""); // Очищення поля після додавання контакту
  };

  const handleFilter = (event) => {
    setfilter(event.target.value);
  };

  const handleDelete = id => {
    setcontacts(prev => prev.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <FormBook name={name} number={number} onSubmit={handleSubmit} onChange={handleChange} />
      <h2>Contacts</h2>
      <Filter value={filter} onSearch={handleFilter} />
      <ContactsList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );

}
