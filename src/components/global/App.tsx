import '../../App.css';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from './theme';
import AppRouter from './router/AppRouter';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../constants/firebase';
import { getFirestore } from 'firebase/firestore';
import { setupStore } from '../../redux/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const store = setupStore();
const persistor = persistStore(store);

function App() {
  return (
    <Theme>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Theme>
  );
}

export default App;
