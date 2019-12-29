const express = require("express");

const userService = require("../users/users-service");
const teamsService = {
  doesExist(knex, teamcode) {
    //return store.teams.map(team => team.teamcode === teamcode).includes(true);
    //console.log("teamcode in doesExist", teamcode);
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode: teamcode });
  },
  getAllTeams(knex) {
    return knex.select("*").from("trivia_teams");
  },
  getAllEventsForTeam(knex, teamcode) {
    console.log(teamcode, "teamcode in getalleventsforteam");
    return this.getTeamId(knex, teamcode).then(teamId => {
      return knex
        .select("eventdate", "eventlocation")
        .from("trivia_results")
        .join("trivia_events", "trivia_results.event_id", "trivia_events.id")
        .where("trivia_results.team_id", teamId);
    });
  },
  getTeam(knex, teamcode) {
    return knex
      .select("*")
      .from("trivia_teams")
      .where({ teamcode });
  },
  getTeamById(knex, teamId) {
    return knex
      .select("*")
      .from("trivia_teams")
      .where({ id: teamId });
  },
  getTeamId(knex, teamcode) {
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode: teamcode })
      .then(id => {
        return id[0].id;
      });
  },
  getTeamMembers(knex, teamcode) {
    console.log("getteammembers ran");
    //return store.teams.find(team => team.teamcode === teamcode).members;
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode })
      .then(id => {
        const team_id = id[0].id;
        return knex
          .select("player_id")
          .from("members")
          .where({ team_id })
          .then(players => {
            const playerIds = players.map(player => player.player_id);
            return (
              knex
                .select("username", "nickname", "role")
                //add join to members to get role
                .from("trivia_players")
                .join("members", "trivia_players.id", "members.player_id")
                .whereIn("trivia_players.id", playerIds)
                .distinct()
                .then(members => {
                  return members;
                })
            );
          });
      });
  },
  getRoleOfMember(knex, player_id, teamcode) {
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode })
      .then(teamCode => {
        const team_id = teamCode[0].id;
        console.log("player_id", player_id, teamCode);
        return knex
          .select("role")
          .from("members")
          .where({ player_id: player_id, team_id: team_id });
      });
  },

  getNamedMembersOfTeam(knex, userNames) {
    return knex
      .select("nickname")
      .from("trivia_players")
      .whereIn("username", userNames);
    // return members.map(member =>
    //   Object.assign(member, {
    //     name: userService.getNameFromUsername(member.username)
    //   })
    // );
  },
  postNewTeam(knex, teamObject) {
    //store.teams.push(teamObject);
    return knex
      .insert(teamObject)
      .into("trivia_teams")
      .returning("*")
      .then(result => {
        console.log(result, "result in postNewTeam");
        return result;
      });
  },
  addToTeam(knex, playerId, teamcode, role) {
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode: teamcode })
      .then(id => {
        const member = { player_id: playerId, team_id: id[0].id, role: role };
        return knex
          .insert(member)
          .into("members")
          .returning("*")
          .then(result => result);
      });
  },
  changeRole(knex, playerId, role, teamcode) {
    return knex
      .select("id")
      .from("trivia_teams")
      .where({ teamcode: teamcode })
      .then(id => {
        const team_id = id[0].id;
        return knex("members")
          .where({ player_id: playerId, team_id: team_id })
          .update({ role: role })
          .returning("*");
      });
  },
  changeWinnings(knex, winnings, teamcode) {
    return knex("trivia_teams")
      .where({ teamcode })
      .update({ winnings: winnings })
      .returning("*");
  },
  changeTeamName(knex, newTeamName, teamcode) {
    return knex("trivia_teams")
      .where({ teamcode: teamcode })
      .update({ teamname: newTeamName })
      .returning("*");
  },
  patchTeamStandings(knex, newStandings, teamcode) {
    return knex("trivia_teams")
      .where({ teamcode: teamcode })
      .update({
        wins: newStandings.wins,
        firstplace: newStandings.firstplace,
        secondplace: newStandings.secondplace,
        thirdplace: newStandings.thirdplace,
        winnings: newStandings.winnings
      })
      .returning("*");
  },

  getLocations(knex) {
    return knex
      .select("*")
      .from("trivia_locations")
      .then(locations => {
        return locations;
      });
  },
  getLocationId(knex, location) {
    console.log("getLocationIdran", location);
    return knex
      .select("id")
      .from("trivia_locations")
      .where({ locationname: location })
      .then(objectId => {
        const id = objectId[0].id;
        return id;
      });
  },
  postNewLocation(knex, newLocation) {
    console.log("postNewLocation ran", newLocation);
    return knex
      .insert({ locationname: newLocation })
      .into("trivia_locations")
      .returning("id")
      .then(idArray => {
        const id = idArray[0];
        return id;
      });
  },

  findOrInsertLocation(knex, location) {
    return this.getLocations(knex).then(locations => {
      const locationNames = locations.map(
        locationObject => locationObject.locationname
      );
      if (locationNames.includes(location)) {
        return this.getLocationId(knex, location);
      } else {
        return this.postNewLocation(knex, location);
      }
    });
  },
  findOrInsertEvent(knex, event) {
    return this.getevents(knex).then(events => {
      const locationCompare = events.map(
        pastEvent => {
          const dateAndLocation = {
            eventdate: pastEvent.eventdate,
            eventlocation: pastEvent.eventlocation
          };
          if (
            pastEvent.eventdate === event.eventdate &&
            pastEvent.eventlocation === event.eventlocation
          ) {
            return true;
          } else return false;
        }

        // return knex
        //   .into("trivia_events")
        //   .insert(event)
        //   .returning("id");
      );
      console.log(locationCompare.includes(true));
      if (locationCompare.includes(true)) {
        return knex
          .select("id")
          .from("trivia_events")
          .where({
            eventdate: event.eventdate,
            eventlocation: event.eventlocation
          })
          .then(idArray => {
            return idArray[0].id;
          });
      } else {
        return knex
          .insert(event)
          .into("trivia_events")
          .returning("id")
          .then(nestedId => {
            return nestedId[0];
          });
      }
    });
  },
  getevents(knex) {
    return knex.select("*").from("trivia_events");
  },

  postResult(knex, result, teamcode) {
    return this.getTeamId(knex, teamcode).then(teamId => {
      result.team_id = teamId;
      return knex

        .insert(result)
        .into("trivia_results")
        .returning("id")
        .then(id => {
          console.log(id);
          return id[0];
        });
    });
  },

  postAttendees(knex, attendees, teamcode, eventId) {
    console.log("event id in post attendees", eventId);
    return this.getTeamId(knex, teamcode).then(teamId => {
      const attendeeList = attendees.map(attendee => {
        return {
          team_id: teamId,
          player_id: attendee,
          event_id: eventId
        };
      });
      console.log(attendeeList, "attendeelist in postAttendees");
      return knex
        .insert(attendeeList)
        .into("trivia_attendees")
        .returning("id");
    });
  },
  getFullTeamInfo(knex, teamcode) {
    return this.getTeam(knex, teamcode).then(teaminfoarray => {
      const teamBasicInfo = teaminfoarray[0];
      return this.getMembersAndRoles(knex, teamBasicInfo.id).then(
        teamMembers => {
          return this.getHistory(knex, teamBasicInfo.id).then(history => {
            const eventIds = history.map(history => history.id);
            return this.getAttendees(knex, eventIds).then(attendeesList => {
              const teamAttendees = [];
              attendeesList.forEach(attendee => {
                if (attendee.team_id === teamBasicInfo.id) {
                  teamAttendees.push({
                    username: attendee.username,
                    event_id: attendee.event_id
                  });
                }
              });

              const fullHistory = history.map(event => {
                const newHistory = Object.assign(event, { roster: [] });
                return newHistory;
              });
              fullHistory.forEach(history => {
                teamAttendees.forEach(attendeeObject => {
                  if (attendeeObject.event_id === history.id) {
                    history.roster.push(attendeeObject.username);
                  }
                });
              });

              const fullTeamInfo = {
                ...teamBasicInfo,
                members: teamMembers,
                history: fullHistory
              };

              return fullTeamInfo;
            });
          });
        }
      );
    });
  },
  getMembersAndRoles(knex, teamId) {
    return knex
      .select("username", "role", "nickname")
      .from("members")
      .join("trivia_players", "members.player_id", "trivia_players.id")
      .where("members.team_id", teamId)
      .then(result => {
        console.log(result, "result of getMembersAndRoles");
        return result;
      });
  },
  getHistory(knex, teamId) {
    return (
      knex
        .select(
          "eventdate",
          "locationname",
          "outcome",
          "position",
          "winnings",
          "trivia_events.id"
        )
        //.select("*")
        .from("trivia_results")
        .join("trivia_events", "trivia_results.event_id", "trivia_events.id")
        .join(
          "trivia_locations",
          "trivia_events.eventlocation",
          "trivia_locations.id"
        )
        .join(
          "trivia_attendees",
          "trivia_events.id",
          "trivia_attendees.event_id"
        )
        .join(
          "trivia_players",
          "trivia_attendees.player_id",
          "trivia_players.id"
        )
        .where("trivia_results.team_id", teamId)
        .distinct()
        .then(results => {
          console.log(results, "results of monster join");
          return results;
        })
    );
  },

  getAttendees(knex, eventIds) {
    return knex
      .select("username", "event_id", "team_id")
      .from("trivia_players")
      .join(
        "trivia_attendees",
        "trivia_players.id",
        "trivia_attendees.player_id"
      )

      .whereIn("trivia_attendees.event_id", eventIds)

      .distinct();
  }
};

module.exports = teamsService;
