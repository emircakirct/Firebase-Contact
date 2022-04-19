import React, { useEffect, useState } from 'react';
import './App.css'
import firebase from './firebase';
import { getDatabase, onValue, push, query, ref, remove, set, update } from "firebase/database";
import { BsPencilSquare} from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";




function App() {

  const [contact, setContact] = useState({
    name: '',
    phone: '',
    gender: 'n/a'
  })

  const [contactList, setContactList] = useState([]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(contact.id) {
      const db = getDatabase(firebase);
      const userRef = ref(db, "contact/" + contact.id);
      update(userRef, {name: contact.name, phone:contact.phone, gender:contact.gender})
    } else {
      const db = getDatabase(firebase);
      const userRef = ref(db, "contact");
      set(push(userRef), contact);
    }
  }

  useEffect(()=>{
    const db = getDatabase(firebase);
    const userRef = ref(db, "contact");
    onValue(query(userRef), (snapshot) => {
      const contacts = snapshot.val();
      const contactArray = [];
      for (let id in contacts) {
        contactArray.push({id, ...contacts[id]})
      }
      setContactList(contactArray);
    })
  },[])

  const deleteContact = (id) => {
    const db = getDatabase(firebase);
    const userRef = ref(db, "contact/" + id);
    remove(userRef);
  }

  const handleEditContact = (id, name, phone, gender) => {
    setContact({
      id, name, phone, gender
    })
  }

  return (
    <div className="App">
      <div className='main-container'>
      <h1 className='emir-design'>EMIR DESIGN</h1>
      <h1 className='add-contact'>ADD CONTACT</h1>
      <form onSubmit={handleSubmit} className="form-input">
        <input type="text" name="name" placeholder="Name" className='inputBtn' onChange={handleChange} value={contact.name}/>
        <input type="text" name="phone" placeholder="Phone" className='inputBtn' onChange={handleChange} value={contact.phone}/>
        <select name="gender" onChange={handleChange} className="selectTool" value={contact.gender}>
          <option disabled value="n/a">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className='submitBtn'>{contact.id ? "Update" : "Add"}</button>
        {contact.id && <button type="button" className='submitBtn' style={{marginTop:"15px"}} onClick={() => {setContact({name:'', phone:'', gender:'n/a'})}}>Cancel</button>}
      </form>
      </div>
      <div className='contacts-container'>

      <h1 className='contacts'>CONTACTS</h1>
      <div className='table'>

      <table className='table-head'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
       <tbody>
        {contactList.map((contact)=> (
          <tr key={contact.id}>
            
            <td>{contact.name}</td>
            
            <td>{contact.phone}</td>
            
            <td>{contact.gender}</td>
  
            <td><VscChromeClose onClick={() => {deleteContact(contact.id)}} style={{color:"red",cursor:"pointer",marginLeft:"10px",width:"30px",height:"30px"}}/></td>
            <td><BsPencilSquare style={{color:"blue",cursor:"pointer",marginLeft:"10px",width:"30px",height:"25px"}} onClick={() => { handleEditContact(contact.id, contact.name, contact.phone, contact.gender) }}/></td>
          </tr>
        ))}
       </tbody>
      </table>
        </div>
        </div>
    </div>
  );
}

export default App;
