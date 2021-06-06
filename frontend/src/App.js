import React from 'react';
import Routes from './routes/principal.routes'
import {BrowserRouter as Router} from 'react-router-dom'

const App =()=> {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App;
