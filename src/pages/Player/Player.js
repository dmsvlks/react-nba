import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Picture, Loader } from '../../components';
import { PlayerInfo, Teams, Recent, CareerStats } from './components';
import { searchPlayerById } from '../../services/http-service';
import FadeDown from '../../animations/FadeDown';
import FadeScaleUp from '../../animations/FadeScaleUp';
import styled from 'styled-components';

import './styles.css';

const cachedPlayers = {};

const Info = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.div`
  width: 200px;
  margin-right: 30px;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-right: 20px;
  padding-bottom: 0;
`;

const Right = styled.div`
  padding: 10px;
  div {
    margin-bottom: 5px;
  }
`;

class Player extends Component {
  state = {
    player: null
  };

  componentWillMount() {
    const personId = this.props.match.params.id;
    this.setState({ player: cachedPlayers[personId] });
  }

  async componentDidMount() {
    const personId = this.props.match.params.id;
    if (!this.state.player) {
      const player = await searchPlayerById(personId);
      console.log(player);
      this.setState({ player });
      cachedPlayers[personId] = player;
    }
  }

  addTeam = teamId => {
    let triCode;
    this.state.player.teams.forEach(el => {
      if (teamId === el.teamId) {
        triCode = el.team.tricode;
      }
    });
    return triCode;
  };

  addOppTeam = game => {
    const num = game.gameUrlCode.indexOf('/');
    return game.isHomeGame ? game.gameUrlCode.slice(num + 1, num + 4) : game.gameUrlCode.slice(num + 4);
  };

  addScore = game => {
    return game.isHomeGame ? (
      <span>
        <span className={game.hTeam.isWinner ? 'winner' : ''}>{game.hTeam.score}</span>-
        <span className={game.vTeam.isWinner ? 'winner' : ''}>{game.vTeam.score}</span>
      </span>
    ) : (
      <span>
        <span className={game.vTeam.isWinner ? 'winner' : ''}> {game.vTeam.score}</span>-
        <span className={game.hTeam.isWinner ? 'winner' : ''}>{game.hTeam.score}</span>
      </span>
    );
  };

  render() {
    if (this.state.player) {
      const player = this.state.player;
      return (
        <div>
          <Info>
            <Image>
              <img
                style={{ width: '100%' }}
                src={`${process.env.PUBLIC_URL}/assets/players/${player.personId}.png`}
                alt={`${player.firstName} ${player.lastName}`}
              />
            </Image>

            <Middle>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: 15, fontSize: '2.5rem', color: 'hsl(40, 45%, 55%)', fontWeight: 'bold' }}>
                  {player.jersey}
                </div>
                <div>
                  <div style={{ fontSize: '1.7rem', fontWeight: 'bold', marginBottom: 10 }}>
                    {player.firstName.toUpperCase()} {player.lastName.toUpperCase()}
                  </div>
                  <div>
                    {player.pos} / <Link to={`/teams/${player.teamId}`}>{player.teams.slice(-1)[0].team.fullName}</Link>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: 'auto' }}>
                <div style={{ marginRight: 15, textAlign: 'center' }}>
                  <div style={{ marginBottom: 5 }}>PPG</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                    {Number(player.stats.latest.ppg).toFixed(1)}
                  </div>
                </div>
                <div style={{ marginRight: 15, textAlign: 'center' }}>
                  <div style={{ marginBottom: 5 }}>RPG</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                    {Number(player.stats.latest.rpg).toFixed(1)}
                  </div>
                </div>
                <div style={{ marginRight: 15, textAlign: 'center' }}>
                  <div style={{ marginBottom: 5 }}>APG</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                    {Number(player.stats.latest.apg).toFixed(1)}
                  </div>
                </div>
              </div>
            </Middle>
            <Right>
              <div>
                Date of Birth: <span style={{ fontWeight: 'bold' }}>{player.dateOfBirthUTC}</span>
              </div>
              <div>
                Height, weight:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {player.heightMeters}m / {player.weightKilograms}kg
                </span>
              </div>
              <div>
                Draft year, pick:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {player.nbaDebutYear} / {player.draft.pickNum}
                </span>
              </div>
              <div>
                Years pro: <span style={{ fontWeight: 'bold' }}>{Number(player.yearsPro) + 1}</span>
              </div>
              <div>
                College, country: <span style={{ fontWeight: 'bold' }}>{player.lastAffiliation}</span>
              </div>
            </Right>
          </Info>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FadeDown>
              <Recent player={player} addOppTeam={this.addOppTeam} addScore={this.addScore} />
              <CareerStats stats={player.stats} addTeam={this.addTeam} />
            </FadeDown>
          </div>
        </div>
      );
    } else return <Loader />;
  }
}

export default Player;
