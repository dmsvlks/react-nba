import React, { Component } from 'react';
import styled from 'styled-components';

import Conf from './Conf/Conf';

const Wrapper = styled.div`
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 500px) {
    max-width: 450px;
  }

  @media (min-width: 600px) {
    display: flex;
    max-width: 650px;
  }

  @media (min-width: 750px) {
    display: flex;
    max-width: 770px;
  }

  @media (min-width: 950px) {
    display: flex;
    max-width: 950px;
  }
`;

let teams = [];

class Teams extends Component {
  state = {
    teams: []
  };

  componentDidMount() {
    if (teams.length !== 0) {
      this.setState({ teams });
    } else {
      fetch('/api/2018/teams.json')
        .then(res => res.json())
        .then(res => res.league.standard.filter(team => team.isNBAFranchise))
        .then(teams => this.setState({ teams }));
    }
  }

  render() {
    const { teams } = this.state;
    const westConf = teams.filter(team => team.confName === 'West');
    const eastConf = teams.filter(team => team.confName === 'East');

    return (
      <Wrapper>
        <Conf teams={westConf} name='WEST' />
        <Conf teams={eastConf} name='EAST' />
      </Wrapper>
    );
  }
}

export default Teams;
