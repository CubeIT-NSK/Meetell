from .models import FAQ, User, Level, PhotoUser, Trip, TripUser, StateSelection, Friend
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
    friends = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()

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
    
    def get_friends(self, obj):
        first_friendships = Friend.objects.filter(first_friend=obj)
        second_friendships = Friend.objects.filter(second_friend=obj)
        
        friends = set()
        for friendship in first_friendships:
            friends.add(friendship.second_friend)
        for friendship in second_friendships:
            friends.add(friendship.first_friend)
        
        return UserSimpleSerializer(friends, many=True).data
    
    def get_photo(self, obj):
        photo_user = PhotoUser.objects.filter(user=obj).first()
        return photo_user.photo if photo_user else None

class PhotoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoUser
        fields = ['user', 'photo', 'photo_low']

    def create(self, validated_data):
        user = validated_data.get('user')
        photo = validated_data.get('photo')
        photo_low = validated_data.get('photo_low')

        # Пытаемся найти существующую запись PhotoUser для данного user
        photo_user, created = PhotoUser.objects.update_or_create(
            user=user, defaults={'photo': photo, 'photo_low': photo_low})

        return photo_user

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.photo_low = validated_data.get('photo_low', instance.photo_low)
        instance.save()
        return instance
    
class TripSerializer(serializers.ModelSerializer):
    registered_users = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        date_format = '%d.%m.%Y, %H:%M'
        representation['date'] = instance.date.strftime(date_format)
        return representation
    
    def get_registered_users(self, obj):
        trip_users = TripUser.objects.filter(trip=obj)
        return TripUserSimpleSerializer(trip_users, many=True).data

class TripUserSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)
    class Meta:
        model = TripUser
        fields = '__all__'

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['first_friend', 'second_friend']

class UserSimpleSerializer(serializers.ModelSerializer):
    photo_low = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['tg_id', 'level', 'user_name', 'name', 'birthday', 'sex', 'photo_low']

    def get_photo_low(self, obj):
        photo_user = PhotoUser.objects.filter(user=obj).first()
        return photo_user.photo_low if photo_user else None

class TripUserSimpleSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = TripUser
        fields = ['user']