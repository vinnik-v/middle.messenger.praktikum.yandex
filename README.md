https://github.com/vinnik-v/middle.messenger.praktikum.yandex/pull/7

## Описание

Messanger представляет собой собственную реализацию веб-мессенджера в рамках обучающего курса ЯП. Messanger позволяет пользователям общаться, передавать файлы и делиться медиа.

### Особенности проекта:
1. Персонализированные профили пользователей с возможностью загрузки аватаров и настройки настроек конфиденциальности.
2. Отправка сообщений и медиафайлов, включая фотографии, видео, аудио и документы.
3. Создание групповых чатов для общения с несколькими пользователями одновременно.

В рамках первого спринта был реализован минимальный функционал, позволяющий продемонстрировать будущие возможности:
- Регистрация
- Вход
- Показ списка контактов
- Окно чата с возможностью добавления/удаления пользователей и обмена файлами
- Профиль пользователя с возможностью изменения аватара, данных пользователя и смены пароля

В рамках второго спринта реализовано:
- Базовый класс Block, с методами жизненного цикла и рендера компонентов
- Все компоненты были отнаследованы от базового класса
- В дочерних компонентах реализована собственная логика
- Добавлена валидация форм
- Добавлен метод ApiRequest

В рамках третьего спринта реализовано:
- Роутер, реализован роутинг по страницам, использован History api
- Store для хранения состояния приложения
- Подключен API для авторизации, регистрации, изменения данных пользователя
- Подключен API чатов (WebSocket)
- Реализован обмен сообщениями

В рамках четвертого спринта реализовано:
- Настроены автотесты для Компонента, Роутера, модуля отправки запросов
- Настроен precommit с запуском линтера и тестов
- Проведен аудит пакетов, обновлены зависимости, устранены уязвимости

### [Ссылка на макет Figma](https://www.figma.com/file/Px6xYdS2EVS5zFXohXAxlw/messanger?type=design&node-id=8%3A3755&mode=design&t=HpvNLSCUtt9JPSJn-1)

### [Ссылка на развернутый проект в Netlify](https://messanger-app-vinnikviv.netlify.app/) 

### Ссылки на страницы веб-приложения:
- [Авторизация](https://messanger-app-vinnikviv.netlify.app/login)
- [Регистрация](https://messanger-app-vinnikviv.netlify.app/register)
- [Список чатов и лента переписки](https://messanger-app-vinnikviv.netlify.app/main)
- [Профиль пользователя](https://messanger-app-vinnikviv.netlify.app/profile)
- [Страница 404](https://messanger-app-vinnikviv.netlify.app/404)
- [Страница Error](https://messanger-app-vinnikviv.netlify.app/error)


## Установка

- `npm install` — установка зависимостей,
- `npm run build` — сборка проекта,
- `npm run start` — запуск локального приложения на Express,
- `npm run dev` — запуск проекта в режиме разработки.
