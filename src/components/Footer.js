import React from "react";

function Footer(){
    return(
        <footer className="footer">
        <div className="footer__bottom">
          <ul className="footer__links">
            <li><a href="#english">English</a></li>
            <li><a href="#terms">Terms & Policy</a></li>
            <li><a href="#security">Security</a></li>
          </ul>
          <span className="footer__copy">
            ©2025 BudgetBud
          </span>
        </div>
      </footer>
    );
}

export default Footer;