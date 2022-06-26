import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
)


// ReactDOM.render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   ,
//   document.getElementById('root')
// )
