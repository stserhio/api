# API Server app Instagram
>
> На сервере должен быть установлен NodeJS^16.0/npm
>

## Установка проекта

- Скачать репозиторий в локальную папку с проектом

```
git clone git@github.com:Zeonlb426/api.git
```

- Перейти в корневую директорию приложения
```
cd api/
```

- Создать файл окружения .env из образца .env.example

```
cp .env.example .env
```

- В файле окружения .env заполнить значения ключей для подключения к БД

- Выполнить установку необходимых модулей, выполнив команду
```
npm install
```

- Выполнить миграции
```
npm run migrate
```

- Если необходимо, запустить заполнение таблиц данными
```
npm run seed
```

- Запустить приложение
```
npm run dev
```

## Вспомогательные команды для разработки:

- Создание модели и файла миграции:
```
npx sequelize-cli model:generate --name ModelName --attributes fieldName1:integer, fieldName2:string, fieldName3:boolean
```

- Создание сидера:
```
npx sequelize-cli seed:generate --name tableName
```

- Запуск миграций:

```
npm run migrate
```
- Откат последней миграции:

```
npm run migrate:undo
```

- Откат всех миграций:

```
npm run migrate:undo:all
```

- Запуск сеятеля данных:

```
npm run seed
```

- Откат последнего:

```
npm run seed:undo
```

- Откат всех:

```
npm run seed:undo:all
```

<br>
<br>
<br>
===============================================================
