import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';

const App: React.FC = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  const startEdit = (id: string, name: string, description: string) => {
    setEditId(id);
    setEditName(name);
    setEditDescription(description);
  };

  return (
    <div className="App">
      <h1>MERN CRUD App</h1>
      <ItemForm
        editId={editId}
        editName={editName}
        editDescription={editDescription}
        setEditId={setEditId}
      />
      <ItemList startEdit={startEdit} />
    </div>
  );
};

export default App;