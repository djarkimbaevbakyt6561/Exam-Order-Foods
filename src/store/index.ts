import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { snackBarSlice } from "./snackBar";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [snackBarSlice.name]: snackBarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//стордо кандай экшен болсо, ошолорду шага диспатч кыла алат.
//in component
//const dispatch = useDispatch<AppDispatch>()

// type Props = {
//   component: FC; import from react
// };
