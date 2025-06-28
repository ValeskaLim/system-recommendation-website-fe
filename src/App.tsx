import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import { ROUTE_PATHS } from './router/routePaths'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to='/login'/>}/>
          <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />}/>
          <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
