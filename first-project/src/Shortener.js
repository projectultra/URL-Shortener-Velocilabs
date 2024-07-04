// src/Shortener.js

import React, { useState } from "react";

function Shortener() {
  // State to store the long URL input
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch the shortened URL
    try {
      const response = await fetch(`http://0.0.0.0:8080/shorten?url=${longURL}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const shortURL = await response.text();
      // set the shortened URL in the state
      setShortURL(shortURL);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortURL && (
        // Display the shortened URL if it exists
        <div>
          Shortened URL: <a href={shortURL}>{shortURL}</a>
        </div>
      )}
    </div>
  );
}

export default Shortener;
