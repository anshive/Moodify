from django.contrib import admin
from .models import Profile, Mood, Song, UserMood

# Admin Profiles can be accessed by superuser
admin.site.register(Profile)
admin.site.register(Mood)
admin.site.register(Song)
admin.site.register(UserMood)
