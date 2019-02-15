import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import SearchBooks from './component/SearchBooks'
import ListBooks from './component/ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          component={ListBooks}
        />
        <Route
          exact
          path='/search'
          component={SearchBooks}
        />
      </div>
    )
  }
}

export default BooksApp
