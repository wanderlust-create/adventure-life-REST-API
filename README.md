![adventure-life-logo](https://user-images.githubusercontent.com/67713820/217662321-e2c81fdc-3b12-4522-aaab-9063a7fd75de.png)

<p align="center">
  <h1>Adventure Life REST API</h1>
  <em>A RESTful backend for the (fictitious) Adventure Life travel company</em>
</p>

---

## 📍 Table of Contents
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Database](#database)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)
- [Schema](#schema)
- [Contributor](#contributor)

---

## 🚀 Tech Stack <a name="tech-stack"></a>
- **Node.js** + **TypeScript**
- [Express](https://www.npmjs.com/package/express)
- [Knex.js](https://knexjs.org/guide/)
- [Objection.js](https://vincit.github.io/objection.js/api/objection/)
- [PostgreSQL](https://www.postgresql.org/)
- [Yup](https://www.npmjs.com/package/yup) for validation
- [Winston](https://www.npmjs.com/package/winston) for logging
- [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/) for documentation
- [Postman](https://www.postman.com/) for API testing

---

## 📂 Folder Structure <a name="folder-structure"></a>
- `src/api` – Controllers, DAOs, models, DTO validation, services, and routes
- `src/config` – Environment setup, Knex config, Swagger config
- `src/db` – Migrations, seeds, and seed source data
- `src/loaders` – App startup, database and logger configuration
- `src/docs` – Swagger and Postman documentation

---

## 💻 Setup <a name="setup"></a>

### Requirements:
- Node.js
- TypeScript
- PostgreSQL

### Installation:
```bash
# Clone and install
$ git clone git@github.com:wanderlust-create/adventure-life.git
$ cd adventure-life
$ npm install

# Create environment file
$ cp .env.example .env

# Compile and start
$ npm run build
$ npm run start
```

---

## 📃 Database <a name="database"></a>

### Migrations:
```bash
npm run migrate
```

### Seeding:
```bash
npm run seed
```

### Reset:
```bash
npm run reset-db
```

---

## 💼 API Documentation <a name="api-documentation"></a>

Swagger UI is served at:
```
http://localhost:<PORT>/api-docs
```

---

## 📬 Postman Collection <a name="postman-collection"></a>

- Collection file: `adventure-life.postman_collection.json`
- Includes dynamic test variables
- Covers all 404 and validation scenarios

To import:
1. Open Postman → Import → Upload JSON from `/src/docs` 

---

## 🗘 Schema <a name="schema"></a>
![csa-schema](https://user-images.githubusercontent.com/67713820/209966291-29992855-b2c0-4401-86ae-29720e39fb08.png)

---

## 👩🏽‍💻 Contributor <a name="contributor"></a>
**Tamara Dowis**  
[GitHub](https://github.com/wanderlust-create) | [LinkedIn](https://www.linkedin.com/in/tamara-dowis/)

