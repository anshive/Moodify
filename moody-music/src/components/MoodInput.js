import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { fetchSongs } from './SongSuggestions';

const API_BASE_URL = 'http://127.0.0.1:8000/api';// Adjust this Url according to your backend Djnago API host URL

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
          <Form.Label>Select Your Mood</Form.Label>
          <Form.Control
            as="select"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            {/* basic moods fetching like happy, sad etc */}
            <option value="">Choose...</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="energetic">Energetic</option>
            <option value="calm">Calm</option>
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
