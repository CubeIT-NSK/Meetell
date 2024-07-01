import asyncio
from django.core.management.base import BaseCommand
from django.conf import settings
from ...models import User, Friend, SexSelection, Trip, City

from aiogram import F
from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart, CommandObject
from aiogram.types import Message, WebAppInfo, ContentType
from aiogram.utils.keyboard import InlineKeyboardBuilder

import pandas as pd
import io
import pytz

dp = Dispatcher()
bot = Bot(settings.TOKEN)

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Just a command for launching a Telegram bot.'

    def handle(self, *args, **kwargs):
        asyncio.run(dp.start_polling(bot))


@dp.message(CommandStart())
async def command_start_handler(message: Message, command: CommandObject) -> None:
    """Answer to /start"""
    args = command.args
    if not args is None:
      try:
         inviter_user_id = int(args)
         try:
            
            first = await User.objects.aget(pk = inviter_user_id)
            second = await User.objects.acreate(
               tg_id = message.from_user.id,
               user_name = message.from_user.username,
               sex = SexSelection.ALL
            )
            await second.asave()
            # Сделать проверку, есть ли уже такая запись
            friend = await Friend.objects.acreate(
               first_friend = first,
               second_friend = second
            )
            await friend.asave()
         except User.DoesNotExist:
            print("No user in base")
      except ValueError:
         print("No user")
      
    builder = InlineKeyboardBuilder()
    builder.button(text="MeeTell App", web_app=WebAppInfo(url="https://meetell.ru"))
    await message.answer(text="MeeTell", reply_markup=builder.as_markup())

@dp.message(F.content_type == ContentType.DOCUMENT)
async def handle_document(message: Message):
   if message.document.mime_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      file_info = await bot.get_file(message.document.file_id)
      file = await bot.download_file(file_info.file_path)

      # Чтение файла в DataFrame
      df = pd.read_excel(io.BytesIO(file.read()))

      # Сохранение данных в базу
      for index, row in df.iterrows():
         trip = await Trip.objects.acreate(
               date=pytz.timezone('Europe/Moscow').localize(row['Дата']),
               name=row['Название'],
               sex=row['Пол'],
               year_st=row['Возраст от'],
               year_en=row['Возраст до'],
               time_sp=row['Время в пути'],
               distance=row['Дистанция'],
               ratting=0.0,  # можно изменить в зависимости от нужд
               chat_link=row['Чат'],
               map_block=row['Карта'],
               city=await City.objects.aget(id=row['Город'])  # Предполагается, что город идентифицируется по ID
         )
         await trip.asave()
         

      await message.reply("Данные успешно сохранены в базу данных.")
   else:
      await message.reply("Пожалуйста, отправьте файл в формате XLSX.")