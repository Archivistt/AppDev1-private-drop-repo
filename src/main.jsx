import { BrowserRouter as Router } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import A from './App.jsx'
import StudentList from './components/OJTsample/StudentList.jsx'
import AnotherApp from './components/AnotherApp.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnotherApp />
  </StrictMode>,
)
