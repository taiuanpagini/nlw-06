import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Toaster } from 'react-hot-toast';
import ModalComponent from './components/Modal';

import './services/firebase';

import '../src/styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
  document.getElementById('root')
);

