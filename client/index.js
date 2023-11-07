import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../index.css';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
