import React from 'react';
import '../../App.css';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from './theme';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Theme>
  );
}

export default App;
