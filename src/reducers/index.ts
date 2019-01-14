import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import clipreducer from './clips'
import setreducer from './sets'

export default function configureStore() {
  const middlewares = [thunkMiddleware]
  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(clipreducer, composeWithDevTools(middleWareEnhancer))
  return store
}
