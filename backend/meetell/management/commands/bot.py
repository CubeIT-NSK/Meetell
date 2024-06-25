import asyncio
from django.core.management.base import BaseCommand
from django.conf import settings
from ...models import User, Friend, SexSelection

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart, CommandObject
from aiogram.types import Message, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder

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