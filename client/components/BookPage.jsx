import React from 'react';
import { useLocation } from 'react-router-dom';

const BookPage = () => {
  const location = useLocation();
  const { bookId } = location.state;

  // const { title, author, description, coverImg } = props;
  const title = bookId;
  const author = 'a';
  const description = 'a';
  const coverImg = 'https://i.stack.imgur.com/rGA81.jpg?s=256&g=1';

  // TODO: Add buttons for adding to shelf 

  return (
    <div>
      <h1>Title: {title}</h1>
      <h3>{author}</h3>
      <p>{description}</p>
      <img src={coverImg} />
    </div>
  );
};

export default BookPage;
