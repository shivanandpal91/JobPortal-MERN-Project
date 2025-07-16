
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar';
import About from './Pages/About';
import RefreshHandler from './RefreshHandler';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar />
      <Outlet />
      <About />
    </div>
       
  )
}

export default App;

