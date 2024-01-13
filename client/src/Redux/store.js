import { configureStore } from "@reduxjs/toolkit";
import {docSlice} from './Slice/docSlice';

const store = configureStore({
  reducer: {
    [docSlice.name]: docSlice.reducer,
  },
});

export default store;