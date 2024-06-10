import { configureStore } from "@reduxjs/toolkit";
import { companySlice } from "./slices/companySlice";
import { staffSlice } from "./slices/staffSlice";

export const store = configureStore({
  reducer: {
    companies: companySlice.reducer,
    staff: staffSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch