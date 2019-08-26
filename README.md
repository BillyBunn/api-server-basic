<!-- LINKS -->

[url]: https://billybunn-401-lab-09.herokuapp.com/
[travis]: https://travis-ci.com/401-advanced-javascript-billybunn/lab-09/builds/106270634
[swagger]: http://xyz.com
[jsdoc]: https://billybunn-401-lab-09.herokuapp.com/docs/

<!-- BADGES -->

[![Build Status](https://travis-ci.com/401-advanced-javascript-billybunn/lab-09.svg?branch=working)](https://travis-ci.com/401-advanced-javascript-billybunn/lab-09)

# API Server

#### Author: Billy Bunn

Extensible REST API server with CRUD methods. Intended to integrate various data models through a common API. Built with [Express](https://expressjs.com/) in [Node.js](https://nodejs.org/en/).

Currently, the app has examples of a CRUD interface for:

- [x] JavaScript memory (for initial development)
- [x] MongoDB (with Mongoose schemas)
- [ ] PostgreSQL
- [ ] Neo4j

### Links and Resources

- [Deployed server][url] (Heroku)
- [Travis CI][travis] (continuous integration platform)

#### Documentation

- [JSdocs][jsdoc]
- [Swagger docs][swagger]

### Installation

Get a local version of this server running with the following steps:

1.  Clone the repository to your machine
2.  Navigate to the repository and install all dependencies (listed in the `package.json`)

    ```
    cd api-server basic

    npm i
    ```

3.  Create a file named `.env` in the repository's root directory and add the following variables:
    - `PORT` - defaults to `3000`
    - `MONGODB_URI` - a standard [connection string](https://docs.mongodb.com/manual/reference/connection-string/) to a running MongoDB instance. Read more about setting up MongoDB on your machine [here](https://docs.mongodb.com/manual/).
    ###### Example:
    ```
    MONGODB_URI=mongodb://localhost:27017/api-server
    PORT=3000
    ```
4.  Run the server and visit `localhost:3000` in your browser to see it running.
    ```
    node path/to/api-server-basic
    ```
    Consider using [nodemon](https://www.npmjs.com/package/nodemon) to make development easier.

## Routes

### `POST`

Add records to the database

<details>
<summary><strong>Example</strong></summary>
The app comes with some example data models using both JavaScript memory and MongoDB.

Here are a few entries using HTTPie you can paste directly to you terminal to get started. You'll need HTTPie installed and your server up and running with a good mongoose connection.

##### Add a couple teams to MongoDB

```
echo '{
  "name":"River Cats"
}' | http :3000/api/v1/teams

echo '{
  "name":"Mariners"
}' | http :3000/api/v1/teams
```

##### Add some players to each team

```
echo '{
  "name":"Billy",
  "position":"1B",
  "throws":"R",
  "bats":"R",
  "team":"River Cats"
}' | http :3000/api/v1/players

echo '{
  "name":"Travis",
  "position":"3B",
  "throws":"R",
  "bats":"L",
  "team":"River Cats"
}' | http :3000/api/v1/players

echo '{
  "name":"Joe",
  "position":"C",
  "throws":"L",
  "bats":"L",
  "team":"Mariners"
}' | http :3000/api/v1/players
```

<hr/>
</details>

---

### `GET`

Retrieve a record from the database

<details>
<summary><strong>Example</strong></summary>

After populating the database with the [example `PUT` requests,]() make the following `GET` request using HTTPie:

```
http :3000/api/v1/teams
```

It should output something like the following:

```
{
    "count": 2,
    "results": [
        {
            "__v": 0,
            "_id": "5d641ed242090562206ed463",
            "id": "5d641ed242090562206ed463",
            "name": "River Cats",
            "players": [
                {
                    "__v": 0,
                    "_id": "5d641fc442090562206ed465",
                    "bats": "R",
                    "name": "Billy",
                    "position": "1B",
                    "team": "River Cats",
                    "throws": "R"
                },
                {
                    "__v": 0,
                    "_id": "5d641fc442090562206ed466",
                    "bats": "L",
                    "name": "Travis",
                    "position": "3B",
                    "team": "River Cats",
                    "throws": "R"
                }
            ]
        },
        {
            "__v": 0,
            "_id": "5d641edb42090562206ed464",
            "id": "5d641edb42090562206ed464",
            "name": "Mariners",
            "players": [
                {
                    "__v": 0,
                    "_id": "5d641fc742090562206ed467",
                    "bats": "L",
                    "name": "Joe",
                    "position": "C",
                    "team": "Mariners",
                    "throws": "L"
                }
            ]
        }
    ]
}
```

<hr/>
</details>

---

### `PUT`

Update an existing record in the database

<details>
<summary><strong>Example</strong></summary>

After populating the database with the [example `POST` requests](), make the following `PUT` request using HTTPie to update a document:

```
echo '{
  "name":"Dude"
}' | http PUT :3000/api/v1/players/<PLAYER_ID>
```

The server will return the updated document. Something like:

```
{
    "__v": 0,
    "_id": "5d641fc442090562206ed465",
    "bats": "R",
    "name": "Dude",
    "position": "1B",
    "team": "River Cats",
    "throws": "R"
}

```

<hr/>
</details>

---

### `DELETE`

Remove a record from the database

<details>
<summary><strong>Example</strong></summary>

After populating the database with the [example `POST` requests](), make the following `PUT` request using HTTPie to update a document:

```
echo '{
  "name":"Dude"
}' | http PUT :3000/api/v1/players/<PLAYER_ID>
```

The server will return the updated document. Something like:

```
{
    "__v": 0,
    "_id": "5d641fc442090562206ed465",
    "bats": "R",
    "name": "Dude",
    "position": "1B",
    "team": "River Cats",
    "throws": "R"
}

```

<hr/>
</details>

---

#### Tests

- How do you run tests?
  - `npm run test`
  - `npm run lint`
    <!-- * What assertions were made?
- What assertions need to be / should be made? -->

#### UML

![get](./assets/all.jpg)

##### `GET /api/v1/:model`

![get](./assets/get.jpg)

##### `GET /api/v1/:model/:id`

![get](./assets/get.jpg)

##### `POST /api/v1/:model`

![get](./assets/post.jpg)

##### `DELETE /api/v1/:model/:id`

![get](./assets/delete.jpg)

##### `PUT /api/v1/:model/:id`

![get](./assets/put.jpg)
