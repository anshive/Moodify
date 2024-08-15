# music/urls.py
from django.urls import path
from .views import get_moods, get_songs_by_mood
# from .views import detect_mood_from_face
from .views import detect_mood_from_text

urlpatterns = [
    path('api/moods/', get_moods, name='get_moods'),
    # path('api/detect-face-mood/', detect_mood_from_face, name='detect_face_mood'),
    path('api/detect-text-mood/', detect_mood_from_text, name='detect_text_mood'),
    path('api/songs/', get_songs_by_mood, name='get_songs_by_mood'),
]
