import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://crud-app-bfbpafd8fte0gae8.eastus-01.azurewebsites.net/api/items'); // Replace with your backend API
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1>Item List</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <div>
                <strong>{item.name}</strong>: {item.description}
              </div>
              <div>${item.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;