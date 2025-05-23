import './App.css';
// import Header from './components/Header';
import Home from './pages/Home.js';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import navbarStyles from './components/Navbar.css';
import footerStyles from './components/Footer.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup.js';
import signupStyles from './pages/signup.css';
import SignIn from './pages/signin.js';
import signinStyles from './pages/signin.css';
import DashboardPage from './pages/Dashboard.js';
import dashboardStyles from './pages/Dashboard.css';
import Income from './pages/Income.js';
import IncomeStyles from './pages/Income.css';
import Expenses from './pages/Expenses.js';
import ExpensesStyles from './pages/Expenses.css';
import Budgeting from './pages/Budgeting.js';
import BudgetingStyles from './pages/Budgeting.css'
import About from './pages/About.js';
import AboutStyles from './pages/About.css';
import NotFoundPage from './pages/NotFoundPage.js';
import notFoundPageStyles from './pages/NotFoundPage.css';
import { AuthProvider } from './context/AuthContext.js';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Navbar className={navbarStyles.navbar}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp className={signupStyles.signup}/>} />
          <Route path="/signin" element={<SignIn className={signinStyles.signin}/>} />
          <Route path="/dashboard" element={<DashboardPage className={dashboardStyles.DashboardPage}/>} />
          <Route path="/income" element={<Income className={IncomeStyles.Income}/>}/>
          <Route path="/expenses" element={<Expenses className={ExpensesStyles.Expenses}/>}/>
          <Route path="/budgeting" element={<Budgeting className={BudgetingStyles.Budgeting}/>}/>
          <Route path="/about" element={<About className={AboutStyles.About}/>} />
          <Route path="*" element={<NotFoundPage className={notFoundPageStyles.NotFoundPage} />} />
        </Routes>
        <Footer className={footerStyles.footer}/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
