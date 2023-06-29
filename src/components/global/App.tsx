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
import Main from './Main';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const store = setupStore();
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
