import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList ";
import { Filter } from "./Filter/Filter";
import css from "./App.module.css"
import { useState, useEffect } from "react";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    let contactsArray = JSON.parse(localStorage.getItem('contacts'));
    if (contactsArray&&contactsArray.length !==0) {
      setContacts(contactsArray)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const  isCheckContact = (nameUser) => {
    return contacts.find(contact=>contact.name.toUpperCase()===nameUser.toUpperCase())
  }

  const submitForm = stateContactForm => {
    stateContactForm.id = nanoid(7);
    const { name } = stateContactForm;
    if (isCheckContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, stateContactForm])
  };

  const filterForm = event => setFilter(event.target.value);
  
  const deleteChenge = id =>
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  
  
  const filterArray = () =>
    contacts.filter(contact => contact.name.toUpperCase().includes(filter.toUpperCase()));
  
  return (
   
    <div className={css.container}>
      <h1 className={css.title}> Phonebook</h1>
      <ContactForm submitForm={submitForm} />
      <h2 className={css.title_contacts}>Contacts</h2>
      <Filter onChange={filterForm} />
      <ContactList contacts={filterArray()} deleteChenge={deleteChenge} />
    </div>
  );
}

