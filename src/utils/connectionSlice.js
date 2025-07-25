import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => (state = action.payload),
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
