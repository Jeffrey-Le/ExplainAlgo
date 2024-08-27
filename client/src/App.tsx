import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route, useLocation } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import SignInPage from './pages/SignIn/SignInPage'
import ProblemsListPage from './pages/ProblemsList/ProblemsListPage'

import NavBar from './components/NavBar'

import { ListItemProvider } from './contexts/contexts'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProblemScreenPage from './pages/ProblemScreen/ProblemScreenPage'

function App() {
  const queryClient = new QueryClient();

  const location = useLocation();

  const getNavBarColor = () => {
    switch(location.pathname) {
      case '/':
        return 'bg-gray-300';
      case '/problems':
        return 'bg-orange-300';
      case '/login':
        return 'bg-green-500';
      case '/problems/:question_title':
        return 'bg-purple-500';
      default:
        return 'defaultColor';
    }
  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ListItemProvider>
          <NavBar color={getNavBarColor()}/>
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/problems' element={<ProblemsListPage />}/>
              <Route path='/login' element={<SignInPage />}/>
              <Route path='/problems/:question_title' element={<ProblemScreenPage />}/>
            </Routes>
      </ListItemProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
