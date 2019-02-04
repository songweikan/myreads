import React from 'react'
import { Card, Row, Col } from 'antd'

import Book from './Book'


class BookShelf extends React.Component {
  render = () => {
    const { title, books } = this.props
    return (
      <Card
        title={title}
        bordered={false}
        loading={books.length === 0}
      >
        <Row
          type='flex'
          justify='center'
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          {books.map((book) => (
            <Col
              key={book.id}
            >
              <Book
                book={book}
                onShelfChange={this.props.onShelfChange}
              />
            </Col>
          ))}
        </Row>
      </Card>
    )
  }
}

export default BookShelf