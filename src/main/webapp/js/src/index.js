import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// wrappder func for the window.fetch method
const get = ({ url, options }) => {
    const request = new Request(url, options);
    return fetch(request);
}

// render the app in between the #react-root div
ReactDOM.render(<App get={get} />, document.getElementById('react-root'));

