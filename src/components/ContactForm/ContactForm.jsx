
import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './ContactForm.module.css'

const ContactForm = ({submitForm}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

    
  const handleContact = (e) => {
    const { name, value } = e.target;
  switch (name) {
    case 'name':
      setName(value)
      break;
     case 'number':
      setNumber(value)
      break;
    default:
      break;
  }    
  }
  
    const heandleSubmit = (e) => {
    e.preventDefault();
       submitForm({name, number});
       setName('');
       setNumber('');
  }
   
        return (     
             <form className={css.contact_form} onSubmit={heandleSubmit}>
                <label className={css.contact_label}>Name:
                    <input
            type="text"
            name="name"
            value={name}
            onChange={handleContact}
            placeholder="Enter contact"
            pattern="[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" 
                required
                className={css.contact_input}
                />
                </label>
             
                <label className={css.contact_label}>
                       Number phone:
                <input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleContact}
  placeholder="Enter number phone"
  pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                 className={css.contact_input}
/></label>
      <button type="submit">Add contact</button>
        </form>
        )
    }


ContactForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

export default ContactForm;