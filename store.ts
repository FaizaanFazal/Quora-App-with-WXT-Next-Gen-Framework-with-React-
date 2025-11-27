import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Saved questions slice
const savedSlice = createSlice({
  name: 'saved',
  initialState: [] as string[],
  reducers: {
    addQuestion: (state, action: PayloadAction<string>) => {
      const q = action.payload.trim();
      if (q && !state.includes(q)) state.push(q);
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      const idx = state.indexOf(action.payload);
      if (idx !== -1) state.splice(idx, 1);
    },
  },
});

export const { addQuestion, removeQuestion } = savedSlice.actions;

export const store = configureStore({
  reducer: {
    saved: savedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
