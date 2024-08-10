import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { fetchSongs } from './SongSuggestions';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function MoodInput({ onMoodSelect, onSongsFetched }) {
  const [inputMethod, setInputMethod] = useState('dropdown');
  const [selectedMood, setSelectedMood] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedMood, setDetectedMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let mood = '';

      if (inputMethod === 'dropdown' && selectedMood) {
        mood = selectedMood;
      } else if (inputMethod === 'text' && textInput) {
        const response = await axios.post(`${API_BASE_URL}/detect-text-mood/`, { text: textInput });
        mood = response.data.mood;
        console.log(mood)
      } else if (inputMethod === 'face') {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post(`${API_BASE_URL}/detect-face-mood/`, formData);
        mood = response.data.mood;
      }

      setDetectedMood(mood);
      onMoodSelect(mood);

      // Fetch songs using the fetchSongs function from SongSuggestions.js
      const fetchedSongs = await fetchSongs(mood);
      onSongsFetched(fetchedSongs);

    } catch (error) {
      console.error('Error detecting mood or fetching songs:', error);
      alert('Failed to detect mood or fetch songs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Select Input Method</Form.Label>
        <Form.Check
          type="radio"
          label="Dropdown"
          value="dropdown"
          checked={inputMethod === 'dropdown'}
          onChange={() => setInputMethod('dropdown')}
        />
        <Form.Check
          type="radio"
          label="Text Input"
          value="text"
          checked={inputMethod === 'text'}
          onChange={() => setInputMethod('text')}
        />
        <Form.Check
          type="radio"
          label="Face Recognition"
          value="face"
          checked={inputMethod === 'face'}
          onChange={() => setInputMethod('face')}
        />
      </Form.Group>

      {inputMethod === 'dropdown' && (
        <Form.Group controlId="moodSelect">
        <Form.Label>Select Your Mood/Genre</Form.Label>
        <Form.Control
          as="select"
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          <option value="">Choose...</option>
          {[
            "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", 
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
          ].map((mood) => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </Form.Control>
      </Form.Group>
      )}

      {inputMethod === 'text' && (
        <Form.Group controlId="textInput">
          <Form.Label>Express Your Feelings</Form.Label>
          <Form.Control
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="How are you feeling today?"
          />
        </Form.Group>
      )}

      {inputMethod === 'face' && (
        <Form.Group controlId="fileInput">
          <Form.Label>Upload Your Image</Form.Label>
          <Form.Control type="file" accept="image/*" />
        </Form.Group>
      )}

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Songs'}
      </Button>

      {detectedMood && <h2>Detected Mood: {detectedMood}</h2>}
    </Form>
  );
}

export default MoodInput;
