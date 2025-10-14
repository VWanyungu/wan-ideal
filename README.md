# **Project structure**

## **idealb**

\----v1  
\----database  
\----utils  
\----setup.js  
\----routes  
\----utils

```
-----migrations
-----seeds

----index.js
----knexfile.js
----package.json
----package-lock.json
```

## **Folders:**

migrations -  
seeds -  
v1 - api version 1 folder  
database - containes all database related files inclusing set up and utility functions for interacting with the database  
routes - contains endpoint routes  
utils - contains utility functions for business logic and other operations

What has been implemented so far?

I have installed the following dependencies:

1.  dotenv to enable use of secret values defined in the .env file
2.  knex as a query builder to help track db configurations and changes. It also allows seemless swicth beteen different structured databases e.g mysql, postgres etc
3.  nodemon to keep server alive after refresh or failure
4.  pg for postgres db interaction

I have set up knex by configuring the various db environments for development, staging and production. I also defined the tables neede and functions required to interact with the db in knex.

I have set up Routers to enable modularisation of business logic and endpoints. 

I created a middleware that checks the version of api in the header of the request from the client and routedsthe request to the appropriate folder

I have demonstrated how pagination can be achieved using limit and offset with knex

I am also using the standard return json structure and status codes


Getting multiple users
Getting single user
Adding user to db