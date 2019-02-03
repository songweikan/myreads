import React from 'react'
import { Card, Select, Button } from 'antd'

import { shelves } from '../Enums'
import { update } from '../BooksAPI'

const { Meta } = Card
const { Option } = Select

class Book extends React.Component {
  state = {
    loading: false,
  }

  handleShelfChange = toShelf => {
    this.setLoading(true)
    update(this.props.book, toShelf).then(() => {
      this.setLoading(false)
      if (this.props.onShelfChange) {
        this.props.onShelfChange()
      }
    })
  }

  setLoading = (loading) => {
    this.setState(currentState => ({
      ...currentState,
      loading,
    }))
  }

  render = () => {
    const { book } = this.props
    return (
      <Card
        className='book'
        size='small'
        bordered={false}
        cover={
          <div className='book-top'>
            <img alt={book.title} src={book.imageLinks.thumbnail} height='200'></img>
            <Button
              className='book-shelf-changer'
              type='primary'
              shape='circle'
              size='large'
              icon='down'
              disabled={this.state.loading}
              loading={this.state.loading}
            >
              <Select
                className='book-shelf-changer-select'
                size='small'
                defaultValue={book.shelf || 'none'}
                dropdownMatchSelectWidth={false}
                onChange={this.handleShelfChange}
              >
                <Option value="move" disabled>Move to...</Option>
                {Object.entries(shelves).map(([key, title]) => (
                  <Option
                    key={key}
                    value={key}
                  >{title}</Option>
                ))}
                <Option value="none">None</Option>
              </Select>
            </Button>
          </div>
        }
      >
        <Meta
          title={<div className='book-title'>{book.title}</div>}
          description={book.authors && <div className='book-authors'>{book.authors.join(' ')}</div>}
        />
      </Card>
    )
  }
}

export default Book