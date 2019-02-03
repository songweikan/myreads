import React from 'react'

import { getAll } from '../BooksAPI'
import { shelves } from '../Enums'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.refreshBooks()
  }

  refreshBooks = () => {
    getAll().then(books => {
      this.setState(currentState => ({
        ...currentState,
        books: books
      }))
    })
  }

  onShelfChange = () => {
    this.refreshBooks()
  }

  render = () => {
    const books = this.state.books.reduce((books, book) => {
      if (book.shelf) {
        books[book.shelf] = (books[book.shelf] || []).concat([book])
      }
      return books
    }, {})
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>{
            Object.entries(shelves).map(([key, title]) => (
              <BookShelf
                key={key}
                title={title}
                books={books[key] || []}
                onShelfChange={this.onShelfChange}
              />
            ))
          }
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => { this.props.history.push('/search') }}>Add a book</button>
        </div>
      </div >
    )
  }
}

export default ListBooks