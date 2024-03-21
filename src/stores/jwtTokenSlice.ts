import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { RootState } from "./stores";

export const tokenKey = import.meta.env.VITE_TOKEN_KEY

export interface TokenState {
    accessToken: string
    refreshToken: string
    email: string
    username: string
    roles: string[]
    id: number
}

export const getLocalTokenState = () => {
    return localStorage.getItem(tokenKey) !== null ? JSON.parse(localStorage.getItem(tokenKey)!) as TokenState:null;
};

export const isTokenAdmin = (accessToken: string) => {
  let decodedToken: any = jwtDecode(accessToken)
  if (decodedToken.role === "ADMIN") return true

  return false
};

const initialState: TokenState | null = getLocalTokenState()

export const tokenSlice = createSlice({
    name: tokenKey,
    initialState,
    reducers: {
      setToken: (state, action: PayloadAction<TokenState>) => {
        state = action.payload
        localStorage.setItem(tokenKey, JSON.stringify(state))
      },
    },
});

export const { setToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => {
    if (localStorage.getItem(tokenKey) === null) {
    }
    
    return state.token;
};
  
export default tokenSlice.reducer;