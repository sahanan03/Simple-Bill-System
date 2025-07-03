import Clients from './Pages/Client'
import Bills from './Pages/Bills'
import Payments from './Pages/Payment'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Components/Layout'

function App() {


  return (
   <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to="/clients" />}></Route>
        <Route path='/clients' element={<Clients />}></Route>
        <Route path='/bills' element={<Bills/>}></Route>
        <Route path='/payments' element={<Payments/>}></Route>
      </Routes>
    </Layout>
  </BrowserRouter>
  )
}

export default App
