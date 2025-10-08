import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<Item[]>('https://crudforinterview.onrender.com/api/items');
      setItems(res.data);
      toast.info('Items loaded successfully');
    } catch (err) {
      console.error(err);
       toast.error('Error fetching items');
    }finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://crudforinterview.onrender.com/api/items/${id}`);
      toast.error('Item deleted successfully');
      await fetchItems();
    } catch (err) {
      toast.error('Error deleting item');
      console.error(err);
    }finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="item-list">
      {isLoading && <div className="loader"></div>}
      {!isLoading && items.length === 0 && <p>No items found.</p>}
      <ul>
        {items.map((item) => (
          <li key={item._id} className="item">
            <span>
              {item.fname} {item.lname} - {item.address}
            </span>
            <div className="item-actions">
              {/* <button
                onClick={() => startEdit(item._id, item.fname, item.lname, item.address)}
                className="edit-button"
              >
                Edit
              </button> */}
              <button onClick={() => handleDelete(item._id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;