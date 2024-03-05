import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: {
    type: "",
    text: "",
    show: false,
    error: false,
  },
};

export const LayoutSlice = createSlice({
  name: "LayoutSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (
      state,
      { payload: { type, text, show = true, error = false } }
    ) => {
      state.message = { type, text, show, error };
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoading, setMessage } = LayoutSlice.actions;

export default LayoutSlice.reducer;
