import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./playerSlice";
import storage from "redux-persist/lib/storage";
import {
    createStateSyncMiddleware,
    initMessageListener
} from "redux-state-sync";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

export const store = configureStore({
    reducer: {
        players: persistReducer(
            {
                key: "players",
                storage
            },
            playersReducer
        )
    },
    middleware: (getDefaultMiddleware): any =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat(
            createStateSyncMiddleware({
                blacklist: [PERSIST, PURGE]
            })
        )
});
initMessageListener(store);

export let persistor = persistStore(store);
