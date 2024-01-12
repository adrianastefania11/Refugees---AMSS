import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          {routes.map( (route, i) =>  
              <Route path={route.path} element={route.component} key={i}/> 
          )}
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
