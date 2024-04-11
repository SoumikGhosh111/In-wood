
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

// importing react router dom
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div >
      <Router>
        <Navbar />
        <Routes>
          <Route  path='/' element={<HomePage />}/>
          <Route path='/login' element ={<LoginPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
