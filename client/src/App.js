
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
