import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Test from "./pages/Test";
import ProfileUser from "./pages/ProfileUser";
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TEST_ROUTE,
  PROFILE_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: TEST_ROUTE + "/:taskId",
    Component: Test,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfileUser,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
];
