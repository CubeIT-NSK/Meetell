from rest_framework.decorators import api_view
from .models import FAQ
from .serializers import FAQSerializer
from django.http import JsonResponse

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
    "Культурное наследие Новосибирска"
]

@api_view(['GET'])
def get_faq(request, format=None):
    faq = FAQ.objects.all()
    serializer = FAQSerializer(faq, many=True)
    response = JsonResponse(serializer.data, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    time.sleep(10)
    return response

@api_view(['POST'])
def get_trips(request, format=None):
    data = request.data
    if random.randint(0, 1) == 1:
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
    else:
        response = JsonResponse([], safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response


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
