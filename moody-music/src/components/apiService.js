import axios from 'axios';

const client_id = 'ypur-client-id';//Your Spotify Client ID
const client_secret = 'your-client secret';//Your Spotify Client Secret

let accessToken = null;

// Function to authenticate with Spotify API and acquire access token
const authenticateSpotify = async () => {
  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials'
  };

  try {
    const response = await axios(authOptions);
    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Error authenticating with Spotify', error);
    throw new Error('Spotify authentication failed');
  }
};

// Function to fetch songs based on mood (same as before)
export const fetchSongsByMood = async (mood) => {
  if (!accessToken) {
    await authenticateSpotify();
  }

  const result = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      q: mood,
      type: 'playlist',
      limit: 5,
      market: "IN"//Indian Gener Songs 
    }
  });

  const playlists = result.data.playlists.items;
  let tracks = [];

  // Keywords to filter out
  const blockedKeywords = ['happy birthday', 'birthday', 'neutral', 'sad'];

  for (let playlist of playlists) {
    const playlistTracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        limit: 10
      }
    });

    // Filter out tracks containing blocked keywords
    const filteredTracks = playlistTracks.data.items.filter(item => {
      const trackName = item.track.name.toLowerCase();
      return !blockedKeywords.some(keyword => trackName.includes(keyword));
    });

    tracks = tracks.concat(filteredTracks.map(item => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', '),
      url: item.track.external_urls.spotify,
      albumImageUrl: item.track.album.images[0]?.url
    })));
  }

  return tracks;
};

