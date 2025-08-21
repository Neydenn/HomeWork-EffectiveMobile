# Users Service (Express + TS + PostgreSQL + TypeORM) + React (Vite + MUI)

## Возможности
- Регистрация пользователя
- Авторизация (JWT)
- Получение пользователя по ID (доступно админу или самому пользователю)
- Получение списка пользователей (только админ)
- Блокировка пользователя (самостоятельно или админом)

## 1) Стек 
- Docker + Docker Compose
- TypeScript + Express
- PostgreSQL + TypeORM + migrations
- React(TypeScript) + MaterialUI (MUI) + Vite

### 2) Подготовка `.env` и пакетов
- Создай файл `.env` в корне проекта:
Экземпляр можно посмотреть в `.env.example`
- Установите все пакеты (локально, если нужно) - `npm install`

### Важно!
- Чтобы создать пользователя с ролью - `админ`, вы должны зполнить поля для Админа в `.env`, см. в `.env.example`

### 4) Запуск!
- Для запуска контейнеров используйте - `docker-compose up --build`

### Информации об API
- `POST /api/v1/auth/register` — регистрация { fullName, dateOfBirth, email, password }

- `POST /api/v1/auth/login` — авторизация { email, password } → { accessToken }

- `GET /api/v1/users/:id` — доступно админу или самому пользователю

- `GET /api/v1/users` — только админ

- `POST /api/v1/users/:id/block` — блокировка (админ или self)