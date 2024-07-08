// src/Shortener.js

import React, { useState } from "react";

function Shortener() {
  // State to store the long URL input
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

    // Get the base URL dynamically
    const getBaseURL = () => {
      const { protocol, hostname, port } = window.location;
      return `${protocol}//${hostname}:${port}`;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch the shortened URL
    try {
      const baseURL = getBaseURL();
      const response = await fetch(`${baseURL}/shorten?url=${longURL}`);
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

  // Function to copy the shortened URL to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL).then(() => {
      alert("Shortened URL copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
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
          <br>
          </br>
          <button onClick={handleCopy}>Click to Copy</button>
        </div>
      )}
    </div>
  );
}

export default Shortener;
