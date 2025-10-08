import React, { useState, useEffect } from 'react';
import axios from 'axios';


export interface Item {
  _id: string;
  fname: string;
  lname: string;
  address: string;
}

interface ItemListProps {
  startEdit: (id: string, fname: string,lname: string, address: string) => void;
}

const ItemList: React.FC<ItemListProps> = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get<Item[]>('https://crudforinterview.onrender.com/api/items');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://crudforinterview.onrender.com/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {item.fname} - {item.lname}
          {/* <button onClick={() => startEdit(item._id, item.fname, item.lname, item.address)}>Edit</button> */}
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;