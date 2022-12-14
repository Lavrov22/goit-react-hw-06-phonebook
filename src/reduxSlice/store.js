import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "reduxSlice/contactsSlice";
import { filterReducer } from "reduxSlice/filterSlice";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
}

const persistedContactsReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedContactsReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
})

export const persistor = persistStore(store);

