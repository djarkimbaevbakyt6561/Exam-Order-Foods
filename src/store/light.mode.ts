import { createSlice } from "@reduxjs/toolkit";
interface IToggle {
  checked: boolean;
  lightMode: boolean;
}
const initialState: IToggle = {
  checked: true,
  lightMode: true,
};

export const lightModeSlice = createSlice({
  name: "lightMode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.lightMode = !state.lightMode;
      state.checked = !state.checked;
    },
  },
});

export const lightModeActions = lightModeSlice.actions;
export const lightModeReducer = lightModeSlice.reducer;
