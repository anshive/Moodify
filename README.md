# Moodify

Moodify is a music recommendation app that suggests songs based on your current mood. The app uses text sentiment analysis to detect your mood and then provides you with music that matches it.

**Note:** This app is currently in the development stage.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Backend (Django)](#backend-django)
  - [Frontend (React)](#frontend-react)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Step 1: Clone the Project](#step-1-clone-the-project)
  - [Step 2: Download and Set Up PostgreSQL](#step-2-download-and-set-up-postgresql)
  - [Step 3: Set Up pgAdmin 4](#step-3-set-up-pgadmin-4)
  - [Step 4: Update Database Credentials](#step-4-update-database-credentials)
  - [Step 5: Set Up Spotify Developer Account](#step-5-set-up-spotify-developer-account)
  - [Step 6: Update Spotify API Credentials](#step-6-update-spotify-api-credentials)
  - [Step 7: Set Up the Backend](#step-7-set-up-the-backend)
  - [Step 8: Set Up the Frontend](#step-8-set-up-the-frontend)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.7+**
- **Node.js 14+**
- **npm (Node Package Manager)**
- **PostgreSQL 12+**
- **Git**

## Features

- **Mood Detection:** Detects your mood through facial text input.
- **Music Recommendations:** Suggests songs based on your detected mood.
- **Spotify Integration:** Uses Spotify API to fetch songs and playlists.
- **Diverse Genres:** Supports a wide variety of music genres.
- **Responsive Design:** A user-friendly interface that works across devices.

## Project Structure

The project is divided into two main parts: the backend (Django) and the frontend (React).

### Backend (Django)

- **Location:** `Moodify/music_backend`
- **Role:** Handles mood detection, manages the database, and interacts with the Spotify API.

**Key Components:**

- `settings.py`: Contains the configuration for the Django project, including database credentials.
- `views.py`: Contains the logic for mood detection and interacting with the Spotify API.
- `models.py`: Defines the data models used in the application.

### Frontend (React)

- **Location:** `Moodify/moody-music`
- **Role:** Provides the user interface, handles user inputs, and communicates with the backend.

**Key Components:**

- `App.js`: The main component that sets up the app structure and routes.
- `MoodInput.js`: Handles user input via text or image for mood detection.
- `SongSuggestions.js`: Fetches and displays the songs based on the detected mood.
- `apiService.js`: Manages backend and Spotify API API calls.

## How It Works

1. **User Interaction:** Users can input text or upload an image to detect their mood.
2. **Mood Detection:**
   - **Text:** The backend analyzes the text using the TextBlob library to determine the mood based on sentiment polarity.
3. **Song Recommendation:** Based on the detected mood, the backend calls the Spotify API to fetch playlists and songs that match the mood.
4. **Display Results:** The front end displays the recommended songs to the user, allowing them to listen directly through the app.

## Getting Started

### Step 1: Clone the Project

To get started, clone the repository from GitHub:

```bash
git clone https://github.com/your-username/moodify.git
cd moodify
```

### Step 2: Download and Set Up PostgreSQL

Download PostgreSQL 16 from the [EnterpriseDB website](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

### Step 3: Set Up pgAdmin 4

1. Open **pgAdmin 4** from the PostgreSQL folder in your Windows start menu.
2. Create a new user and set a password during creation.
3. Create a new database and make sure to set the owner of the database to the user you just created.

### Step 4: Update Database Credentials

1. Navigate to the `Moodify/music_backend` folder in your code editor.
2. Open the `settings.py` file.
3. Update the database credentials with your PostgreSQL user, password, and database name.

**Note:** Ensure that the port number of your database matches the configuration in `settings.py`.

### Step 5: Set Up a Spotify Developer Account

1. Create an account at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Create a new app in your Spotify Developer Dashboard.
3. Navigate to the settings of your newly created app and copy the **Client ID** and **Client Secret**.
4. Set the redirect URL for the app to the address where your React app renders in the browser. 
   - For local development, this would typically be `http://localhost:3000/`.
   - Add `http://localhost:3000/callback` to the redirect URLs as well.

### Step 6: Update Spotify API Credentials

1. Navigate to `Moodify/moody-music/src/components/apiService.js`.
2. Replace the placeholder values for **Client ID** and **Client Secret** with your own.

### Step 7: Set Up the Backend

1. Navigate to the `Moodify/music_backend` directory.
2. Create a virtual environment:

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Make migrations and run the server:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

### Step 8: Set Up the Frontend

1. Navigate to the `Moodify/moody-music` directory.
2. Install the required npm packages:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

## Contributing

Feel free to contribute to the project. If you have any queries or suggestions, email me at [anshivevasist@gmail.com](mailto:anshivevasist@gmail.com).
