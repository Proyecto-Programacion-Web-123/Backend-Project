📂 Backend Repository (Backend-Project)
Project - Backend

This repository contains the backend built with Express + Node.js, using Knex.js to connect to a MySQL database running in Docker.

Requirements

Node.js >= 20

npm >= 9

Docker & Docker Compose

(Optional) Postman or browser to test endpoints

1. MySQL Setup with Docker

Modify the docker-compose.yml file:

Change the container name if needed.

Update the password (MYSQL_ROOT_PASSWORD) and database name (MYSQL_DATABASE) according to your project.

Start MySQL:

docker compose up -d


Check if the container is running:

docker ps

2. Backend Setup

Navigate into the backend directory:

cd Backend


Install dependencies:

npm install


Update the knexfile.js if you modified the database or password in Docker:

connection: {
  host: 'localhost',
  user: 'root',
  password: 'YOUR_PASSWORD',
  database: 'YOUR_DATABASE'
}


Run migrations:

npx knex migrate:latest


Run seeds (to insert test data):

npx knex seed:run


Start the backend server:

node server.js


The backend will run on:
👉 http://localhost:3000

3. API Endpoints

/users

/products

/orders

/order_details

4. Notes

If you renamed the MySQL container, also update the connection parameters in knexfile.js.

If you changed the password or database name, update both docker-compose.yml and knexfile.js.
