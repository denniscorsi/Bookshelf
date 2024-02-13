import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BookPage = () => {
  const location = useLocation();
  const { googleId } = location.state;
  const [bookData, bookDataSetter] = useState({});

  useEffect(() => {
    fetch(`/books/${googleId}`)
      .then((res) => res.json())
      .then((book) => {
        console.log('fetched Book Data:', book);
        bookDataSetter(book);
      });
  }, []);

  // TODO: Add buttons for adding to shelf

  return (
    <div>
      <h1>Title: {bookData.title}</h1>
      <h3>{bookData.author}</h3>
      <p>{bookData.description}</p>
      <img src={bookData.coverImg} />
    </div>
  );
};

export default BookPage;
