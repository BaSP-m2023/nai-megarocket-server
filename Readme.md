# BaSP 2023 - [MegaRocket - Backend]

## Week-08
## Java Script.
## ES6, NPM and Express.js

For the assignment of the Week-08, the project is going to be developed in a shared repository with all the team. For which it should be created an NPM project to then create a web server by using the Express library. This web server will be the 'backend' of our MegaRocket system in which it would be developing all the necessary functionalities so that the system acchieve the requirements of the week 01.

In order to move on with the project. The team developed the different entities or resources that the project requires.
such as;

- Admin.
- SuperAdmin.
- Member.
- Trainer.
- Activity.
- Class.
- Subscription.

It is necessary to work with an API server.

This API rest server should allow interactions within the entities. For each one of them, it should allow the following actions.

- Create.
- Edit.
- Obtain.
- Delete.

Depending on the action that the functionalities of each resource make, it should be respected what the HTTP Protocol indicates. For example: if it is making a data consult such as;

- "Obtain a members list", the request method should be GET.
- "Create a new member", the request method should be POST, sending the new member information in the request Body.
- "Edit a member information", the request method should be PUT.
- "Delete a member", The request method sould be DELETE.

<br>

## Quick Start

Install dependencies:

```console
 npm install
```

Start the server:

```console
 npm start
```

 View the server at: http://localhost:4000
<br>

 ### Running Linters

To run the linters tool [Eslint](https://eslint.org/), first install the dependencies, then run:

```console
npm run lint
```

To fix the lint issues:

```console
npm run lint:fix
```

## Week-09
## Java Script.
## API Rest and MongoDB

The assignment of Week-09 consists on implement a MongoDB database into a server created the previous week-08.

In order to do that, a NoSQL database must be integrated through the use of Mongo Compass on the server. With this integration, all data persistence is now in the new database instead of in the JSON files added the previous week. As such data persistence is replaced in each entity, the JSON files must be removed from the repository.

In addition to this, validations must be added to PUT and POST endpoints by using the JOI library, passed as Middleware in their routes definitions.

The files structure must be reorganized.
- The folder named 'resources', which contained all endpoints logic on Week-08, its name is now updated to 'controllers'. Whose files inside that folder, remains as they are.

- A new folder called 'routes' is created within an index.js file inside it, where the routes of each entity are defined.

- A new folder called 'models' is creted where the Mongoose schemas are defined.

- A new folder 'validations' is created where the validations for each entity should be. There must be a file for each one respecting the name of the entity, whithin each file, the functions that validate the body format of each type of request must be defined. That is, for the endpoint that creates a Member, there must be a validate function that validates the body that same endpoint must have.

- As Mongoose Schemas are created and the features of each endpoint are updated by integrating the connection with the database, the JSON files that are no longer used should be deleted.

The correct HTTP status code must be used for each type of response. There are many codes for different purposes, in our case we are only going to use the following:

- 200: For a successful request.
- 201: For a new data created in the database.
- 204: For when a database data is deleted.
- 400: For when a request is badly made.
- 404: For when the indicated resource does not exist.

Within the repository there must be a Postman collection to document all the endpoints that are created on the server.

To conclude, a Smoke Test must be completed. It is based on reviewing all the functionalities carried out and doing a manual test and checking that everythings works correctly. In case something does not work, the error must be declared on it.


<br>

### This project was developed by:

|Photo | Name  | Mail | Github
| :-----: | :-----: | :-----: | :-----: |
<img src="https://avatars.githubusercontent.com/u/118134054?v=4" height="50" width="50">| Federico Cavallo | fcmde1995@gmail.com | [@CavalloFede](https://github.com/CavalloFede)
<img src="https://avatars.githubusercontent.com/u/99512277?v=4" height="50" width="50">| Ignacio Galcerán | igna.galceran@gmail.com | [@IgnacioGalceran](https://github.com/IgnacioGalceran)
<img src="https://avatars.githubusercontent.com/u/127536596?v=4" height="50" width="50">| Micaela A. Rossi | micaelarrossi@gmail.com | [@Micaela-Rossi](https://github.com/Micaela-Rossi)
<img src="https://avatars.githubusercontent.com/u/127552931?v=4" height="50" width="50">| Martín Lupo | lupomartin2003@gmail.com | [@lupomartin](https://github.com/lupomartin)
<img src="https://avatars.githubusercontent.com/u/87949682?v=4" height="50" width="50">| Franco Duarte | francoa.duarte2001@gmail.com | [@francoax](https://github.com/francoax)
<img src="https://avatars.githubusercontent.com/u/49520632?v=4" height="50" width="50">| Iván Jukonis | jukoivan024@gmail.com | [@IvanJukonis](https://github.com/IvanJukonis)
<img src="https://avatars.githubusercontent.com/u/127459363?v=4" height="50" width="50">| Eliezer Joel Alberto | eliezer.alberto95@gmail.com | [@Eliezer-Alberto](https://github.com/Eliezer-Alberto)
<img src="https://avatars.githubusercontent.com/u/127452350?v=4" height="50" width="50">| Daniel Lezama | dlezama0796@gmail.com | [@Dannylez](https://github.com/Dannylez)
<img src="https://avatars.githubusercontent.com/u/67287153?v=4" height="50" width="50">| Gianluca Agrano | gianlucka1@gmail.com | [@Gianluca27](https://github.com/Gianluca27)
<img src="https://avatars.githubusercontent.com/u/70290650?v=4" height="50" width="50">| Juan Manuel Lantermo | juanmlantermo@gmail.com | [@juanlantermo](https://github.com/juanlantermo)


<br>

### License & Copyright

© Radium Rocket "Become a Software Professional 2023"