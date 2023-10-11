import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
