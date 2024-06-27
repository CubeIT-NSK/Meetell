from django.core.management.base import BaseCommand

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Start checker base'

    def handle(self, *args, **kwargs):
        pass