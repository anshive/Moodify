import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MoodInput from './components/MoodInput';
import SongSuggestions from './components/SongSuggestions';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [mood, setMood] = useState('');
  const [songs, setSongs] = useState([]);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
  };

  const handleSongsFetched = (fetchedSongs) => {
    setSongs(fetchedSongs);
  };

  return (
    <Container fluid className="p-3">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Mood-Based Music Recommender</h1>
          <MoodInput onMoodSelect={handleMoodSelect} onSongsFetched={handleSongsFetched} />
          <SongSuggestions songs={songs} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
