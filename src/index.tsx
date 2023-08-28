import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShippingForm from "./ShippingForm";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

   /* <App />*/
    <ShippingForm />
);

