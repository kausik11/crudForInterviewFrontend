import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ItemFormProps {
  editId: string | null;
  editfName: string;
   editlName: string;
  editAddress: string;
  setEditId: (id: string | null) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ editId, editfName,editlName, editAddress, setEditId }) => {
  const [fname, setfName] = useState<string>(editfName);
  const [lname, setlName] = useState<string>(editlName);
  const [address, setAddress] = useState<string>(editAddress);
  const[loading, setLoading] = useState(false);
 

  useEffect(() => {
    setfName(editfName);
    setlName(editlName);
    setAddress(editAddress);
  }, [editfName, editlName, editAddress]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://crudforinterview.onrender.com/api/items/${editId}`, { fname, lname, address });
        toast.success('Item updated successfully!');
        setLoading(false);
        setEditId(null);
      } else {
        await axios.post('https://crudforinterview.onrender.com/api/items', { fname, lname, address });
           toast.success('Item added successfully!');
      }
      setlName('');
      setfName('');
      setAddress('');
      window.location.reload(); // Simple refresh; use state management in production
    } catch (err) {
      console.error(err);
      toast.error('Error submitting data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={fname}
        onChange={(e) => setfName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lname}
        onChange={(e) => setlName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">{loading ? 'Saving...' : 'Add'} User</button>
    </form>
  );
};

export default ItemForm;