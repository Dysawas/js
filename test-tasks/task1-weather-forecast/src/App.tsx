import React from 'react';
import Navigation from './components/Navigation';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  return (
    <div className="container lg mx-auto">
      <Navigation></Navigation>
      {location.pathname === "/" && <p className="text-center">Прогноз погоды</p>}
      <Outlet></Outlet>
    </div>
  );
}

export default App;
