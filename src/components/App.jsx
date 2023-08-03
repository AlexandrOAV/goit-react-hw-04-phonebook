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
    if (contactsArray) {
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
    console.log('stateContactForm: ', stateContactForm);
    stateContactForm.id = nanoid(7);
    const { name } = stateContactForm;
    if (isCheckContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, stateContactForm])
  };

  const filterForm = event => setFilter(event.target.filter);
  
  const deleteChenge = id =>
    setContacts(prevState => prevState.contacts.filter(contact => contact.id !== id));
  
  
  const   filterArray = () => {
    return contacts.filter(contact => contact.name.toUpperCase().includes(filter.toUpperCase()))
   }

  return (
    <div className={css.container}>
      <h1 className={css.title}> Phonebook</h1>
      <ContactForm submitForm={submitForm} />
      <h2 className={css.title_contacts}>Contacts</h2>
      <Filter onChange={filterForm} />
      <ContactList contacts={filterArray} deleteChenge={deleteChenge} />
    </div>
  );
}
// export class App extends Component {
//   state = {
//      contacts: [],
//     filter: '',
//   }

  
//   componentDidMount() {
//     let contactsArray = JSON.parse(localStorage.getItem('contacts'));
//     if (contactsArray) {
//       this.setState({ contacts: contactsArray })
//     }
    
// }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) { 
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
// }
//   isCheckContact = (nameUser) => {
//     const { contacts } = this.state;
//     return contacts.find(contact=>contact.name.toUpperCase()===nameUser.toUpperCase())
//   }


//   submitForm = stateContactForm => {
//     stateContactForm.id = nanoid(7);
//     const { name } = stateContactForm;
//     if (this.isCheckContact(name)) {
//       alert(`${name} is already in contacts`);
//       return;
//     }
//     this.setState(prevState => (
//       {
//         contacts: [...prevState.contacts, stateContactForm]
//       })
//     )
    
//   }
  
//   filterForm = (event) => {
//     this.setState({ filter: event.target.value })
//   };

//   deleteChenge = (id) => {
//     this.setState(prevState=>({contacts:prevState.contacts.filter(contact=>contact.id!==id)}))
//    }
//   filterArray = () => {
//     const {contacts, filter} = this.state
//     return contacts.filter(contact => contact.name.toUpperCase().includes(filter.toUpperCase()))
//    }
//   render() {
//     const contactsFilter = this.filterArray();
//     return (
//     <div className={css.container}>
//         <h1 className={css.title}> Phonebook</h1>
//         <ContactForm submitForm={this.submitForm}/>
//         <h2 className={css.title_contacts}>Contacts</h2>
//         <Filter onChange={this.filterForm}  />
//         <ContactList  contacts={contactsFilter} deleteChenge={this.deleteChenge} />
//     </div>
//   );
//   }
// };
