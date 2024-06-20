from .models import FAQ, User, Level
from rest_framework import serializers

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer']

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ['id', 'name', 'max_distance']

class UserSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = ['tg_id', 'user_name', 'level', 'distance', 'birthday', 'sex', 'ratting']