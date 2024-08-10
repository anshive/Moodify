import React, { useState, useEffect } from 'react';
import { fetchMoods, fetchSongsByMood, authenticateSpotify } from './apiService';

export const fetchSongs = async (mood) => {
  try {
    const fetchedSongs = await fetchSongsByMood(mood);
    return fetchedSongs;
  } catch (error) {
    console.error('Error fetching songs', error);
    alert('Failed to fetch songs from Spotify.');
    return [];
  }
};

const SongSuggestions = ({ songs }) => {
  return (
    <div>
      {songs.length > 0 ? (
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              {song.title} by {song.artist} -{' '}
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs available for this mood.</p>
      )}
    </div>
  );
};

export default SongSuggestions;
