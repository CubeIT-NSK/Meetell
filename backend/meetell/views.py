from rest_framework.decorators import api_view
from rest_framework import status
from .models import (FAQ, User, SexSelection, PhotoUser, Trip, City, TripUser, Level)
from .serializers import (FAQSerializer, UserSerializer, PhotoUserSerializer, TripSerializer,
                          TripUserSerializer)
from django.http import JsonResponse
from django.core.exceptions import BadRequest
from django.conf import settings

import requests
import random
import datetime

routes_novosibirsk = [
    "Исторический центр Новосибирска",
    "Прогулка по набережной Оби",
    "Академгородок и окрестности",
    "Музеи и галереи Новосибирска",
    "Парк культуры и отдыха Центральный",
    "Театральный маршрут",
    "Зеленые зоны Новосибирска",
    "Романтический вечер у Оперного театра",
    "Архитектурные достопримечательности",
    "Архитектурные достопримечательности Новосибирска в тихом центре города. Старинные здания, Достижения прошлых столетий в сфере строительства",
    "Культурное наследие Новосибирска"
]

@api_view(['GET'])
def get_faq(request, format=None):
    faq = FAQ.objects.all()
    serializer = FAQSerializer(faq, many=True)
    response = JsonResponse(serializer.data, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@api_view(['POST'])
def get_trips(request, format=None):
    data = request.data
    len_db_trips = Trip.objects.count()
    
    if len_db_trips == 0:
        start_date = datetime.datetime.strptime(f"{data['date']} {data['timeStart']}", '%Y-%m-%d %H:%M')
        end_date = datetime.datetime.strptime(f"{data['date']} {data['timeEnd']}", '%Y-%m-%d %H:%M')
        # sex = random.choice(["M", "A", "W"])
        len_trips = random.randint(10, 30)
        trips = []

        for _ in range(len_trips):
            age_start = random.randint(0, 65)
            age_end = random.randint(age_start, 65)
            sex = random.choice([SexSelection.MEN, SexSelection.ALL, SexSelection.WOMEN])
            len_trip = random.randint(1, 15)
            time_trip = len_trip * 8
            trip_data = {
                'date': random_date(start_date, end_date),
                'name': random.choice(routes_novosibirsk),
                'city': City.objects.get(pk=1).id,  # Предполагается, что город с pk=1 существует
                'sex': sex,
                'year_st': age_start,
                'year_en': age_end,
                'time_sp': time_trip,
                'distance': len_trip,
                'ratting': 0.0,
                'chat_link': 'https://t.me/+ELbMppxWv3MyNGEy',
            }
            trips.append(trip_data)

        serializer = TripSerializer(data=trips, many=True)
        if serializer.is_valid():
            serializer.save()
    
    
    # Фильтрация существующих записей
    user_age = data.get('userAge')
    user_sex = data.get('userSex')
    if user_age is None or user_sex is None:
        trips = Trip.objects.all()
        serializer = TripSerializer(trips, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    trips = Trip.objects.filter(
        year_st__lte=user_age,
        year_en__gte=user_age
    ).filter(
        sex__in=[user_sex, 'A']
    )
    
    serializer = TripSerializer(trips, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_user(request, format=None):
    if 'id' in request.query_params:
        try:
            user_id = int(request.query_params['id'])
            try:
                user = User.objects.get(pk = user_id)
            except User.DoesNotExist:
                user_name = request.query_params['username']
                user = User.objects.create(
                    tg_id = user_id,
                    user_name = user_name,
                    sex = SexSelection.ALL
                )
                user.save()

            serializer = UserSerializer(user, many=False)
            response = JsonResponse(serializer.data, safe=False)
            response["Access-Control-Allow-Origin"] = "*"
            return response
        except ValueError: 
            raise BadRequest('Invalid request.')
    else:
        raise BadRequest('Invalid request.')

@api_view(['POST'])
def update_user(request, format=None):
    data = request.data
    user = User.objects.get(pk = data['user_id'])
    user.birthday = datetime.datetime.strptime(data['birthday'], '%Y-%m-%d')
    if data['sex'] == 'male':
        user.sex = SexSelection.MEN
    else:
        user.sex = SexSelection.WOMEN
    user.name = data['name']
    user.save()
    serializer = UserSerializer(user)
    response = JsonResponse(serializer.data, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@api_view(['POST', 'GET'])
def photo_user(request, format=None):
    if request.method == 'POST':
        data = request.data
        user_id = data.get('user_id')
        photo = data.get('file')

        if not user_id or not photo:
            return JsonResponse({'error': 'User ID and file are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(tg_id=user_id)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        photo_user, created = PhotoUser.objects.update_or_create(user=user, defaults={'photo': photo})

        serializer = PhotoUserSerializer(photo_user)
        if created:
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'GET':
        try:
            user_id = int(request.query_params.get('id'))
        except ValueError:
            return JsonResponse({'error': 'User ID and file are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if user_id:
            photo_users = PhotoUser.objects.get(user__tg_id=user_id)
            serializer = PhotoUserSerializer(photo_users)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({'error': 'User ID and file are required.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_trip_registr(request, format=None):
    data = request.data
    user = User.objects.get(pk = data['user_id'])
    trip = Trip.objects.get(pk = data['id'])
    try:
        is_created = TripUser.objects.get(trip=trip, user=user)
        return JsonResponse({'error': 'User ID and file are required.'}, status=status.HTTP_400_BAD_REQUEST)
    except TripUser.DoesNotExist:
        trip_user = TripUser.objects.create(
            trip = trip,
            user = user
        )
        trip_user.save()
        text_user = f"Ваш чат по маршруту:\n<b>{trip.name}</b>\n"
        text_user += f"Нажмите на <a href='{trip.chat_link}'>ПЕРЕЙТИ</a>, чтобы присоединиться к вашим спутникам"
        params = {
            "chat_id" : user.pk,
            "text" : text_user,
            "parse_mode" : "HTML"
        }
        url = f"https://api.telegram.org/bot{settings.TOKEN}/sendMessage"
        requests.get(url, params=params, timeout=10)
        return JsonResponse({'message' : 'ok'}, safe=False, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_user_history(request, format=None):
    if 'id' in request.query_params:
        try:
            user_id = int(request.query_params['id'])
            trips = TripUser.objects.filter(user__tg_id=user_id)
            
            if not trips.exists():
                return JsonResponse([], safe=False, status=status.HTTP_404_NOT_FOUND)

            serializer = TripUserSerializer(trips, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except ValueError: 
            raise BadRequest('Invalid request.')
    else:
        raise BadRequest('Invalid request.')
    
@api_view(['PUT'])
def update_state_trip(request, format=None):
    data = request.data
    trip_user = TripUser.objects.get(pk = data['trip_user_id'])
    trip_user.state = data['state']
    if 'rate_user' in data:
        trip_user.rate_user = data['rate_user']
    trip_user.save()
    if data['state'] == 'Y':
        user = User.objects.get(pk = trip_user.user_id)
        trip = Trip.objects.get(pk = trip_user.trip_id)
        user.distance += trip.distance
        if user.distance > user.level.max_distance:
            current_level = user.level_id + 1
            check_level = True
            while check_level:
                level = Level.objects.get(pk = current_level)
                if user.distance < level.max_distance:
                    user.level_id = level.pk
                    check_level = False
                else:
                    current_level += 1
    
        user.save()
    return JsonResponse({'message': 'ok'}, status=status.HTTP_200_OK)

def random_date(start_date, end_date):
    """
    Возвращает случайную дату и время между датами start и end.
    
    :param start: datetime.datetime, начальная дата и время
    :param end: datetime.datetime, конечная дата и время
    :return: datetime.datetime, случайная дата и время между start и end
    """
    minutes_total = int((end_date - start_date).total_seconds() / 60)
    random_minutes = random.randint(0, minutes_total)
    rounded_minutes = round(random_minutes / 30) * 30
    random_datetime = start_date + datetime.timedelta(minutes=rounded_minutes)
    # formatted_datetime = random_datetime.strftime('%d.%m.%Y, %H:%M')
    
    return random_datetime
