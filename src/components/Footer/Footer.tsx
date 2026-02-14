
import React from 'react';
import './Footer.css';

interface FooterProps {
  t: {
    copyright: string;
  };
}

import { Link } from 'react-router-dom';

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="footer">
      <div className="social-links">
        {/* ... existing links ... */}
      </div>
      <p>{t.copyright}</p>
      <div className="admin-link">
        <Link to="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}>Admin</Link>
      </div>
    </footer>
  );
};

export default Footer;
