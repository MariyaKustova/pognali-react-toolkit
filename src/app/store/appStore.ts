import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import authReducer from "../../entities/auth/model/authSlice";
import dialogsReducer from "../../entities/dialogs/model/dialogsSlice";
import navbarReducer from "../../entities/friends/model/friendsSlice";
import profileReducer from "../../entities/profile/model/profileSlice";
import securityReducer from "../../entities/auth/model/securitySlice";
import usersReducer from "../../entities/users/model/usersSlice";
import postsReducer from "../../entities/posts/model/postsSlice";
import ErrorsReducer from "../../entities/errors/model/errorsSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    dialogs: dialogsReducer,
    navbar: navbarReducer,
    profile: profileReducer,
    security: securityReducer,
    usersPage: usersReducer,
    posts: postsReducer,
    errors: ErrorsReducer,
  },
});

export default store;
