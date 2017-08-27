##Setup

#create database  
psql -c create database forum_api;

#create schema  
npm run pg:schema

#environmental variables  
create a .env file in accordance with .env.example

npm install  
npm start
