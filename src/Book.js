import React, { Component } from 'react'

class Book extends Component {
  handleChange = (e) => {
    this.props.changeShelf(this.props.book, e.target.value)
  }
  render() {
    const { book } = this.props
    const style = {
      width: 128,
      height: 193
    }
    if (book.imageLinks) {
      style.backgroundImage = `url(${book.imageLinks.thumbnail})`
    }
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style}></div>
          <div className="book-shelf-changer">
            <select defaultValue={book.shelf} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading" >Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          <div className="book-authors">
            {book.authors.map(author => (<span key={author}>{author} <br /></span>))}
          </div>
        }
      </div>
    )
  }
}

export default Book