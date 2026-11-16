import "./App.css";
import { initialContacts } from "./data/contacts";
import {useState} from 'react';

export default function App() {
  const [contacts, setContacts] = useState([...initialContacts]);
  const [formFields, setFormFields] = useState({
    id: contacts[0].id,
    name: contacts[0].name,
    email:contacts[0].email,
  });

  const handleSave = () => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id !== formFields.id) {
        return contact;
      }
      else {
        return {
          ...contact, 
          name: formFields.name,
          email: formFields.email,
        }
      }
    });
    
    setContacts(updatedContacts);
  }

  const handleReset = () => {
    const contactToReset = contacts.filter(
      contact => contact.id === formFields.id
    )[0];
    
    if (contactToReset) {
      setFormFields({...contactToReset})
    }
  }

  return (
    <div>
      <h1>Name and Email Practice</h1>
      <>
      {contacts.map(contact => 
        <ContactButton key={contact.id} name={contact.name} onClick={() => setFormFields({...contact})}/>
        )}
      </>
      <hr />
      <>
        <Input 
          id="name" 
          label="Name: " 
          value={formFields.name}
          onChange={e => setFormFields({...formFields, name: e.target.value})}
        />
      </>
      <br />
      <>
        <Input 
          id="email" 
          label="Mail: " 
          value={formFields.email}
          onChange={e => setFormFields({...formFields, email: e.target.value})}
        />
      </>
      <br />
      <>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </>
    </div>
  );
}

function ContactButton({ name, onClick }) {
  
  return (
    <button
      onClick={onClick}
    >
      {name}
    </button>
  );
}

function Input({ id, label, value, onChange }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} data-testid={id} value={value} onChange={onChange}></input>
    </>
  );
}
