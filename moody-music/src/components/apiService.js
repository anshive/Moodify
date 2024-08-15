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
  const blockedKeywords = [
    "happy birthday","birthday","acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", 
    "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", 
    "british", "cantopop", "chicago-house", "children", "chill", "classical", 
    "club", "comedy", "country", "dance", "dancehall", "death-metal", 
    "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", 
    "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", 
    "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", 
    "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", 
    "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", 
    "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", 
    "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", 
    "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", 
    "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", 
    "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", 
    "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", 
    "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", 
    "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", 
    "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", 
    "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", 
    "trance", "trip-hop", "turkish", "work-out", "world-music"
  ];
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

