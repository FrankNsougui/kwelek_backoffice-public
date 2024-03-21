import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import sideMenuReducer from "./sideMenuSlice";
import darkModeReducer from "./darkModeSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import tokenReducer from "./jwtTokenSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    sideMenu: sideMenuReducer,
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;