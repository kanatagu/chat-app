# Chat App

This app is a real chat app inspired by Slack and Discord created with PostgreSQL, Express.js, React.js and Socket.io. You can play around with the following test user or create a new account after you set up the local environment.

```
username: test_user
password: password
```

<img width="1460" alt="Screenshot 2024-02-11 at 8 29 55 PM" src="https://github.com/kanatagu/chat-app/assets/66394413/7b291985-d649-4ad5-abe8-80c5d92dab98">

## Requirements

- Node v20.8.0 or above
- PostgreSQL (local or server)

## Setup

### Env

- Make environment file in both server and client

server

```
PORT=

DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

JWT_SECRET_KEY=
JWT_EXPIRES_IN=

COOKIE_SECRET_KEY=

```

client

```
VITE_API_URL="http://[YOUR SERVER URL]/api"
```

### Installation

server

```
cd server
npm install
```

client

```
cd client
npm install
```

### Database

```
cd server
npm run db:reset
npm run seed
```

## Run client and server

### Server

```
cd server
npm run dev
```

### Client

```
cd client
npm run dev
```

Open http://localhost:5173/

## Upcoming features..

- Edit/Delete message
- Upload image
- Text Editor for a message
- Change password and Delete account
- Private chat (DM)

## Author

[Kana](https://github.com/kanatagu)
