import React from 'react'
import { useState } from 'react'
import Feed_principal from './componentes/main.jsx'
import {Router, Switch, Route, Redirect} from 'wouter';
import Header from './componentes/header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <Header/>
      <Router>
        <Feed_principal />
      </Router>
    </div>
  )  
}

export default App
