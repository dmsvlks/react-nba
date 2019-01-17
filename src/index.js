import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import './reset.css';
import './App.css';
import App from './App';

library.add(faSort, faChevronRight, faChevronLeft);

ReactDOM.render(<App /> , document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  })
}
