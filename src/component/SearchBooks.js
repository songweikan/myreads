import React from 'react'
import { Button, Input, Row, Col } from 'antd'

import Book from './Book'
import { search, getAll } from '../BooksAPI'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: [],
    myBooks: {}
  }

  componentDidMount() {
    getAll().then(books => {
      const myBooks = new Map(
        books.length
          ? books.map(book => [book.id, book])
          : []
      )
      this.setState(currentState => ({
        ...currentState,
        myBooks,
      }))
    })
  }

  handleQueryChange = event => {
    const query = event.target.value
    this.setState(currentState => ({
      ...currentState,
      query
    }))
    if (query.length > 0) {
      search(query).then(books => {
        this.setState(currentState => ({
          ...currentState,
          books: books.length ? books : [],
        }))
      })
    }
  }

  render = () => {
    const { books, myBooks } = this.state
    return (
      <div>
        <Input
          type='text'
          placeholder="Search by title or author"
          onChange={this.handleQueryChange}
          addonBefore={
            <Button icon='left' onClick={() => { this.props.history.push('/') }} />
          }
        ></Input>
        <Row
          type='flex'
          justify='start'
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          {books.map((book) => {
            const myBook = myBooks.get(book.id) || {}
            return (
              <Col
                key={book.id}
              >
                <Book
                  book={{
                    ...book,
                    shelf: myBook.shelf || 'none',
                  }}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}

export default SearchBooks