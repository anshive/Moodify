import axios from 'axios';

const client_id = 'your-client-id';//add your client id by creating an app in spotify developer dashboard
const client_secret = 'your-client-secret';//access your client secret in your app settings

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
      q: mood,// passing the parameter
      type: 'playlist',// type of file 'playlist'
      limit: 2 ,// number of playlists to fetch 
      market: 'IN'//specific to india still needs changes to add
    }
  });

  const playlists = result.data.playlists.items;
  let tracks = [];

  for (let playlist of playlists) {
    const playlistTracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        limit: 10,// number of songs to fetch from the playlists
        market: 'IN'// region specific
      }
    });
    tracks = tracks.concat(playlistTracks.data.items.map(item => item.track));
  }

  return tracks.map(track => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    url: track.external_urls.spotify
  }));
};
