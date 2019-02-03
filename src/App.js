import React from 'react'
import { Route } from 'react-router-dom'

import './AppAntd.css'
// import './App.css'

import SearchBooks from './component/SearchBooks'
import ListBooks from './component/ListBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <div>
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
