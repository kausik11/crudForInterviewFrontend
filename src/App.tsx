import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';
  import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editfname, setEditFname] = useState<string>('');
  const [editLname, setEditLname] = useState<string>('');
  const [editAddress, setEditAddress] = useState<string>('');

  const startEdit = (id: string, fname: string, lname: string, address: string) => {
    setEditId(id);
    setEditFname(fname);
    setEditLname(lname);
    setEditAddress(address);
  };

  return (
    <div className="App">
      <h1>MERN CRUD App</h1>
      <ItemForm
        editId={editId}
        editfName={editfname}
        editlName={editLname}
        editAddress={editAddress}
        setEditId={setEditId}
      />
      <ItemList startEdit={startEdit} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;