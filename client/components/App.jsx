//import React from 'react';
import React, { useState, useEffect } from 'react';
import Book from './Book.jsx';

const App = () => {
  const [books, setBooks] = useState([{}]);

  // useEffect(() => {
  //   console.log('HELLO!');
  //   const newBooks = [
  //     {
  //       title: 'title',
  //       author: 'author',
  //       description: 'descriptions',
  //       coverImg:
  //         'http://books.google.com/books/content?id=0VWdBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //     },
  //   ];
  //   setBooks(newBooks);
  //   console.log('Books:', books);
  // }, []);

  console.log('Start of App Component...');
  console.log('books:', books);

  useEffect(() => {
    console.log('ENTERED');
    fetch('/books')
      .then((res) => {
        //console.log('response:', res);
        return res.json();
      })
      .then((bookArr) => {
        console.log('bookArr:', bookArr);
        setBooks(bookArr);
        console.log('Books 1:', books);
      })
      .catch(console.log('Error!!'));
  }, []);

  return (
    <>
      <h1>App Component</h1>
      {books.map((book) => {
        return (
          <Book
            title={book.title}
            author={book.author}
            description={book.description}
            coverImg={book.coverImg}
          />
        );
      })}
    </>
  );
};

export default App;
