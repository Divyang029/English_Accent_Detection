import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import lamejs from 'lamejs';

// Optional: Make Lame globally available (depends on library expectations)
window.Lame = lamejs;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)


