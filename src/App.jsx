import './App.css'
import Home from './Pages/Home.jsx'
import Auth from './Pages/Auth.jsx'
import Checkout from './Pages/Checkout.jsx'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Component/Navbar.jsx'
import ProductDetail from './Pages/ProductDetail.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

function App() {
 return (
   <AuthProvider>
    <div className='app '>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><h1>404 Not Found</h1></div>} />
            <Route path='/product/:id' element={<ProductDetail/>} />
        </Routes>
    </div>
   </AuthProvider>
 )
}

export default App
