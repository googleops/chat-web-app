# Real-time chat web application using Ruby on Rails

This is a real-time chat web application using Ruby on Rails. The application uses ActionCable to implement the real-time chat feature.

## Specifications

* Ruby version : 3.0.2p107
* Rails version : 7.1.5
* Database : PostgreSQL
* node version : 16.20.2

## Features

| Method | Path | Controller#Action | Description |
| --- |--- |--- | --- |
| GET | /rooms | rooms#index | Display all rooms |
| POST | /rooms | rooms#create | Create a new room |
| GET | /rooms/:id | rooms#show | Display a room |
| POST | /rooms/:id/messages | messages#create | Create a new message in a room |

## Setup
### Backend

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

6. Create the channels using the following command:
```
rails generate channel Room
```

7. Prepare unit tests using the following command:
```
rails generate rspec:install
rails generate rspec:model Room
rails generate rspec:model Message
rails generate rspec:controller Rooms
rails generate rspec:request Messages
rails generate rspec:channel Room
```

8. To run unit tests, use the following command:
```
bundle exec rspec
```

### Frontend

1. Create a new React application using the following command:
```
npx create-react-app frontend
cd frontend
```

2. Install the following packages:
```
npm install axios react-router-dom
npm install -D tailwindcss
```