import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/about';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<about />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
