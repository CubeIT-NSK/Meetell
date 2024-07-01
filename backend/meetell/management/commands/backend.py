from django.core.management.base import BaseCommand

from datetime import datetime
from ...models import TripUser, StateSelection

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Start checker base'

    def handle(self, *args, **kwargs):
        while True:
          now = datetime.now()

          # Выборка всех записей TripUser
          trip_users = TripUser.objects.select_related('trip').filter(state = "W")

          # Проверка и обновление состояния
          for trip_user in trip_users:
              if trip_user.trip.date < now:
                  trip_user.state = StateSelection.QUEST
                  trip_user.save()
                  print(f"Updated TripUser {trip_user.id} to state 'Q'.")