import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import SearchBar from "./SearchBar";
import { Typography } from "@mui/material";

function App() {
  return (
    <>
      <Provider store={store}>
        <Typography variant="h4" gutterBottom>
          Api Search result
        </Typography>
        <SearchBar />
      </Provider>
    </>
  );
}

export default App;
