import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    query: "",
  },
  reducers: {
    setResults(state, action) {
      // console.log("state", state);

      state.results = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
});
export const { setResults, setQuery } = searchSlice.actions;
export const fetchSearchResults = (query) => async (dispatch) => {
  if (query) {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${query}`
      );
      dispatch(setResults(response.data.query.search));
      // console.log("response", response);
    } catch (error) {
      console.error("Failed results:", error);
    }
  }
};
const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});
export default store;
