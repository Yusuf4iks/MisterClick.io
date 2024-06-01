from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext
import logging

# Включаем логирование
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

# Токен вашего бота
TOKEN = '7244472951:AAENZuqT_5Wpg5SiEpMOQJWtC3vhedn_Gxw'

def start(update: Update, context: CallbackContext) -> None:
    args = context.args
    if args:
        # Извлекаем параметры из аргументов
        params = ' '.join(args)
        # Разбиваем параметры по '&' и создаем словарь
        data = dict(param.split('=') for param in params.split('&'))
        lastname = data.get('lastname', 'Не указано')
        firstname = data.get('firstname', 'Не указано')
        className = data.get('class', 'Не указано')

        # Отправляем сообщение пользователю с полученными данными
        message = f"Регистрация прошла успешно!\nФамилия: {lastname}\nИмя: {firstname}\nКласс: {className}"
        update.message.reply_text(message)
    else:
        update.message.reply_text("Пожалуйста, используйте ссылку для регистрации.")

def main() -> None:
    # Создаем Updater и передаем ему токен вашего бота.
    updater = Updater(TOKEN)

    # Получаем диспетчера для регистрации обработчиков
    dispatcher = updater.dispatcher

    # Регистрируем обработчик команды /start
    dispatcher.add_handler(CommandHandler("start", start))

    # Запускаем бота
    updater.start_polling()

    # Работаем до тех пор, пока не будет нажата комбинация клавиш Ctrl+C
    updater.idle()

if __name__ == '__main__':
    main()
