# music/management/commands/populate_db.py
from django.core.management.base import BaseCommand
from music.models import Mood, Song

class Command(BaseCommand):
    help = 'Populate the database with initial data'

    def handle(self, *args, **kwargs):
        # Add Moods
        moods = ['Happy', 'Sad', 'Energetic', 'Calm']
        for mood_name in moods:
            mood, created = Mood.objects.get_or_create(name=mood_name)
            if created:
                self.stdout.write(f'Created mood: {mood_name}')

        # Add Songs (Example songs for each mood)
        songs = [
            {'title': 'Happy Song', 'artist': 'Artist1', 'mood': 'Happy'},
            {'title': 'Sad Song', 'artist': 'Artist2', 'mood': 'Sad'},
            {'title': 'Energetic Song', 'artist': 'Artist3', 'mood': 'Energetic'},
            {'title': 'Calm Song', 'artist': 'Artist4', 'mood': 'Calm'},
        ]

        for song_data in songs:
            mood = Mood.objects.get(name=song_data['mood'])
            song, created = Song.objects.get_or_create(
                title=song_data['title'],
                artist=song_data['artist'],
                mood=mood
            )
            if created:
                self.stdout.write(f'Added song: {song.title} by {song.artist}')
