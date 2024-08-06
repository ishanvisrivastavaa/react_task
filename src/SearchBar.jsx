import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, setQuery } from "./store";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { results, query } = useSelector((state) => state.search);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    // console.log("query", query);

    if (query) {
      // console.log("query", query);
      dispatch(fetchSearchResults(query));
    }
  }, [query, dispatch]);

  const handleInputChange = (event) => {
    dispatch(setQuery(event.target.value));
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  const handleCloseModal = () => {
    setSelectedResult(null);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <div>
          {results.length > 0 ? (
            <List>
              {results.map((result) => (
                <ListItem
                  button
                  key={result.pageid}
                  onClick={() => handleResultClick(result)}
                >
                  <ListItemText primary={result.title} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No results found. Please search with a valid name.
            </Typography>
          )}
        </div>
      )}
      {selectedResult && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedResult.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: selectedResult.snippet }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
