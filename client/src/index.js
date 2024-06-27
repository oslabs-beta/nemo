import React, { createRoot } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
