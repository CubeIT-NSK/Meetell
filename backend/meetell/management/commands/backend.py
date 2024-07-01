from django.core.management.base import BaseCommand

from datetime import datetime
from ...models import TripUser, StateSelection
import pytz

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Start checker base'

    def handle(self, *args, **kwargs):
        while True:
          now = datetime.now(pytz.timezone('Europe/Moscow'))

          # Выборка всех записей TripUser
          trip_users = TripUser.objects.select_related('trip').filter(state = StateSelection.WAIT)

          # Проверка и обновление состояния
          for trip_user in trip_users:
              trip_date = trip_user.trip.date
              if trip_date.tzinfo is None:
                  trip_date = pytz.timezone('Europe/Moscow').localize(trip_date)
              else:
                  trip_date = trip_date.astimezone(pytz.timezone('Europe/Moscow'))
              if trip_user.trip.date < now:
                  trip_user.state = StateSelection.QUEST
                  trip_user.save()
                  print(f"Updated TripUser {trip_user.id} to state 'Q'.")