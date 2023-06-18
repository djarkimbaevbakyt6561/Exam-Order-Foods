import React from "react";
import { Route, Routes } from "react-router-dom";
// import { SignIn } from "../pages/SignIn";
// import { SignUp } from "../pages/SignUp";
// import { AdminLayout } from "../layout/AdminLayout";
// import { Meals } from "../components/meals/Meals";
// import { useSelector } from "react-redux";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { USERS_ROLE } from "../constants";
// import { MealLayaout } from "../layout/MealLayaout";
// import { UserLayout } from "../layout/UserLayout";
// import { Admin } from "../pages/Admin";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./ProtectedRoutes";
import { ROLES } from "../utils/constants";
import { UserLayout } from "../layout/user/UserLayout";
import { AdminLayout } from "../layout/admin/AdminLayout";
import { MealLayout } from "../layout/mealLayout/MealLayout";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
export const MainRoutes = () => {
  const role = useSelector((state: RootState) => state.auth.user.role);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            isAllowed={[ROLES.GUEST, ROLES.USER].includes(role)}
            fallBacPath="/admin"
            component={UserLayout}
          />
        }
      >
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={[ROLES.GUEST, ROLES.USER].includes(role)}
              fallBacPath="/admin"
              component={MealLayout}
            />
          }
        />
        <Route
          path="signin"
          element={
            <ProtectedRoute
              isAllowed={[ROLES.GUEST, ROLES.USER].includes(role)}
              fallBacPath={role === ROLES.ADMIN ? "/admin" : "/"}
              component={SignIn}
            />
          }
        />

        <Route
          path="signup"
          element={
            <ProtectedRoute
              isAllowed={[ROLES.GUEST, ROLES.USER].includes(role)}
              fallBacPath={role === ROLES.ADMIN ? "/admin" : "/"}
              component={SignUp}
            />
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute
            isAllowed={[ROLES.ADMIN].includes(role)}
            fallBacPath="/"
            component={AdminLayout}
          />
        }
      >
        <Route index element={<h1>Meals</h1>} />
      </Route>
    </Routes>
  );
};
