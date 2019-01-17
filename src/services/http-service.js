export const searchPlayer = query =>
  fetch('/api/2018/players.json')
    .then(res => res.json())
    .then(res => {
      const players = res.league.standard.filter(
        player => player.firstName.toLowerCase().includes(query) || player.lastName.toLowerCase().includes(query)
      );

      return players.map(player => ({
        personId: player.personId,
        name: `${player.firstName} ${player.lastName}`
      }));
    })
    .then(arr =>
      Promise.all(
        arr.map(el =>
          fetch(`/api/2018/players/${el.personId}_profile.json`)
            .then(res => res.json())
            .then(res => {
              el.ppg = Number(res.league.standard.stats.careerSummary.ppg);
              el.rpg = Number(res.league.standard.stats.careerSummary.rpg);
              el.apg = Number(res.league.standard.stats.careerSummary.apg);
              return el;
            })
        )
      )
    )
    .then(arr => arr.sort((a, b) => b.ppg - a.ppg));

export const searchPlayerById = async id => {
  let res = await fetch('/api/2018/players.json')
    .then(res => res.json())
    .then(res => res.league.standard.find(player => player.personId === id));

  let res2 = await fetch(`/api/2018/players/${res.personId}_profile.json`)
    .then(res => res.json())
    .then(response => {
      res.stats = response.league.standard.stats;
      return res;
    });

  let res3 = await fetch('/api/2018/teams.json')
    .then(res => res.json())
    .then(result => {
      for (const elem of res2.teams) {
        elem.team = result.league.standard.find(el => el.teamId === elem.teamId);
      }
      return res2;
    });

  let player = await fetch(`/api/2018/players/${id}_gamelog.json`)
    .then(res => res.json())
    .then(results => {
      res3.gamelog = results.league.standard;
      return res3;
    });

  return player;
};

export const searchTeamById = async id => {
  let res1 = await fetch('/api/2018/teams.json')
    .then(res => res.json())
    .then(res => res.league.standard.find(team => team.teamId === id));

  let res2 = await fetch('/api/2018/coaches.json')
    .then(res => res.json())
    .then(res => {
      res1.coachingStaff = res.league.standard.filter(coach => coach.teamId === res1.teamId);
      return res1;
    });

  let res3 = await fetch('/api/current/standings_all.json')
    .then(res => res.json())
    .then(res => {
      res2.seasonStats = res.league.standard.teams.find(inTeam => inTeam.teamId === res2.teamId);
      return res2;
    });

  let res4 = await fetch(`/api/2018/teams/${res3.teamId}/roster.json`)
    .then(res => res.json())
    .then(res => res.league.standard.players)
    .then(roster =>
      Promise.all(
        roster.map(player =>
          fetch('/api/2018/players.json')
            .then(res => res.json())
            .then(res => res.league.standard.find(inPlayer => inPlayer.personId === player.personId))
        )
      )
    )
    .then(roster => {
      res3.roster = roster;
      return res3;
    });

  let res5 = await fetch(`/api/2018/teams/${res4.teamId}/leaders.json`)
    .then(res => res.json())
    .then(res => {
      res4.leaders = res.league.standard;
      return res4;
    });

  let res6 = await fetch('/api/2018/team_stats_rankings.json')
    .then(res => res.json())
    .then(res => {
      res5.teamStats = res.league.standard.preseason.teams.find(inTeam => inTeam.teamId === res5.teamId);
      return res5;
    });

  return res6;
};

export const getScoreboards = async date => {
  let res = await fetch(`/api/${date}/scoreboard.json`)
    .then(res => res.json())
    .then(res => res);

  return res.games;
};
