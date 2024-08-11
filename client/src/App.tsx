import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Cont from './components/Container'
import Card from './components/Card'
import Button from './components/Button'

import SignInForm from './components/SignInForm'

import HomePage from './pages/Home/HomePage'
import SignInPage from './pages/SignIn/SignInPage'
import ProblemsListPage from './pages/Problems/ProblemsListPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/problems' element={<ProblemsListPage />}/>
        <Route path='/login' element={<SignInPage />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
