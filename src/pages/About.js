import React from 'react';
import './About.css';
import aboutBg1 from '../images/aboutbg1.avif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

function About() {
  return (
    <div className="about-page">
      <div className="about-image-container">
        <img src={aboutBg1} alt="About Background" className="about-bg1" />
        <h1 className="about-overlay-text">Welcome to BudgetBud</h1>
      </div>
      <div className="about-content">
        <h1 className="about-title">About BudgetBud</h1>
        <p className="about-description">
          BudgetBud is your ultimate budgeting companion, designed to help you manage your finances with ease.
          Our platform provides tools for tracking income, monitoring expenses, and visualizing your financial habits.
        </p>
      </div>
      <div className="about-features">
        <h2 className="features-title">Key <a href="#features">Features</a></h2>
        <ul className="features-list">
          <li>Income Tracking</li>
          <li>Expense Monitoring</li>
          <li>Budget Visualization</li>
          <li>Financial Insights</li>
        </ul>
        <p className="features-description">
          With BudgetBud, you can take control of your finances and make informed decisions about your spending.
          Join us today and start your journey towards financial freedom!
        </p>
      </div>

      <div className="about-contact">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">
          If you have any questions or feedback, feel free to reach out to us at:
        </p>
        <div className="contact-info">
          <p><FontAwesomeIcon icon={faEnvelope}/> Email: support@budgetbud.com</p>
          <p><FontAwesomeIcon icon={faPhone}/> Phone Number: +1 (123) 456-7890</p>
          <p><FontAwesomeIcon icon={faInstagram}/> Instagram: @budgetbud</p>
          <p><FontAwesomeIcon icon={faTwitter}/> Twitter: @budgetbud</p>
          <p><FontAwesomeIcon icon={faFacebook}/> Facebook: BudgetBud</p>
        </div>
        <p className="contact-description">
          We would love to hear from you!
          Your feedback helps us improve and provide the best experience for our users.
        </p>
      </div>
    </div>
  );
};

export default About;
