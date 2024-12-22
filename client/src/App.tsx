import './App.css'

import { Routes, Route, useLocation } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import ProblemsListPage from './pages/ProblemsList/ProblemsListPage'

import NavBar from './components/NavBar'

import { ListItemProvider } from './contexts/problemContext'
import { UserProvider } from './contexts/userContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProblemScreenPage from './pages/ProblemScreen/ProblemScreenPage'
import AdminPage from './pages/Admin/AdminPage'

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
      case '/register':
        return 'bg-green-500';
      case '/problems/:question_title':
        return 'bg-purple-500';
      case '/admin':
        return 'bg-blue-500';
      default:
        return 'defaultColor';
    }
  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ListItemProvider>
            <NavBar color={getNavBarColor()}/>
              <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/problems' element={<ProblemsListPage />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/register' element={<RegisterPage />}/>
                <Route path='/problems/:question_title' element={<ProblemScreenPage />}/>
                <Route path='/admin' element={<AdminPage />}/>
              </Routes>
        </ListItemProvider>
      </UserProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
