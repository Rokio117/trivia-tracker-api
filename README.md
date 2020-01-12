# Trivia Tracker API

Live app: https://trivia-tracker-app-alpha-six.now.sh/

Trivia Tracker client can be found at: https://github.com/Rokio117/trivia-tracker


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
### Request 
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
## Post user information

## Post team information
