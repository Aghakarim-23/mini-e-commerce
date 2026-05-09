import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.tsx'
import ProductDetail from './pages/ProductDetail.tsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id' element={<ProductDetail />} />
    </Routes>
  )
}

export default App