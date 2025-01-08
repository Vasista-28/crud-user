import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

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

  // Calculate the index of the first and last items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current items for the current page
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>Item List</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <ul className="item-list">
            {currentItems.map((item) => (
              <li key={item.id} className="item">
                <div>
                  <strong>{item.name}</strong>: {item.description}
                </div>
                <div>${item.price}</div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
