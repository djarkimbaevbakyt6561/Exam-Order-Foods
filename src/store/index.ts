import { configureStore } from "@reduxjs/toolkit";
import {
  adminModalReducer,
  adminModalSlice,
} from "./admin-modal/admin.modal.slice";
import { authSlice } from "./auth/auth.slice";
import { basketReducer, basketSlice } from "./basket/basket.slice";
import { foodsReducer, foodsSlice } from "./foods/foods.slice";
import { lightModeReducer, lightModeSlice } from "./light.mode";
import { mealsReducer, mealsSlice } from "./meals/meals.slice";
import { snackBarSlice } from "./snack.bar";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [snackBarSlice.name]: snackBarSlice.reducer,
    [adminModalSlice.name]: adminModalReducer,
    [foodsSlice.name]: foodsReducer,
    [mealsSlice.name]: mealsReducer,
    [basketSlice.name]: basketReducer,
    [lightModeSlice.name]: lightModeReducer,
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
