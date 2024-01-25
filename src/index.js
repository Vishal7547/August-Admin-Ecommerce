import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store'; 
import  { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/userProvider';
import { OrderProvider } from './context/orderProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
         <UserProvider>
    <OrderProvider>
    <Provider store={store}>
    
    <App />

    <Toaster/>
    </Provider>
    </OrderProvider>
    </UserProvider>
  </React.StrictMode>

);

