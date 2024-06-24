from .models import FAQ, User, Level, PhotoUser, Trip, TripUser, StateSelection
from django.db.models import Sum
from rest_framework import serializers
from datetime import datetime

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer']

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ['id', 'name', 'max_distance']

class CustomDateField(serializers.DateField):
    def to_representation(self, value):
        if isinstance(value, datetime):
            value = value.date()
        return super().to_representation(value)

class UserSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=False, read_only=True)
    birthday = CustomDateField(required=False, allow_null=True, format="%Y-%m-%d", input_formats=["%Y-%m-%d"])
    trip_count = serializers.IntegerField(read_only=True)
    total_time_sp = serializers.FloatField(read_only=True)
    
    class Meta:
        model = User
        fields = "__all__"

    def to_representation(self, instance):
        # Annotate trip_count to each user instance
        valid_states = [StateSelection.YES, StateSelection.RATE, StateSelection.END]
        instance.trip_count = TripUser.objects.filter(user=instance,
                                                     state__in=valid_states).count()
        times_user = TripUser.objects.filter(
            user=instance, 
            state__in=valid_states).aggregate(total_time=Sum('trip__time_sp'))['total_time']
        instance.total_time_sp = round(times_user / 60, 1) if times_user is not None else 0

        return super().to_representation(instance)

class PhotoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoUser
        fields = ['user', 'photo']

    def create(self, validated_data):
        user = validated_data.get('user')
        photo = validated_data.get('photo')

        # Пытаемся найти существующую запись PhotoUser для данного user
        photo_user, created = PhotoUser.objects.update_or_create(user=user, defaults={'photo': photo})

        return photo_user

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.save()
        return instance
    
class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        date_format = '%d.%m.%Y, %H:%M'
        representation['date'] = instance.date.strftime(date_format)
        return representation
    
class TripUserSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)
    class Meta:
        model = TripUser
        fields = '__all__'