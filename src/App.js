import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home'
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
