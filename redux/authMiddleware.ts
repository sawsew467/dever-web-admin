import { Middleware } from "@reduxjs/toolkit";
import { login, logout } from '../redux/slices/userInfor';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === login.type) {
    const userInfo = action.payload.user;
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
  }
  if (action.type === logout.type) {
    localStorage.removeItem('currentUser');
  }

  if (action.type === "@@INIT" || action.type === "@@redux/INIT") {
    const savedUserString = localStorage.getItem("currentUser");
    if (savedUserString) {
      const savedUser = JSON.parse(savedUserString);
      store.dispatch(login(savedUser));
    }
  }
     
  return next(action);
}

export default authMiddleware;





