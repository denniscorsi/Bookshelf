import React from 'react';
//import React, { useState, useEffect } from 'react';
import Book from './Book.jsx';

const App = () => {
  const books = [
    {
      title: 'title',
      author: 'author',
      description: 'descriptions',
      coverImg:
        'http://books.google.com/books/content?id=0VWdBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
  ];
  // const [books, bookSetter] = useState([]);

  // useEffect(() => {
  //   fetch('/books')
  //     .then((res) => {
  //       //console.log('response:', res);
  //       return res.json();
  //     })
  //     .then((bookArr) => {
  //       bookSetter[bookArr];
  //       //console.log('Books 1:', books);
  //     })
  //     .catch(console.log);
  // }, []);

  return (
    <>
      <h1>App Component</h1>
      <Book
        title={books[0].title}
        author={books[0].author}
        description={books[0].description}
        coverImg={books[0].coverImg}
      />
    </>
  );
};

export default App;
