import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    //action type string
    'suggestion/fetchSuggestion',
    // callback function
    async () => {
      const res = await fetch('http://localhost:3004/api/suggestion').then(
        (response) => response.json()
      )
      console.log('got response:', res.data)
      return res.data
    }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSuggestion.pending]: (state) => {
      state.loading = true
      state.error = false
    },
    [fetchSuggestion.fulfilled]: (state, action) => {
      state.loading = false
      state.suggestion = action.payload
    },
    [fetchSuggestion.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
