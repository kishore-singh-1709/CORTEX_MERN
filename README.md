## ReactJs -Frontend / NodeJs - Backend / ExpressJs - Connectivity / MongoDB - DataBase

A Simple Project Ticket Management Tool (CORTEX) using MongoDB, React.js, Express.js, Node.js Tech Stacks
to demonstrate various parts of a service oriented RESTful application with security.

### Screenshots

#### Signin

## ![Signin](/screenshots/signin.PNG?raw=true)

#### SignUp

## ![SignUp](/screenshots/signup.PNG?raw=true)

#### Signin Validation

## ![Signin Validation](/screenshots/signIn_validation.PNG?raw=true)

#### Backend Connectivity Lost

## ![Backend Connectivity Lost](/screenshots/Backend_Connectivity_issue_simulation.PNG?raw=true)

#### Admin Page - Ticket Delete Option

## ![Admin Page - Ticket Delete Option](/screenshots/admin_page_with_delete_option.PNG?raw=true)

#### Status Form - Admin Page - Status Create Secured Page/REST End point

## ![Status Form - Admin Page - Status Create Secured Page/REST End point](/screenshots/status_entry_page_admin.PNG?raw=true)

#### Ticket Form - Form / Field - Client Validation

## ![Ticket Form - Form / Field - Client Validation](/screenshots/form_client_validation.PNG?raw=true)

#### Dashboard - User Page without Delete option

## ![Dashboard - User Page without Delete option](/screenshots/user_page_without_delete_option.PNG?raw=true)

#### Dashboard - Search Feature

## ![Dashboard - Search Feature](/screenshots/search_feature.PNG?raw=true)

#### Dashboard - Sort / Paginate Feature

## ![Dashboard - Sort / Paginate Feature](/screenshots/status_sort_feature.PNG?raw=true)

#### API - Tickets - POST/Body

## ![API - Tickets - POST/Body](/screenshots/api/tickets_post_body.PNG?raw=true)

#### API - Tickets - POST/Header

## ![API - Tickets - POST/Header](/screenshots/api/tickets_post_header_jwt_token.PNG?raw=true)

#### API - Users - POST/Body

## ![API - Users - POST/Body](/screenshots/api/users_post_body.PNG?raw=true)

#### Database Schema

#### Status DB Schema

## ![Status DB Schema](/screenshots/schema/status.PNG?raw=true)

#### Tickets DB Schema

## ![Tickets DB Schema](/screenshots/schema/tickets.PNG?raw=true)

#### Users DB Schema

## ![Users DB Schema](/screenshots/schema/users.PNG?raw=true)

#### Heroku Hosted

Allow couple of minutes to let the instance start

- [WebApp](https://infomud.herokuapp.com/)
- [Api Doc (swagger)](https://infomud.herokuapp.com/swagger/index.html)

### Technology Stack

| Component          | Technology                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Frontend           | [ReactJs](https://github.com/facebook/react)                                                         |
| Design Elements    | Bootstrap, Material UI                                                                               |
| Backend (REST)     | [NodeJs](https://github.com/nodejs/node) (NodeJs)                                                    |
| Security           | Token Based ([JWT](https://github.com/auth0/node-jsonwebtoken) )                                     |
| REST               | [REST API] Client Server Connectivity with CORS Enabled                                              |
| REST Spec          | [Open API Standard](https://www.openapis.org/)                                                       |
| NoSQL DB           | MongoDB(https://github.com/mongodb/mongo)                                                            |
| Persistence        | Mongoose(https://github.com/Automattic/mongoose)                                                     |
| Client Build Tools | [create-react-app](https://github.com/facebook/create-react-app), Webpack, npm                       |
| Server Build Tools | Babel(https://github.com/babel/babel), WebPack, npm, ExpressJs(https://github.com/expressjs/express) |

## Folder Structure

```bash
PROJECT_FOLDER
│  README.md
│  package.json
|  package-lock.json
|  debug.log
│  .env.production
│  .env.development
│  .env
└──[cortex-server]  #contains Server side files(To simulate in local env,segregate this folder and host assign individual client server ports)
└──[public]         #contains main Index.html, App gets rendered under this hood
└──[screenshots]    #contains Application Pages screenshots
└──[src]
│  └──[component]
│     └──[common]   #contains re-usable components which are consumed in SPA pages
│     └──[css]
│     └──[services]
│     └──[static]
│     └──[utils]
│     │  App.css #contains Main App css
│     │  App.js #contains Main App js_Entry point to Application
│     │  App.test.js #contains Main App Jasmine Test code
│     │  index.css #contains Main index css
│     │  index.js #contains Main index Js
│     │  reportWebVitals.js
│     │  setupTests.js
| .env  #contains Proxy REST Api url for development
| .env.development #contains Proxy REST Api url for development
| .env.production  #contains Proxy REST Api url for Production
|  debug.log
│  README.md #Contains Project Detailed Info
│  package.json #Contains Project' Dependencies
|  package-lock.json #Contains Project' Inner Dependencies
```

## Prerequisites

Ensure you have this installed before proceeding further

- Node 14.0 or above,
- npm 5 or above,

## About

This is an RESTful implementation of an Project Management app based on NodeJs,ReactJs,ExpressJs,MongoDB.
The goal of the project is to

- Highlight Reusable UI Component using [ReactJS](https://github.com/facebook/react)
- How to consume an RESTful service and make an HTML5 based Single Page App using [React 17](https://github.com/facebook/react)
- Highlight techniques of making and securing a RESTful Web app using [NodeJs](https://github.com/nodejs/node)
- Highlight NoSQL DB CRUD operations as its a Data-Intensive App for scalability purpose using [MongoDB](https://github.com/mongodb/mongo)
- Highlight ORM Persistance functionalities which is accountable for dynamic Schema Mapping and validating datas using [Mongoose] (https://github.com/Automattic/mongoose)
- Highlight Authentication and Authorization Techniques and thus securing REST End Point using [JSONWebTokens](https://github.com/auth0/node-jsonwebtoken)

### Features of the Project

- Backend

  - Token Based Security (using JWT)
  - REST End Points using ExpressJs
  - NoSQL DB with MongoDB
  - Using Mongoose to talk with Non-relational database
  - User Credential Encrypted Data Persist using BCrypt
  - Admin / Normal User Activities - Authentication/Authorization Techniques

- Frontend

  - Organizing Common Components, Services, Pages etc in React App
  - How to use Axios.all (by making sequntial AJAX request- its different that how you do with promises)
  - Techniques to Paginate loaded Data (Paginate Numbers)
  - Techniques to load large data set in a data-table but still keeping DOM footprint less
  - Routing and guarding pages that needs authentication
  - Controlled Component Form / Field level Validation using Joi-Browser package
  - Handling of Routes / Re-directing to valid pages as per current context using React-Router
  - Basic visualization using MaterialUI and Bootstrap components

- Build
  - How to build all in one app that includes (database, sample data, RESTful API, API Docs, frontend and security)
  - Portable app, Ideal for dockers, cloud hosting.

## NoSQL DB (MongoDB)

I have included an NoSQL database for the application. As its a data intensive application which could trigger exponential growth in data size,NoSQL comes in. Dynamic Database schema and Data validation using Mongoose.

## JWT security

Security is **enabled** by JSON Web Token.

To test security access `http://localhost:3901/api/tickets` API and you should get a forbidden/Access denied error.
In order to access these secured API you must first obtain a token. Tokens can be obtained by passing a valid userid/password

userid and password are stored in Mongo database. To add/remove users, signin / signup pages are provided where you could create credential as an admin or a normal user.
couple of valid users and their passwords are `Admin@gmail.com\Admin` and `User@gmail.com\User`
<br/>

To get a token call `POST /user` API with a valid userid and password.
for example you may you can use the folliwing curl command to get a token

```
curl -X POST --header 'Content-Type: application/json' -d '{"name": "Admin","email": "admin@gmail.com","password": "admin"}' 'http://localhost:3901/api/users'
```

the above curl command will return you a token, which should be in the format of `xxx.xxx.xxx`. This is a JSON web token format.
You can decode and validate this token at [jwt.io wesite](https://jwt.io/). Just paste the token there and decode the information.
to validate the token you should provide the secret key which is `privateKey` that i am using in this app.
<br/>
after receiving this token you must provide the token in the request-header of every API request. For instance try the `GET /version` api using the below
curl command (replace xxx.xxx.xxx with the token that you received in above command) and you should be able to access the API.

```
curl -X GET --header 'Accept: application/json' --header 'Authorization: xxx.xxx.xxx' 'http://localhost:3901/api/tickets'
```

### Build Frontend (optional step)

Code for frontend is already compiled and saved under the `build/`

```bash
# Navigate to PROJECT_FOLDER/ (should contain package.json )
npm i
# build the project (this will put the files under build folder)
npm run build

```

### Build Backend (NodeJs)

```bash
# Navigate to PROJECT_FOLDER/ (should contain package.json)
npm i

```

### Start the API and WebUI server

```bash

# Web-UI_client server
# For development start(3000)
npm start

#For Production(5000)
npm serve -s build

#Api_server (3901)
node index.js
```

### Accessing Application

| Component        | URL                   | Credentials                                                   |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| Frontend         | http://localhost:3000 | `User@gmail.com\User`                                         |
| MongoDB Database |                       | Driver:`mongoDB` <br/> URL:`mongodb://localhost:27017/cortex` |

**To get an authentication token**

```bash
curl -X POST --header 'Content-Type: application/json' -d '{"name": "Admin","email": "admin@gmail.com","password": "admin"}' 'http://localhost:3901/api/users'
```

or POST the username and password to http://localhost:3901/api/users

after you get the authentication token you must provide this in the header for all the protected urls

```bash
curl -X GET --header 'Accept: application/json' --header 'Authorization: [replace this with token ]' 'http://localhost:3901/api/tickets'
```
