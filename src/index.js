import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import './assets/scss/index.css';
import registerServiceWorker from './registerServiceWorker';

const MOUNT = document.getElementById('root');

ReactDOM.render(<Routes />, MOUNT);
registerServiceWorker();
