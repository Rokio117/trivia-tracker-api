# Trivia Tracker API

Live app: https://trivia-tracker-app-alpha-six.now.sh/

Trivia Tracker client can be found at: https://github.com/Rokio117/trivia-tracker

## Technologies
Trivia Tracker API was created using Node.js, ExpressJs, and postgreSQL

## Get user information

### Get all user information
#### Request
GET /api/users/:username
#### Response
```javascript
[
  {
    "id":"",
    "username":"",
    "nickname":"",
  }
]
```

### Get user nickname
#### Request
GET /api/users/:username/name
#### Response
```javascript
{
  [
    "nickname":"name"
  ]
}
```

### Get user teams info
#### Request 
GET /api/users/:user_name/teams
#### Response
```javascript
[
  {
  "id":number,
  "teamcode":"",
  "teamname":"",
  "wins":number,
  "firstplace":number,
  "secondplace":number,
  "thirdplace":number,
  "winnings":number,
  "members":[
              {
                "username":"",
                "role:"",
                "nickname":""
              }
             ]
  }
]
```

## Get team information

### Get team id
#### Request
GET /api/teams/:teamcode/exists
#### Response
```javascript
[
  {
    "id":number
  }
[
```
### Get team info (without users)
#### Request
GET /api/teams/:teamcode/team
#### Response
```javascript
[
  {
    "id":number,
    "teamcode":"",
    "teamname":"",
    "wins":number,
    "firstplace":number,
    "secondplace":number,
    "thirdplace":number,
    "winningd":number
  }
]
```
### Get team members
#### Request
GET /api/teams/:teamcode/members
#### Response
```javascript
[
  {
    "username":"",
    "nickname":"",
    "role":""
  }
]
```
### Get Role of user on team
#### Request
GET /api/teams/:teamcode/:username/role
#### Response
``` javascript
[
  {
    "role":""
  }
[
```
### Get nicknames of all members on team
#### Request 
GET /api/teams/:teamcode/names
#### Response
```javascript
[
  nickname
]
```

## Post user information

### Post new user
#### Request
POST /api/users/
#### Response
```javascript
[
  {
    "id":number,
    "username":"",
    "nickname":"",
    "password":"",
  }
]
```

### Post new user and add them to team
#### Request
POST /api/users/:user_name/teams
#### Response
```javascript

[
  {
    "username":"",
    "nickname":"",
    "role":""
  }
]

```

## Add team information
### Add new team
#### Request
PATCH /api/teams/
#### Response
```javascript
[
  {
    "id":number,
    "teamcode":"",
    "teamname":"",
    "wins":number,
    "firstplace":number,
    "secondplace":number,
    "thirdplace":number,
    "winningd":number
  }
]
```
### Add user to team
#### Request
POST /api/teams/:team_code/members
#### Response
```javascript
[
  {
    "id":number,
    "playerid":number,
    "team_id":number,
    "role":""
  }
]
```
### Add event to team
#### Request
POST /api/teams/:team_code/event
#### Response
```javascript
[
  {
    "id":number,
    "teamcode":"",
    "teamname":"",
    "wins":number,
    "firstplace":number,
    "secondplace":number,
    "thirdplace":number,
    "winningd":number
  }
]
```
## Change user information

### Change username
#### Request
PATCH /api/users/:username
#### Response
```javascript
[
  {
    "id":number,
    "username":"",
    "password":"",
    "nickname":""
  }
[
```
### Change nickname
#### Request
PATCH /api/users/:user_name/name
#### Response
```javascript
[
  {
    "id":number,
    "username":"",
    "password":"",
    "nickname":""
```

## Change team information
### Change team name
#### Request
PATCH /api/teams/:team_code/team
#### Response
```javascript
[
  {
    "id":number,
    "teamcode":"",
    "teamname":"",
    "wins":number,
    "firstplace":number,
    "secondplace":number,
    "thirdplace":number,
    "winningd":number
  }
]
```
### Change user role on team
#### Request
PATCH /api/teams/:team_code/:user_name/role
#### Response
```javascript
[
  {
    "id":number,
    "playerid":number,
    "team_id":number,
    "role":""
  }
]
```
### Change team winnings
#### Request
PATCH /api/teams/:team_code/winnings
#### Response
```javascript
[
  {
    "id":number,
    "teamcode":"",
    "teamname":"",
    "wins":number,
    "firstplace":number,
    "secondplace":number,
    "thirdplace":number,
    "winningd":number
  }
]
```


