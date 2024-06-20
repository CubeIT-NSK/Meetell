from rest_framework.decorators import api_view
from rest_framework import status
from .models import FAQ, User, SexSelection, PhotoUser
from .serializers import FAQSerializer, UserSerializer, PhotoUserSerializer
from django.http import JsonResponse
from django.core.exceptions import BadRequest

import time
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
    start_date = datetime.datetime.strptime(f"{data['date']} {data['timeStart']}", '%Y-%m-%d %H:%M')
    end_date = datetime.datetime.strptime(f"{data['date']} {data['timeEnd']}", '%Y-%m-%d %H:%M')
    len_trips = random.randint(1, 10)
    trips = []
    for i in range(len_trips):
        len_trip = random.randint(1, 10)
        time_trip = len_trip * 6
        trips.append({
            'id' : f"000{i+1}",
            'name' : random.choice(routes_novosibirsk),
            'range' : len_trip,
            'timeTrip' : time_trip,
            'date' : random_date(start_date, end_date)
        })
    response = JsonResponse(trips, safe=False)

    response["Access-Control-Allow-Origin"] = "*"
    return response

@api_view(['GET'])
def get_user(request, format=None):
    if 'id' in request.query_params:
        try:
            user_id = int(request.query_params['id'])
            user_name = request.query_params['username']
            try:
                user = User.objects.get(pk = user_id)
            except User.DoesNotExist:
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
    formatted_datetime = random_datetime.strftime('%d.%m.%Y, %H:%M')
    
    return formatted_datetime
