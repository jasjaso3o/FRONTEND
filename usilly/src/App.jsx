import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Feed_principal from './componentes/main.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Feed_principal />
  )  
}

export default App
