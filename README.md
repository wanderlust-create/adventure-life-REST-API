![adventure-life-logo](https://user-images.githubusercontent.com/67713820/217662321-e2c81fdc-3b12-4522-aaab-9063a7fd75de.png)
<p align="center">
<h1>This app serves as a RESTful API for Adventure Life database </h1>
    <br> 
</p>

----------

## 📝 Table of Contents

- [Packages](#packages)
- [Folder Structure](#folder_structure)
- [Setup](#setup)
- [API Documents](#api-docs)
- [Schema](#schema)
- [Contributor](#contributor)

----------
## 🎁 Packages: a shortened list of the Node/TypeScript modules used in this app: <a name = "packages"></a>

- [Express](https://www.npmjs.com/package/express)
- [Knex](https://knexjs.org/guide/)
- [Objection](https://vincit.github.io/objection.js/api/objection/)
- [pg](https://www.npmjs.com/package/pg)
- [Winston](https://www.npmjs.com/package/winston)
- [Yup](https://www.npmjs.com/package/yup)
- [Swagger JS Docs](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/)
- [Swagger UI Express](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/)

----------
## 📂 Folder Structure <a name = "folder_structure"></a>

- `src/api` controllers, daos, models, reqBody validation, routes, & services
- `src/config` access to .env configuration variables, databse configuration & swagger doc setup
- `src/db` migration, seed, & seed source data
- `src/loaders` database setup & logger configuration
- `src/docs` postman import API docs

----------
## 💻 Setup  <a name = "setup"></a>

#### Requirements:

- [TypeScript](https://www.typescriptlang.org/docs/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)

#### Installation:

1. Clone the repository `git@github.com:wanderlust-create/adventure-life.git`
2. Install node packages `cd adventure-life` then `npm install`
3. Rename `.env.example` to `.env` and enter your local environment variables
4. Run `npm run build` to compile the TS code
4. Run `npm run dev` to start the application
5. Open your local browser and verify the adventure-life app is working by accessing `http://localhost:<your env PORT>`

#### Database setup:

1. Create a PostgreSQL database using the same name, owner, and password you have in your .env file
2. You can now load the script via a npm command: `npm run migrate`. 

#### Database seeding:

1. In `src.db/sources` you will find files that can be used for seeding the database. Make sure that the database and coorsponding tables have been created before executing the seed script. 
2. You can now load the script via a npm command: `npm run seed`. 

----------
## 🗺 Schema  <a name = "schema"></a>
![csa-schema](https://user-images.githubusercontent.com/67713820/209966291-29992855-b2c0-4401-86ae-29720e39fb08.png)

----------
## 💼 API Documentation  <a name = "api-docs"></a>

### Data returned from Adventure Life API:

#### For Adventure Life Cities:
- List all cities
- Get a city with an id
- Create a city
- Update a city
- Delete a city

#### For Adventure Life Events:
- List all events
- Get an event with an id
- Filter events for a specific user with a userId
- Filter events for a specific city with a cityId
- Create an event
- Update an event
- Delete an event with id

#### For Adventure Life Users:
- List all users
- Get a user with an id
- Create a user
- Update a user
- Delete a user

#### For Adventure Life UserCities (joins table):
- List all user cities
- Create a user city with a userId and cityId
- Delete a user city

#### You can access the Swagger Documentation by:
- Connecting to your local network and access `http://localhost:<your_local_PORT>/api-docs`

#### You can import a Postman collection by either:
1. Import the JSON doc on `http://localhost:<your_local_PORT>/api-docs.json` when connected to your local network
2. Import the document stored in `src/api/docs`
----------

## Contributor   <a name = "contributor"></a>
👩🏽‍🎤 Tamara Dowis |  [GitHub](https://github.com/wanderlust-create)  |  [LinkedIn](https://www.linkedin.com/in/tamara-dowis/)
