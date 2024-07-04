package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strings"
)

// Map to store the short URL and long URL
var (
	urlStore = make(map[string]string)
)

func main() {
	http.HandleFunc("/", handleRedirect)

	// Handle the shorten endpoint
	http.HandleFunc("/shorten", handleShorten)
	log.Println("Starting server on 0.0.0.0:8080")

	// Start the server on this ip and port
	http.ListenAndServe("0.0.0.0:8080", nil)
}

func handleRedirect(w http.ResponseWriter, r *http.Request) {

	// Get the short URL from the path
	shortURL := strings.TrimPrefix(r.URL.Path, "/")
	log.Printf("Received redirect request for short URL: %s", shortURL)

	// Look up the corresponding long URL
	longURL := urlStore[shortURL]

	// If the long URL is found, redirect to it
	if longURL != "" {
		http.Redirect(w, r, longURL, http.StatusFound)
	} else {
		http.NotFound(w, r)
	}
}

func handleShorten(w http.ResponseWriter, r *http.Request) {

	// Get the long URL from the query parameters
	longURL := r.URL.Query().Get("url")
	if longURL == "" {
		log.Println("Missing URL parameter")
		http.Error(w, "Missing URL parameter", http.StatusBadRequest)
		return
	}

	log.Printf("Received request to shorten URL: %s", longURL)

	// Generate a short URL and store the mapping
	shortURL := generateShortURL()
	urlStore[shortURL] = longURL

	fmt.Fprintf(w, "http://%s/%s", r.Host, shortURL)
}

func generateShortURL() string {

	// Generate a random 6 character string
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, 6)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	shortURL := string(b)
	return shortURL
}
