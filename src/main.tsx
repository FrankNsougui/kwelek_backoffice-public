import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from './stores/stores';
import Router from './router';
import "./assets/css/app.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
       <Router/>
    </Provider>
  </BrowserRouter>
)
