from textblob import TextBlob
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Song, Mood
from .serializers import MoodSerializer, SongSerializer
import cv2
import numpy as np
from django.http import JsonResponse
# from tensorflow.keras.models import load_model
from rest_framework.decorators import api_view
import os

model_path = os.path.join(os.path.dirname(__file__), 'models/emotion_model.h5')
# emotion_model = load_model(model_path)

@api_view(['GET'])
def get_moods(request):
    moods = Mood.objects.all()
    serializer = MoodSerializer(moods, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_songs_by_mood(request):
    mood_name = request.GET.get('mood')
    mood = Mood.objects.filter(name__iexact=mood_name).first()
    if mood:
        songs = Song.objects.filter(mood=mood)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)
    return Response({'error': 'Mood not found'}, status=404)


@api_view(['POST'])
def detect_mood_from_face(request):
    try:
        image_file = request.FILES.get('image')
        if not image_file:
            return JsonResponse({'error': 'No image provided'}, status=400)

        # Convert image to numpy array
        np_img = np.fromstring(image_file.read(), np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # Pre-process the image (resize, convert to grayscale, etc.)
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(gray_img, scaleFactor=1.3, minNeighbors=5)

        if len(faces) == 0:
            return JsonResponse({'error': 'No face detected'}, status=400)

        for (x, y, w, h) in faces:
            face = gray_img[y:y+h, x:x+w]
            face = cv2.resize(face, (48, 48))
            face = face.reshape(1, 48, 48, 1) / 255.0

            # Predict emotion
            emotion_prediction = emotion_model.predict(face)
            emotion_label = np.argmax(emotion_prediction)

        # Map the emotion label to a mood
        mood_map = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Happy', 4: 'Sad', 5: 'Surprise', 6: 'Neutral'}
        detected_mood = mood_map[emotion_label]

        return JsonResponse({'mood': detected_mood})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
                    
                    
@api_view(['POST'])
def detect_mood_from_text(request):
    try:
        user_text = request.data.get('text')
        if not user_text:
            return JsonResponse({'error': 'No text provided'}, status=400)

        analysis = TextBlob(user_text)
        polarity = analysis.sentiment.polarity

        if polarity >= 0.5:
            detected_mood = 'Happy'
        elif polarity >= 0.3 and polarity < 0.5:
            detected_mood = 'Holidays'
        elif polarity >= 0.2 and polarity < 0.3:
            detected_mood = 'Road-trip'
        elif polarity >= 0.1 and polarity < 0.2:
            detected_mood = 'Study'
        elif polarity >= 0.0 and polarity < 0.1:
            detected_mood = 'Chill'
        elif polarity >= -0.1 and polarity < 0.0:
            detected_mood = 'Sleep'
        elif polarity >= -0.2 and polarity < -0.1:
            detected_mood = 'Rainy-day'
        elif polarity >= -0.3 and polarity < -0.2:
            detected_mood = 'Romance'
        elif polarity >= -0.5 and polarity < -0.3:
            detected_mood = 'Sad'
        else:
            detected_mood = 'Party'
        
        return JsonResponse({'mood': detected_mood})
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
