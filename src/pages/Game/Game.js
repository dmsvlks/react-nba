import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Boxscore from './Boxscore';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let teamsCache = [];

class Game extends Component {
  constructor() {
    super();
    this.periods = [0, 1, 2, 3];
    this.state = {
      data: null,
      teams: null
    };
  }

  componentDidMount() {
    fetch(`/api/${this.props.match.params.date}/${this.props.match.params.id}_boxscore.json`)
      .then(res => res.json())
      .then(data => this.setState({ data }));

    if (teamsCache.length !== 0) {
      this.setState({ teams: teamsCache });
    } else {
      fetch('/api/2018/teams.json')
        .then(res => res.json())
        .then(res => res.league.standard.filter(team => team.isNBAFranchise))
        .then(teams => {
          teamsCache = teams;
          this.setState({ teams });
        });
    }
  }

  render() {
    const { data, teams } = this.state;

    if (!data || !teams) {
      return <div />;
    }

    console.log(data, teams);

    data.basicGameData.vTeam.nickname = teams.find(({ teamId }) => teamId === data.basicGameData.vTeam.teamId).nickname;
    data.basicGameData.hTeam.nickname = teams.find(({ teamId }) => teamId === data.basicGameData.hTeam.teamId).nickname;

    data.basicGameData.vTeam.fullName = teams.find(({ teamId }) => teamId === data.basicGameData.vTeam.teamId).fullName;
    data.basicGameData.hTeam.fullName = teams.find(({ teamId }) => teamId === data.basicGameData.hTeam.teamId).fullName;

    if (data.basicGameData.hTeam.linescore.length > 4) {
      this.periods = data.basicGameData.hTeam.linescore;
    }

    const vTeamPlayers = data.stats.activePlayers.filter(player => player.teamId === data.basicGameData.vTeam.teamId);
    const hTeamPlayers = data.stats.activePlayers.filter(player => player.teamId === data.basicGameData.hTeam.teamId);

    return (
      <Wrapper>
        <Header data={data.basicGameData} />
        <Boxscore team={data.basicGameData.vTeam} players={vTeamPlayers} totals={data.stats.vTeam.totals} />
        <Boxscore team={data.basicGameData.hTeam} players={hTeamPlayers} totals={data.stats.hTeam.totals} />
      </Wrapper>
    );
  }
}

export default Game;
