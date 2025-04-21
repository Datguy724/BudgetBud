import './App.css';
// import Header from './components/Header';
import Home from './pages/Home';
// import About from './pages/about';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import navbarStyles from './components/Navbar.css';
import footerStyles from './components/Footer.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import signupStyles from './pages/signup.css';
import SignIn from './pages/signin';
import signinStyles from './pages/signin.css';
import DashboardPage from './pages/Dashboard';
import dashboardStyles from './pages/Dashboard.css';
import Income from './pages/Income';
import IncomeStyles from './pages/Income.css';
import Expenses from './pages/Expenses';
import ExpensesStyles from './pages/Expenses.css';
import Budgeting from './pages/Budgeting';
import BudgetingStyles from './pages/Budgeting.css'
import About from './pages/About';
import AboutStyles from './pages/about.css';

import AboutStyles from './pages/About.css';
import NotFoundPage from './pages/NotFoundPage';
import notFoundPageStyles from './pages/NotFoundPage.css';
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
