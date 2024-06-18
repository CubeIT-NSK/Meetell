import asyncio
from django.core.management.base import BaseCommand

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder

dp = Dispatcher()
bot = Bot("7331447852:AAGrMx6GwqPywr0-YUDWptCQoklq8SEZe54")

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Just a command for launching a Telegram bot.'

    def handle(self, *args, **kwargs):
        asyncio.run(dp.start_polling(bot))


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    """Answer to /start"""
    builder = InlineKeyboardBuilder()
    builder.button(text="MeeTell App", web_app=WebAppInfo(url="https://meetell.ru"))
    await message.answer(text="MeeTell", reply_markup=builder.as_markup())