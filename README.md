# Real-time chat web application using Ruby on Rails

This is a real-time chat web application using Ruby on Rails. The application uses ActionCable to implement the real-time chat feature.

## Specifications

* Ruby version : 3.0.2p107
* Rails version : 7.1.5
* Database : PostgreSQL

## Features

| Method | Path | Controller#Action | Description |
| --- |--- |--- | --- |
| GET | /rooms | rooms#index | Display all rooms |
| POST | /rooms | rooms#create | Create a new room |
| GET | /rooms/:id | rooms#show | Display a room |

## Setup

1. Create a new Rails application using the following command:
```
rails new chat-app --api -d postgresql
cd chat-app
```

2. Setup the database configuration in `config/database.yml` file.

3. Create the database using the following command:
```
rails db:create
```

4. Create the models using the following command:
```
rails generate model Room name:string
rails generate model Message content:text room:references
rails db:migrate
```

5. Create the controllers using the following command:
```
rails generate controller Rooms
rails generate controller Messages
```