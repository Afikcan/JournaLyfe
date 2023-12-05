import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../data/baseUrl';

const initialState = {
  isLogged: false,
  token: null,
  user: null,
  notifications: null,
};

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
  try {
    const response = await fetch(baseUrl + '/auth/verify', {
      method: 'GET',
      headers: { token: localStorage.token },
    });

    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
});

export const fetchUser = createAsyncThunk('user/getUser', async userId => {
  try {
    const response = await fetch(baseUrl + `/user/${userId}`, {
      method: 'GET',
    });

    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, isLogged } = action.payload;
      state.token = token;
      state.isLogged = isLogged;
    },

    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },



    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLogged = false;

      localStorage.removeItem('token');
    },
  },
});

export const {
  setAuth,
  setUser,
  logOut
} = authSlice.actions;

export default authSlice.reducer;

export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;
export const getIsLogged = state => state.auth.isLogged;