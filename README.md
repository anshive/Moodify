# Moodify(Still in Development)

Moodify is a web application that suggests songs based on your mood. The app allows users to detect their mood via text input, face recognition, or by selecting from a dropdown menu, and then recommends region-specific songs using the Spotify API.

## Features
- **Mood Detection**: Detect mood from text, face, or select from a dropdown.
- **Spotify Integration**: Fetches mood-based playlists and songs from Spotify.
- **Region-Specific Recommendations**: Focuses on providing song suggestions from the Indian region.

## Prerequisites
- Python 3.x
- React.js and npm
- PostgreSQL

## Backend Setup

1. **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd Moodify/music_backend
    ```

2. **Create a Virtual Environment:**
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Setup PostgreSQL Database:**
    - Create a PostgreSQL database.
    - Update the `settings.py` file with your database credentials.

5. **Apply Migrations:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

6. **Create a Superuser:**
    ```bash
    python manage.py createsuperuser
    ```

7. **Populate the Database (Optional):**
    - You can use Django admin or create a script to populate the moods database.

8. **Run the Backend Server:**
    ```bash
    python manage.py runserver
    ```

## Frontend Setup

1. **Navigate to the Frontend Directory:**
    ```bash
    cd ../moody-music
    ```

2. **Install Node Modules:**
    ```bash
    npm install
    ```

3. **Start the Frontend Server:**
    ```bash
    npm start
    ```

## Project Structure

### Backend

- **Django Project**: Handles user authentication, mood detection logic, and serves the API endpoints.
- **API Endpoints**:
  - `/api/detect-text-mood/`: Accepts text input and detects mood.
  - `/api/detect-face-mood/`: Accepts an image and detects mood using face recognition.
  - `/api/songs`: Fetches songs based on the detected mood.

### Frontend

- **React Components**:
  - `App.js`: Main container that handles the flow between mood input and song suggestions.
  - `MoodInput.js`: Allows users to select or input their mood via dropdown, text, or image.
  - `SongSuggestions.js`: Displays the list of songs fetched based on the selected mood.
  - **Logic**:
    - Mood detection logic connects with the backend APIs to fetch detected mood.
    - Once the mood is detected, the frontend uses the Spotify API to fetch region-specific playlists and songs.

### Spotify Integration

- **Authentication**: The app uses Spotify's client credentials flow to authenticate and retrieve an access token.
- **Song Fetching**: Based on the detected mood, the app searches for playlists using the Spotify API, and retrieves a list of songs with a focus on the Indian region.

## How It Works

1. **User Interaction**: The user selects a mood detection method (dropdown, text, or face).
2. **Mood Detection**: The input is sent to the backend for mood detection.
3. **Song Fetching**: The detected mood is used to fetch relevant playlists and songs from Spotify.
4. **Display Songs**: The fetched songs are displayed to the user, with options to listen on Spotify.

## Deployment
For deployment, consider using services like Heroku, AWS, or DigitalOcean for the backend, and Netlify or Vercel for the frontend.

## Contribution
Feel free to contribute by opening issues or submitting pull requests.
