import React from 'react'
import { Layout, Button } from 'antd'

import { getAll } from '../BooksAPI'
import { shelves } from '../Enums'
import BookShelf from './BookShelf'

const { Header, Content } = Layout

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
      <Layout>
        <Header className='list-books-title'>
          <h1>MyReads</h1>
        </Header>
        <Content>
          {Object.entries(shelves).map(([key, title]) => (
            <BookShelf
              key={key}
              title={title}
              books={books[key] || []}
              onShelfChange={this.onShelfChange}
            />
          ))}
          <Button
            className='open-search'
            type='primary'
            shape='circle'
            size='large'
            icon='plus'
            onClick={() => { this.props.history.push('/search') }}
          />
        </Content>
      </Layout >
    )
  }
}

export default ListBooks