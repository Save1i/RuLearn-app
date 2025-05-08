import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Test from "./pages/Test";
import ProfileUser from "./pages/ProfileUser";
import Swipe from "./pages/LearnWords";
import ChooseCategory from "./pages/ChooseCategory";
import WordInDictionary from "./pages/WordInDictionary";

import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TEST_ROUTE,
  PROFILE_ROUTE,
  SWIPE_ROUTE,
  CHOOSECATEGORY_ROUTE,
  WORDS_ROUTE,
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
  {
    path: SWIPE_ROUTE,
    Component: Swipe,
  },
  {
    path: CHOOSECATEGORY_ROUTE,
    Component: ChooseCategory,
  },
  {
    path: WORDS_ROUTE + "/:dictionaryId",
    Component: WordInDictionary,
  },
];
