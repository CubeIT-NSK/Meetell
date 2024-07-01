from rest_framework.decorators import api_view
from rest_framework import status
from .models import (FAQ, User, SexSelection, PhotoUser, Trip, City, TripUser, Level)
from .serializers import (FAQSerializer, UserSerializer, PhotoUserSerializer, TripSerializer,
                          TripUserSerializer)
from django.http import JsonResponse
from django.core.exceptions import BadRequest
from django.conf import settings
from django.db.models import Q

import requests
import random
import datetime
from PIL import Image
from pillow_heif import register_heif_opener
from io import BytesIO
import base64

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
    if data['city'] == 'spb':
        city = 1
    else:
        city = 2
    
    date_st = datetime.datetime.strptime(f"{data['date']} {data['timeStart']}", '%Y-%m-%d %H:%M')
    date_en = datetime.datetime.strptime(f"{data['date']} {data['timeEnd']}", '%Y-%m-%d %H:%M')
    age_start = int(data['ageStart'])
    age_end = int(data['ageEnd'])
    
    if data['timeTrip'] == 'under_60':
        trips = Trip.objects.filter(
            city_id = city,
            date__gte=date_st,
            date__lte=date_en,
            time_sp__lte=60,
            sex=data['sex']
        ).filter(
            Q(year_st__lte=age_end) & Q(year_en__gte=age_start)
        )
    elif data['timeTrip'] == 'under_120':
        trips = Trip.objects.filter(
            city_id = city,
            date__gte=date_st,
            date__lte=date_en,
            time_sp__lte=120,
            sex=data['sex']
        ).filter(
            Q(year_st__lte=age_end) & Q(year_en__gte=age_start)
        )
    else:
        trips = Trip.objects.filter(
            city_id = city,
            date__gte=date_st,
            date__lte=date_en,
            time_sp__gte=120,
            sex=data['sex']
        ).filter(
            Q(year_st__lte=age_end) & Q(year_en__gte=age_start)
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

        data_full, data_low = resize_photo(photo, user)
        photo_user, created = PhotoUser.objects.update_or_create(user=user, defaults={'photo': data_full, 'photo_low': data_low})

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
        return JsonResponse({'error': 'User ID'}, status=status.HTTP_400_BAD_REQUEST)
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

@api_view(['POST'])
def create_trip(request, format=None):
    data = request.data
    trip_data = {
        'date': datetime.datetime.strptime(f"{data['date']} {data['time']}", '%Y-%m-%d %H:%M'),
        'name': data['name'],
        'city': City.objects.get(pk=1).id,  # Предполагается, что город с pk=1 существует
        'sex': data['sex'],
        'year_st': data['ageStart'],
        'year_en': data['ageEnd'],
        'time_sp': 45,
        'distance': 3,
        'ratting': 0.0,
        'chat_link': 'https://t.me/+ELbMppxWv3MyNGEy',
    }

    serializer = TripSerializer(data=trip_data, many=False)
    if serializer.is_valid():
        serializer.save()
        trip_user = TripUser.objects.create(
            trip_id = serializer.data['id'],
            user_id = data['user_id']
        )
        trip_user.save()
        return JsonResponse({"message": "ok"}, status=status.HTTP_201_CREATED)
    return JsonResponse({"message": "error"}, status=status.HTTP_400_BAD_REQUEST)


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

def resize_photo(image_base: str, user: User):
    image_base = image_base[image_base.find("base64,")+7:]
    register_heif_opener()
    
    fixed_width = 500
    img = Image.open(BytesIO(base64.b64decode(image_base)))

    width_percent = (fixed_width / float(img.size[0]))
    height_size = int((float(img.size[1]) * float(width_percent)))

    new_image = img.resize((fixed_width, height_size))
    new_image.convert("RGB")
    data_full = save_to_base_64(new_image)

    new_image_low = img.resize((50, 50))
    new_image_low.convert("RGB")
    data_low = save_to_base_64(new_image_low)

    return data_full, data_low

def save_to_base_64(img: Image):
    buffered = BytesIO()
    img.save(buffered, format="JPEG", quality=90, optimize=True)
    data_url = 'data:image/jpeg;base64,' + base64.b64encode(buffered.getvalue()).decode("utf-8")
    return data_url