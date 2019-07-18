import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    shelves: []
  }

  componentDidMount() {
    this.refreshShelves()
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      // refresh the shelves real-time
      this.refreshShelves()
    })
  }

  refreshShelves = () => {
    BooksAPI.getAll().then((books) => {
      const shelves = this.buildShelves(books)
      this.setState({ shelves })
    })
  }

  buildShelves = (books) => {
    const shelves = [
      {
        id: 'currentlyReading',
        name: 'Currently Reading',
        books: []
      },
      {
        id: 'wantToRead',
        name: 'Want to Read',
        books: []
      },
      {
        id: 'read',
        name: 'Read',
        books: []
      }
    ]
    books.forEach(book => {
      const shelf = shelves.find(shelf => shelf.id === book.shelf)
      shelf.books.push(book)
    })
    return shelves
  }

  render() {
    const { shelves } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {shelves.map(shelf => (
                <Shelf
                  key={shelf.id}
                  shelf={shelf}
                  changeShelf={this.changeShelf}
                />
              ))}
            </div>
            <Link to='/search' className='open-search'>Add a book</Link>
          </div>
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            shelves={shelves}
            changeShelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
