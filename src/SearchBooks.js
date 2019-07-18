import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    books: []
  }

  handleSearch = (e) => {
    BooksAPI.search(e.target.value).then((response) => {
      if (response && !response.error) {
        response.forEach(book => {
          book.shelf = this.findShelf(book)
        })
        this.setState({
          books: response
        })
      } else {
        this.setState({
          books: []
        })
      }
    })
  }

  findShelf = (book) => {
    for (let shelf of this.props.shelves) {
      const existingBook = shelf.books.find(b => b.id === book.id)
      if (existingBook) {
        return existingBook.shelf
      }
    }
    return 'none'
  }

  render() {
    const { books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleSearch} />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              book.imageLinks && (
                <li key={book.id}>
                  <Book book={book} changeShelf={this.props.changeShelf} />
                </li>
              )
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks