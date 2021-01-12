import * as React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'

const overmind = createOvermind(config)

render((
    <Provider value={overmind}>
          <App />
    </Provider>
), document.getElementById('root'))