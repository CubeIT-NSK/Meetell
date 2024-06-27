import asyncio
import os

from django.core.management.base import BaseCommand
from django.conf import settings

from pyrogram import Client
from pyrogram.errors import SessionPasswordNeeded
from opentele.api import API

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Just a command for launching a Telegram bot.'

    def handle(self, *args, **kwargs):
        asyncio.run(self.create_group())

    async def auth_account(self, app):
        send_code = await app.send_code(settings.PHONE)
        code = input('Enter auth code: ')
        try:
            await app.sign_in(settings.PHONE, send_code.__dict__['phone_code_hash'], code)
        except SessionPasswordNeeded:
            await app.check_password(settings.PASSWORD)
        return app


    async def create_group(self):
        api_id = API.TelegramDesktop.Generate().api_id
        api_hash = API.TelegramDesktop.Generate().api_hash
        session = False
        for file in os.listdir(os.path.abspath(os.curdir)):
            if file == "meetell_work.session":
                session = True
        app = Client(name='meetell_work', phone_number=settings.PHONE, password=settings.PASSWORD, 
                     api_id=api_id, api_hash=api_hash)
        await app.connect()
        
        if not session:
            app = await self.auth_account(app)
        ids = [5947766690]
        await app.create_group(title="Маршрут №00001")
