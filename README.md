# BYOB

###### BYOB is a project to get comfortable with building databases using Express, Knex, and PostgreSQL. This project involves building RESTful APIs and using web-scraping, complete with professional-grade documentaion and agile workflow best-practices. 

### Learning Goals

- Build your own RESTful API for a large dataset of your choosing
- One-to-many relational database schema design
- Deploy your API to Heroku
- Use web scraping to obtain seed data

### Getting Started

###### The app is available at: https://build-your-own-backend-jo.herokuapp.com

###### Try out the following endpoints in Postman

- /api/v1/teams (Methods: GET & POST)
- /api/v1/teams/:id (Methods: GET)
- /api/v1/players (Methods: GET & POST)
- /api/v1/players/:id (Methods: GET & DELETE)

###### When POSTing to /api/v1/teams, include the following in the request body

```
{
  "name": <string>,
  "gamesPlayed": <number>,
  "goals": <number>,
  "assists": <number>,
}
```

###### When POSTing to /api/v1/players, include the following in the request body

```
{
  "goals": <number>,
  "position": <string>,
  "team": <string>,
  "name": <string>,
}
```
* NOTE: team property must match one of the existing teams in the teams database *