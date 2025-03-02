import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "../redux/slices/appSlice";
import { domainSlice } from "../redux/slices/domainSlice";
import { userSlice } from "../redux/slices/userSlice";

export const store = configureStore({
	reducer: {
		domain: domainSlice.reducer,
		user: userSlice.reducer,
		app: appSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
