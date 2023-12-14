import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PropertiesContextProvider from "./context/PropertiesContextProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PropertiesContextProvider>
            <App/>
        </PropertiesContextProvider>
    </React.StrictMode>
);
