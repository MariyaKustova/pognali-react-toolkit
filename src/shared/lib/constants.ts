export const BASE_URL = "http://localhost:3000";

// Routes

export const ROUTE_PATH = {
  MAIN: "/",
  DIALOGS: "/dialogs",
  PROFILE: "/profile",
  PROFILE_GOOGLE: "/profile-google",
  MUSIC: "/music",
  SETTINGS: "/settings",
  USERS: "/users",
  LOGIN: "/login",
  O_AUTH: "/oauth",
  O_AUTH_ERROR: "/oauth/error",
};

export const HASH_STAR = "/*";

export const routes = [
  { to: ROUTE_PATH.PROFILE, title: "Profile" },
  { to: ROUTE_PATH.DIALOGS, title: "Dialogs" },
  { to: ROUTE_PATH.USERS, title: "Users" },
  { to: ROUTE_PATH.PROFILE_GOOGLE, title: "Profile Google" },
  { to: ROUTE_PATH.MUSIC, title: "Music" },
  { to: ROUTE_PATH.SETTINGS, title: "Settings" },
];
