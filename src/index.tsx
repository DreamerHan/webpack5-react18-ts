import React from 'react'
import ReactDom from 'react-dom/client'

import App from './App'

import '@src/assets/css/index'

const root = ReactDom.createRoot(document.getElementById('app'))

root.render(<App />)
