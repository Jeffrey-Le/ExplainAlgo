import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import SignInPage from './pages/SignIn/SignInPage'
import ProblemsListPage from './pages/Problems/ProblemsListPage'

import NavBar from './components/NavBar'

import { ListItemContext } from './contexts'

function App() {
  const [data, setData] = useState([]);

  return (
    <>
    <ListItemContext.Provider value={data}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/problems' element={<ProblemsListPage />}/>
          <Route path='/login' element={<SignInPage />}/>
        </Routes>
      </BrowserRouter>
    </ListItemContext.Provider>
    </>
  )
}

export default App
