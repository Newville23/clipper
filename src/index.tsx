import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import { Provider } from 'react-redux'
import configureStore from './reducers'

const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
