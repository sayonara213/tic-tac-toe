import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import themeSlice from './theme.slice';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user', 'theme'],
};

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>;
