import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

// Add error logging
console.log('Starting Historical News app...');

const root = document.getElementById('root');

if (!root) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, rendering app...');
  
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('App rendered successfully');
}
