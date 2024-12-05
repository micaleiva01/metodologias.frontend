import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'; // Import global CSS
import App from './App';
import reportWebVitals from './reportWebVitals';

// Dynamically add the Bootstrap CSS CDN
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css";
document.head.appendChild(link);

// Dynamically add the Bootstrap JS + Popper.js CDN
const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js";
script.async = true;
document.body.appendChild(script);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
