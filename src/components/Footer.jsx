import React from 'react';
import { ShareButtons } from './ShareButtons';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <ShareButtons />
        <span className="divider">|</span>
        <span className="copyright formal-font">© 2025 Historical News</span>
      </div>
    </footer>
  );
};