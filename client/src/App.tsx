import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import SignInPage from './pages/SignIn/SignInPage'
import ProblemsListPage from './pages/Problems/ProblemsListPage'

import NavBar from './components/NavBar'

import { ListItemProvider } from './contexts'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ListItemProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/problems' element={<ProblemsListPage />}/>
            <Route path='/login' element={<SignInPage />}/>
          </Routes>
        </BrowserRouter>
      </ListItemProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
