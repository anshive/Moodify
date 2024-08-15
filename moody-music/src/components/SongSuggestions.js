import React from 'react';
import {  fetchSongsByMood } from './apiService';

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
            <li key={song.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              {/* Added Image tag */}
              <img 
                src={song.albumImageUrl} 
                alt={`${song.title} album cover`} 
                style={{ width: '60px', height: '60px', marginRight: '10px' }} 
              />
              <div>
                <strong>{song.title}</strong> by {song.artist} -{' '}
                <a href={song.url} target="_blank" rel="noopener noreferrer">
                  Listen on Spotify
                </a>
              </div>
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
