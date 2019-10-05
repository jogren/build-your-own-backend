# Build Your Own Backend

##### BYOB is a project to get comfortable with building servers and databases using Express, Knex, and PostgreSQL. This project involves building RESTful APIs and using web-scraping, complete with professional-grade documentaion and agile workflow best-practices. 

### Learning Goals

- Build your own RESTful API for a large dataset of your choosing
- One-to-many relational database schema design
- Deploy your API to Heroku
- Use web scraping to obtain seed data

### Getting Started

##### The app is available at: https://build-your-own-backend-jo.herokuapp.com

##### Try out the following endpoints in Postman

- /api/v1/teams (Methods: GET & POST)
- /api/v1/teams/:id (Methods: GET)
- /api/v1/players (Methods: GET & POST)
- /api/v1/players/:id (Methods: GET & DELETE)

##### When POSTing to /api/v1/teams, include the following in the request body

```
{
  "name": <string>,
  "gamesPlayed": <number>,
  "goals": <number>,
  "assists": <number>,
}
```

##### When POSTing to /api/v1/players, include the following in the request body

```
{
  "goals": <number>,
  "position": <string>,
  "team": <string>,
  "name": <string>,
}
```
* NOTE: team property must match one of the existing teams in the teams database *

<img width="1124" alt="Screen Shot 2019-10-05 at 12 55 55 PM" src="https://user-images.githubusercontent.com/19739235/66259668-e8d2e700-e770-11e9-8234-3fe5ac630d2e.png">
<img width="1128" alt="Screen Shot 2019-10-05 at 1 05 29 PM" src="https://user-images.githubusercontent.com/19739235/66259669-ebcdd780-e770-11e9-8e75-ad15c2e9995d.png">
<img width="1127" alt="Screen Shot 2019-10-05 at 12 54 25 PM" src="https://user-images.githubusercontent.com/19739235/66259670-ed979b00-e770-11e9-82ee-f3d614b3672a.png">
<img width="1126" alt="Screen Shot 2019-10-05 at 12 54 55 PM" src="https://user-images.githubusercontent.com/19739235/66259671-ef615e80-e770-11e9-9303-c19671090643.png">
