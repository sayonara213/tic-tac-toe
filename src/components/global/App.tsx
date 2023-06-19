import React, { useEffect } from 'react';
import '../../App.css';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from './theme';
import AppRouter from './router/AppRouter';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../constants/firebase';
import { getFirestore } from 'firebase/firestore';
import { generateUid } from '../../services/auth';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  useEffect(() => {
    generateUid();
  }, []);

  return (
    <Theme>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Theme>
  );
}

export default App;
