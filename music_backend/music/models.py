from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite_mood = models.ForeignKey('Mood', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.user.username

class Mood(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100, blank=True, null=True)
    mood = models.ForeignKey(Mood, on_delete=models.SET_NULL, null=True, related_name='songs')
    spotify_url = models.URLField(max_length=200, blank=True, null=True)
    preview_url = models.URLField(max_length=200, blank=True, null=True)
    cover_image_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.title} by {self.artist}"

class UserMood(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.ForeignKey(Mood, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} was {self.mood.name} on {self.timestamp}"
