import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'  // Changed this line
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'

import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))  // Store in a variable first

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)