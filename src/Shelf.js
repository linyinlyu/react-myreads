import React from 'react'
import Book from './Book'

function Shelf(props) {
  const { shelf, changeShelf } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelf.books.map(book => (
            <li key={book.id}>
              <Book book={book} changeShelf={changeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Shelf