import './App.css';
// import Header from './components/Header';
import Home from './pages/Home';
// import About from './pages/about';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import navbarStyles from './components/Navbar.css';
import footerStyles from './components/Footer.css'


function App() {
  return (
    <div className="App">
      <Navbar className={navbarStyles.navbar}/>
      <Home/>
      <Footer className={footerStyles.footer}/>
    </div>
  );
}

export default App;
