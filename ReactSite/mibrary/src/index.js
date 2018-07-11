import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainPage from './MainPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();
