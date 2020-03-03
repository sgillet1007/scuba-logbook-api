# Scuba Logbook API

> A RESTful API for a scuba diving logbook web application implemented as a Node/Express HTTP server with a MongoDB database.

## Instructions for running locally

### Install dependencies

```bash
npm install
```

### Configuration

Add config/config.env file with the following key-value pairs (see below). Replace values with your own values as needed.

```bash
NODE_ENV=development
PORT=[SPECIFY_A_PORT]
JWT_SECRET=[SPECIFY_A_JWT_SECRET_STRING]
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
MONGO_URI=[INCLUDE_YOUR_MONGODB_CONNECTION_STRING_HERE]
```

### Run Server

```bash
npm run start  # starts your server on specified $PORT
```

## API Documentation

Available in public/index.html