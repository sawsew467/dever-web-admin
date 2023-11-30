import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import app from "./slices/app";
import userInfor from "./slices/userInfor";
import sidebarControl from "./slices/sideBarControl";
import authMiddleware from "./authMiddleware";
export const store = configureStore({
  reducer: {
    app: app,
    userInfor : userInfor,
    sidebarControl: sidebarControl
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(authMiddleware), 
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
